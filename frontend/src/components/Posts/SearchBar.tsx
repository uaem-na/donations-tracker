
import React from "react";
import { Input } from "@components/Controls";

export const SearchBar = ({keyword, setKeyword }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search posts..."
        value={keyword}
        onChange={handleChange}
      >
      </Input>
    </div>
  );
};
