import React, { useState, useEffect, useContext } from "react";
import Articlecard from "../components/Articlecard";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { AuthContext } from "./../context/AuthContext";

const AllArticles = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState("newest");
  const { user } = useContext(AuthContext);

  // Store bookmarked article IDs as strings
  const [savedIds, setSavedIds] = useState([]);

  // Fetch bookmarks when user changes
  useEffect(() => {
    if (!user?.email) {
      setSavedIds([]); // Clear bookmarks on logout or no user
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}bookmarks/${user.email}`
        );
 
        const bookmarkedIds = res.data.map((b) => b?._id);
        setSavedIds(bookmarkedIds);
      } catch (err) {
        console.error("Failed to fetch bookmarks", err);
      }
    };

    fetchBookmarks();
  }, [user]);

  // Toggle bookmark add/remove
  const handleBookmark = async (articleId) => {
    if (!user?.email) {
      Swal.fire(
        "⚠️ Login required",
        "Please login to bookmark articles.",
        "warning"
      );
      return;
    }

    const idStr = articleId.toString();

    try {
      if (savedIds.includes(idStr)) {
        // Remove bookmark
        await axios.delete(`${import.meta.env.VITE_API_URL}bookmarks`, {
          data: { articleId, userEmail: user.email },
        });
        setSavedIds((prev) => prev.filter((id) => id !== idStr));
        Swal.fire("Removed", "Bookmark removed successfully.", "success");
      } else {
        // Add bookmark
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}bookmarks`,
          {
            articleId,
            userEmail: user.email,
          }
        );
        if (res.data.insertedId || res.data.success) {
          setSavedIds((prev) => [...prev, idStr]);
          Swal.fire("Saved!", "Article bookmarked successfully.", "success");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Could not update bookmark.", "error");
      console.error(error);
    }
  };

  // Fetch all articles
  const {
    data: allArticles = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ["allArticles", sortBy],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}Articles?sort=${sortBy}`
      );
      return res.data;
    },
    enabled: !debouncedSearch,
  });

  // Fetch searched articles
  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useQuery({
    queryKey: ["searchArticles", debouncedSearch, sortBy],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }Articles/search?q=${debouncedSearch}&sort=${sortBy}`
      );
      return res.data;
    },
    enabled: !!debouncedSearch,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="search"
          placeholder="🔍 Search articles by title, category, or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">🆕 Newest</option>
          <option value="oldest">📜 Oldest</option>
          <option value="liked">❤️ Most Liked</option>
        </select>
      </div>

      {(isAllLoading || isSearchLoading) && (
        <div className="text-center text-blue-600 font-semibold">
          Loading articles...
        </div>
      )}
      {(isAllError || isSearchError) && (
        <div className="text-center text-red-500 font-semibold">
          Failed to load articles.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {(debouncedSearch ? searchResults : allArticles).map((article) => (
          <Articlecard
            key={article._id}
            article={article}
            onBookmark={handleBookmark}
            savedArticles={savedIds}
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
