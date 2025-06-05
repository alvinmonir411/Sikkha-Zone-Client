import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MyArticles = () => {
  const { author_id } = useParams();
  const [mydata, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/MyArticle/author/${author_id}`)
      .then((res) => res.json())
      .then((data) => {
        setMyData(data);
        setLoading(false);
      });
  }, [author_id]);

  const handleDelete = (id) => {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          My Articles
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner text-blue-500 loading-lg"></span>
          </div>
        ) : mydata.length === 0 ? (
          <p className="text-center text-gray-600">No articles found.</p>
        ) : (
          <div className="space-y-6">
            {mydata.map((article) => (
              <div
                key={article._id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-48 h-40 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                    {article.content}
                  </p>
                  <div className="text-sm text-gray-500 mb-3">
                    <span className="mr-4">Category: {article.category}</span>
                    <span>Date: {article.date}</span>
                  </div>

                  <div className="flex gap-4">
                    <NavLink
                      to={`/Articles/id/${article._id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
                    >
                      <FaEye className="text-white" />
                      View
                    </NavLink>
                    <Link
                      to={`/update-article/${article._id}`}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles;
