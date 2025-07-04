import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookmark, FaRegBookmark, FaEye } from "react-icons/fa";
import axios from "axios";

const Articlecard = ({ article, onBookmark, savedArticles = [] }) => {
  const {
    _id,
    title,
    content,
    category,
    author_name,
    date,
    image,
    tags,
    author_photoURL,
    visitCount,
  } = article;

  // Safely check if this article is bookmarked by comparing string versions of IDs
  const isSaved = savedArticles.some((id) => id === _id);

  const navigate = useNavigate();
  const [localVisitCount, setLocalVisitCount] = useState(visitCount || 0);
  const [loadingVisit, setLoadingVisit] = useState(false);

  const handleReadMoreClick = async (e) => {
    e.preventDefault();
    if (loadingVisit) return;
    setLoadingVisit(true);

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}articles/${_id}/visit`);
      setLocalVisitCount((prev) => prev + 1); // optimistic UI update
      navigate(`/Articles/id/${_id}`);
    } catch (error) {
      console.error("Failed to increment visit count", error);
      navigate(`/Articles/id/${_id}`);
    } finally {
      setLoadingVisit(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 rounded-2xl shadow-lg overflow-hidden p-6 mb-6 transition-shadow hover:shadow-2xl duration-300">
        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(_id)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow hover:bg-white transition"
          title={isSaved ? "Remove Bookmark" : "Save Article"}
          aria-label={isSaved ? "Remove Bookmark" : "Save Article"}
        >
          {isSaved ? (
            <FaBookmark className="text-blue-600 w-5 h-5" />
          ) : (
            <FaRegBookmark className="text-gray-600 w-5 h-5" />
          )}
        </button>

        {/* Image Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-xl"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {category}
            </span>

            <h2 className="text-2xl font-bold mt-3 text-gray-800 dark:text-white leading-snug hover:text-blue-500 transition-colors duration-300">
              {title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-4 leading-relaxed text-sm">
              {content}
            </p>

            {/* Read More triggers visit count increment */}
            <a
              href={`/Articles/id/${_id}`}
              onClick={handleReadMoreClick}
              className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium"
            >
              {loadingVisit ? "Loading..." : "Read More →"}
            </a>
          </div>

          {/* Footer: Author, Tags, Views */}
          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <img
                src={author_photoURL}
                alt={author_name}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">
                  {author_name}
                </p>
                <p className="text-xs text-gray-500">{date}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* View Count */}
            <div className="flex items-center gap-1 text-gray-500 text-sm ml-auto">
              <FaEye className="w-4 h-4 text-blue-500" />
              <span>{localVisitCount} views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Articlecard;
