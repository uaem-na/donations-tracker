export const isEnumValue = <T extends { [k: string]: string }>(
  something: any,
  enumObject: T
): something is T[keyof T] =>
  typeof something === "string" &&
  Object.values(enumObject).includes(something);
