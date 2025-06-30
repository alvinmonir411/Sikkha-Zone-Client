import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useaxiossecure";

const FilterArticle = () => {
  const { categoryName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setLoading(true);

    axiosSecure
      .get(`Articles/${categoryName}`)
      .then((response) => {
        const articles = response.data;
        articles;
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
        <p className="text-center text-lg text-primary-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-red-500 text-xl">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((article) => (
            <div
              key={article._id}
              className="bg-base-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
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
                <h2 className="text-xl font-semibold text-primary-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-primary-600 text-sm mb-3">
                  {article.description?.slice(0, 120)}...
                </p>
                <NavLink
                  to={`/Articles/id/${article._id}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Read More →
                </NavLink>
                <div className="flex items-center justify-between text-sm text-primary-500 mt-3">
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

export default FilterArticle;
