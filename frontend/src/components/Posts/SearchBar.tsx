import {
  FilterPostType,
  FilterUserType,
  PerPageOption,
  PostList
} from "@components";
import { useFindPostsQuery } from "@services/api";
import React, { useEffect, useState } from "react";

// export const SearchBar = ({searchTerm, setSearchTerm }) => {
export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay in ms

    return () => clearTimeout(timerId); // Cleanup
  }, [searchTerm]);

  const {
    data: posts,
    isLoading,
  } = useFindPostsQuery({
    keyword: debouncedSearchTerm
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleChange}
      />
      <PostList posts={posts?.data} />
    </div>
  );
};
