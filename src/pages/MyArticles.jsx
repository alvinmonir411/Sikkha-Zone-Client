import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosinstance from "../Hooks/useaxiossecure";

const MyArticles = () => {
  const { author_email } = useParams();
  const [mydata, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosinstance
      .get(`MyArticle/author/${author_email}`)
      .then((data) => {
        setMyData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
        setLoading(false);
      });
  }, [author_email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosinstance
          .delete(`Articles/id/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your article has been deleted.",
              icon: "success",
            });

            setMyData((prevData) =>
              prevData.filter((article) => article._id !== id)
            );
          })
          .catch((error) => {
            console.error("There was an error deleting the article!", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the article.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-base-900 text-black dark:text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          My Articles
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner text-blue-500 loading-lg"></span>
          </div>
        ) : mydata.length === 0 ? (
          <p className="text-center text-primary-600 dark:text-primary-300">
            No articles found.
          </p>
        ) : (
          <div className="space-y-6">
            {mydata.map((article) => (
              <div
                key={article._id}
                className="bg-base-100 dark:bg-base-800 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-48 h-40 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-1">
                    {article.title}
                  </h2>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-2 line-clamp-3">
                    {article.content}
                  </p>
                  <div className="text-sm text-primary-500 dark:text-primary-300 mb-3">
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
                      className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:underline"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline"
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
