import { Input } from "@components/Controls";
import React from "react";
import { useTranslation } from "react-i18next";

export const SearchBar = ({ keyword, setKeyword }) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder={t("search_posts")}
        value={keyword}
        onChange={handleChange}
      ></Input>
    </div>
  );
};
