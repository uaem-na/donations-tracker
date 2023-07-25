// A function that takes a string as input and returns a new string with the first letter capitalized.
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
