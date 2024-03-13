import BadWordsNext from "bad-words-next";
import words from "../../public/locales/en/profane.json";
import frWords from "../../public/locales/fr/profane.json";

// combined profane words list
const profaneWords = new BadWordsNext({ data: words });
profaneWords.add(frWords);

export const isProfane = (str: string) => {
  return profaneWords.check(str);
};
