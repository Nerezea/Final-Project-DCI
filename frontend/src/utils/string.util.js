export function summarize(text, wordsCount) {
  const words = text.split(" ");
  if (words.length > wordsCount)
    return text.split(" ").slice(0, wordsCount).join(" ") + "...";
  return text;
}
