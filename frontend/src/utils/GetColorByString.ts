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
