import { Tooltip } from "@components/Controls";
import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  isMobile?: boolean;
}

export const LanguageToggle = ({ isMobile }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex shrink-0 items-center justify-center">
      {!isMobile && (
      <Tooltip message={i18n.language === "en" ? "Switch to French" : "Switch to English"} side="right" delayDuration={0}>
          <button
            className="group flex gap-x-3 rounded-md px-2 leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800 items-center justify-center"
            onClick={toggleLanguage}
          >
            <span className="w-full text-4xl font-light text-gray-100">
              {i18n.language === "en" ? "🇨🇦" : "🇫🇷"}
            </span>
          </button>
        </Tooltip>
      )}
    </div>
  );
};
