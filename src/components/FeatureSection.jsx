import React, { useEffect, useState } from "react";
import Categores from "./Categores";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../Hooks/useaxiossecure";

const FeatureSection = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`FeatureArticles`)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
      });
  }, []);
  return (
    <section className="py-12 px-4 bg-base-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Top Trending & Recent Posts
      </h1>
      <Categores />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-base-100 shadow-lg rounded-xl overflow-hidden flex flex-col justify-between transition-transform hover:scale-105 duration-300"
          >
            <NavLink to={`/Articles/id/${item._id}`} className="">
              <div className="p-5">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase font-semibold">
                  {item.category}
                </span>

                <h2 className="text-xl font-semibold mt-3 text-primary-800">
                  {item.title}
                </h2>

                <p className="text-primary-600 text-sm mt-2 line-clamp-3">
                  {item.content}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-base-200 text-primary-700 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-base-50">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.author_photoURL}
                    alt={item.author_name}
                    className="w-10 border border-blue-200 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm text-primary-700 font-medium">
                    {item.author_name}
                  </span>
                  <span>📅 {item.date}</span>
                </div>
              </div>{" "}
            </NavLink>
          </div>
        ))}{" "}
      </div>
    </section>
  );
};

export default FeatureSection;
