export const htmlToText = (html) => {
  return html.replace(/<[^>]*>/g, "").trim();
};
