export const returnTemplate = (
  type: string | undefined,
  path: string | undefined,
  name: string | undefined,
): string => {
  if (!type || !path || !name) return "";
  switch (true) {
    case type.startsWith("image"):
      return `<img src="file://${path}/${name}" />`;
    case type.startsWith("video"):
      return `<video type="${type}" src="file://${path}/${name}" controls autoplay/>`;
    case type.startsWith("audio"):
      return `<audio src="file://${path}/${name}" />`;
    default:
      return `<embed type="${type}" src="file://${path}" />`;
  }
};
