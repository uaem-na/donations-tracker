export const initial = (name: string) =>
  name
    .match(/(?<=\s|^)\p{L}\p{Mn}*/gu)
    ?.filter((el, i, array) => i === 0 || i === array.length - 1)
    .join("") || "";
