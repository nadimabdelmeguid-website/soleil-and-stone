import {
  readdir
} from "node:fs/promises";

import path
  from "node:path";


const supportedExtensions =
  [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
  ];


/*
 * =========================================================
 * EVENT RECAP IMAGE DISCOVERY
 * =========================================================
 *
 * Expected folder:
 *
 * public/event-recaps/<slug>/
 *
 * Recommended files:
 *
 * cover.jpg
 * 01.jpg
 * 02.jpg
 * 03.jpg
 *
 * cover.* becomes the recap cover.
 *
 * Everything else becomes gallery content and is sorted
 * naturally by filename.
 *
 * Example:
 *
 * 01.jpg
 * 02.jpg
 * 10.jpg
 *
 * stays in numeric order.
 * =========================================================
 */

export async function getEventRecapImages(
  slug: string
) {

  const directory =
    path.join(
      process.cwd(),
      "public",
      "event-recaps",
      slug
    );


  let files:
    string[] =
    [];


  try {

    files =
      await readdir(
        directory
      );

  } catch {

    return {
      cover:
        null,

      gallery:
        []
    };

  }


  const imageFiles =
    files
      .filter(
        (file) =>

          supportedExtensions.includes(
            path.extname(
              file
            )
              .toLowerCase()
          )
      );


  /*
   * Find cover regardless of extension.
   */

  const coverFile =
    imageFiles.find(
      (file) => {

        const basename =
          path.basename(
            file,
            path.extname(
              file
            )
          )
            .toLowerCase();


        return basename ===
          "cover";

      }
    );


  /*
   * Every other image becomes gallery content.
   */

  const galleryFiles =
    imageFiles
      .filter(
        (file) =>
          file !==
            coverFile
      )
      .sort(
        (a, b) =>

          a.localeCompare(
            b,
            undefined,
            {
              numeric:
                true,

              sensitivity:
                "base"
            }
          )
      );


  return {

    cover:
      coverFile
        ? `/event-recaps/${slug}/${coverFile}`
        : null,

    gallery:
      galleryFiles.map(
        (file) =>
          `/event-recaps/${slug}/${file}`
      )

  };

}
