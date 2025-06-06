import React, { useEffect, useState } from "react";
import Categores from "./Categores";
import { NavLink } from "react-router";

const FeatureSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/FeatureArticles")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <section className="py-12 px-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Top Trending & Recent Posts
      </h1>
      <Categores />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col justify-between transition-transform hover:scale-105 duration-300"
          >
            <div className="p-5">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase font-semibold">
                {item.category}
              </span>

              <h2 className="text-xl font-semibold mt-3 text-gray-800">
                {item.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {item.content}
                <NavLink
                  to={`/Articles/id/${item._id}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Read More →
                </NavLink>
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <img
                  src={item.author_photo}
                  alt={item.author_name}
                  className="w-10 border border-blue-200 h-10 rounded-full object-cover"
                />
                <span className="text-sm text-gray-700 font-medium">
                  {item.author_name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
