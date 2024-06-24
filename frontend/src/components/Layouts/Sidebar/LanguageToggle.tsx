import { Tooltip } from "@components/Controls";
import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  isMobile?: boolean;
}

export const LanguageToggle = ({ isMobile }: LanguageToggleProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const { i18n } = useTranslation();

  const handleClick = () => {
    setIsPressed(!isPressed);
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex shrink-0 items-center justify-center" tabIndex={-1}>
      {!isMobile && (
        <Tooltip
          message={
            i18n.language === "en" ? "Switch to French" : "Switch to English"
          }
          side="right"
          delayDuration={0}
        >
          <div
            role="button"
            tabIndex={0}
            aria-pressed={isPressed}
            className="group flex gap-x-3 rounded-md p-2 leading-6 font-semibold text-gray-400 hover:text-white hover:bg-gray-800 items-center justify-center"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            <span
              tabIndex={-1}
              className="inline-block w-8 h-6 bg-ca-red text-white text-xs font-bold uppercase rounded border border-gray-300 shadow text-center leading-6"
            >
              {i18n.language === "en" ? "CA" : "FR"}
            </span>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
