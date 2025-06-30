import React from "react";
import { NavLink } from "react-router";

const Articlecard = ({ article }) => {
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
  } = article;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 rounded-2xl shadow-lg overflow-hidden p-6 mb-6 transition-shadow hover:shadow-2xl  duration-300">
        {/* Image */}
        <div className="w-full h-64 md:h-auto overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
            <h2 className="text-2xl font-semibold mt-2 text-primary-900 leading-snug">
              {title}
            </h2>
            <p className="text-primary-700 mt-3 line-clamp-4 leading-relaxed">
              {content}
            </p>
            <NavLink
              to={`/Articles/id/${_id}`}
              className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800 transition"
            >
              Read More →
            </NavLink>
          </div>

          {/* Footer: Author & Tags */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <img
                src={author_photoURL}
                alt={author_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-primary-700">{author_name}</p>
                <p className="text-sm text-primary-500">{date}</p>
              </div>
            </div>
            <div className="hidden md:flex flex-wrap gap-2">
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articlecard;
