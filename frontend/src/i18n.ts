import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      lng: "fr",
      fallbackLng: ["en", "fr"],
      supportedLngs: ["en", "fr"],
      debug: true,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      ns: ["common", "glossary", "validation"],
      defaultNS: "common",
    },
    (err, t) => {
      // initialized and ready to go!
      if (err) return console.error(err);
    }
  );

export default i18n;
