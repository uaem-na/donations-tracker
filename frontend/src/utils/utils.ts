export const getColorByString = (
  str: string,
  saturation: number = 60,
  lightness: number = 40
) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 4) - hash);
  }
  const h = hash % 360;
  return {
    color: "hsl(" + h + ", " + saturation + "%, " + lightness + "%)",
  };
};

export const initial = (name: string) =>
  name
    .match(/(?<=\s|^)\p{L}\p{Mn}*/gu)
    ?.filter((el, i, array) => i === 0 || i === array.length - 1)
    .join("") || "";
