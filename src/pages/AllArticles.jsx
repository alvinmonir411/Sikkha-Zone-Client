import React, { useState } from "react";
import Articlecard from "../components/Articlecard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

const AllArticles = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  // 🔍 Fetch All Articles (for default view)
  const {
    data: allArticles = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}Articles`);
      return res.data;
    },
    enabled: !debouncedSearch, // Only when not searching
  });

  // 🔎 Fetch Search Results (when searching)
  const {
    data: searchResults = [],
    isLoading,
    isError,
    isSearchLoading,
    isSearchError,
  } = useQuery({
    queryKey: ["serchedata", debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}Articles/search?q=${debouncedSearch}`
      );
      return res.data;
    },
    enabled: !!debouncedSearch,
  });

  return (
    <div className="px-4 py-8">
      {/* 🔍 Search Bar */}
      <input
        type="search"
        placeholder="Search articles by title, category, or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-8 border rounded-lg m-10"
      />

      {/* 🔁 Loading and Error States */}
      {(isAllLoading || isSearchLoading) && <p>Loading articles...</p>}
      {(isAllError || isSearchError) && (
        <p className="text-red-500">Failed to load articles.</p>
      )}

      {/* 🧾 Article List */}
      <div className="grid grid-cols-1  gap-6">
        {(debouncedSearch ? searchResults : allArticles).map((article) => (
          <Articlecard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
