import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // adjust path as needed
import Articlecard from "../components/Articlecard";
import Swal from "sweetalert2";

const BookmarksPage = () => {
  const { user } = useContext(AuthContext);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bookmarked articles on mount or when user changes
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookmarks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}bookmarks/${user.email}`
        );
        setBookmarkedArticles(res.data || []);
      } catch (err) {
        setError("Failed to load bookmarks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user?.email]);

  // Handle removing bookmark
  const handleRemoveBookmark = async (articleId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}bookmarks`,
        {
          data: {
            userEmail: user.email,
            articleId,
          },
        }
      );

      if (res.data.success) {
        setBookmarkedArticles((prev) =>
          prev.filter((article) => article._id !== articleId)
        );
        Swal.fire("Removed", "Bookmark removed successfully", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to remove bookmark", "error");
    }
  };

  if (!user) {
    return <p>Please log in to view your bookmarks.</p>;
  }

  if (loading) {
    return <p>Loading bookmarked articles...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (bookmarkedArticles.length === 0) {
    return <p>You have no bookmarked articles yet.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarked Articles</h1>

      <div className="grid grid-cols-1 gap-6">
        {bookmarkedArticles.map((article) => (
          <Articlecard
            key={article._id}
            article={article}
            onBookmark={() => handleRemoveBookmark(article._id)}
            savedArticles={bookmarkedArticles.map((a) => a._id)} // all saved ids
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
