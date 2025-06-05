import React from "react";

const Articlecard = ({ article }) => {
  const {
    title,
    content,
    category,
    author,
    date,
    image,
    tags,
    author_id,
    author_name,
    author_email,
    author_photoURL,
  } = article;
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-2xl shadow-lg overflow-hidden p-4 md:p-6 mb-6 transition hover:shadow-2xl duration-300">
        {/* Image */}
        <div className="w-full h-64 md:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          {/* Title and Category */}
          <div>
            <span className="text-sm text-indigo-600 font-medium">
              {category}
            </span>
            <h2 className="text-2xl font-semibold mt-2 text-gray-800">
              {title}
            </h2>
            <p className="text-gray-600 mt-3 line-clamp-4">{content}</p>
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
                <p className="font-semibold text-gray-700">{author_name}</p>
                <p className="text-sm text-gray-500">{date}</p>
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
