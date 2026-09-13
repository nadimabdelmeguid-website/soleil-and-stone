export function readingTime(
  markdown: string
) {

  const clean =
    markdown

      .replace(
        /```[\s\S]*?```/g,
        ""
      )

      .replace(
        /[#>*_`\-\[\]()]/g,
        " "
      );


  const words =
    clean
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;


  return Math.max(
    1,
    Math.ceil(
      words / 220
    )
  );

}
