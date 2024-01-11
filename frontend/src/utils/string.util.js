export function summarize(text, wordsCount) {
  const words = text.split(" ");
  if (words.length > wordsCount)
    return text.split(" ").slice(0, wordsCount).join(" ") + "...";
  return text;
}

export function summarizeFileName(fileName, charCount) {
  const extension = fileName.substring(fileName.lastIndexOf("."))
  const name = fileName.substring(0,fileName.lastIndexOf("."))
  if (name.length > charCount)
    return name.slice(0, charCount) + "..." + extension ;
  return fileName;
}
