import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const FilterArtilce = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/Articles/${categoryName}`)
      .then((response) => response.json())
      .then((articles) => {
        setData(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Articles in "{categoryName}"
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-red-500 text-xl">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {article.category}
                </span>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {article.description?.slice(0, 120)}...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <p>By {article.author || "Unknown"}</p>
                  <p>{article.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterArtilce;
