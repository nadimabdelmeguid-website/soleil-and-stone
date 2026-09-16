import {
  readdir
} from "node:fs/promises";

import path
  from "node:path";


const supportedExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif"
  ]);


const naturalSorter =
  new Intl.Collator(
    undefined,
    {
      numeric: true,
      sensitivity: "base"
    }
  );


export interface FieldNoteImages {
  cover: string | null;
  gallery: string[];
}


export async function getFieldNoteImages(
  slug: string
): Promise<FieldNoteImages> {

  const directory =
    path.join(
      process.cwd(),
      "public",
      "field-notes",
      slug
    );


  try {

    const entries =
      await readdir(
        directory,
        {
          withFileTypes: true
        }
      );


    const files =
      entries
        .filter(
          (entry) =>
            entry.isFile()
        )
        .map(
          (entry) =>
            entry.name
        )
        .filter(
          (file) =>
            supportedExtensions.has(
              path
                .extname(file)
                .toLowerCase()
            )
        );


    const coverFile =
      files.find(
        (file) =>
          path
            .parse(file)
            .name
            .toLowerCase() ===
          "cover"
      ) ??
      null;


    const galleryFiles =
      files
        .filter(
          (file) =>
            file !==
            coverFile
        )
        .sort(
          naturalSorter.compare
        );


    const baseUrl =
      `/field-notes/${slug}`;


    return {

      cover:
        coverFile
          ? `${baseUrl}/${coverFile}`
          : null,

      gallery:
        galleryFiles.map(
          (file) =>
            `${baseUrl}/${file}`
        )

    };

  } catch {

    /*
     * No image folder yet.
     *
     * This is intentionally not an error.
     * A Field Note works perfectly without images.
     */

    return {
      cover: null,
      gallery: []
    };

  }

}
