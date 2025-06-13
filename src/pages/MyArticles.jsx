import React, { useEffect, useState } from "react";

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../Hooks/useaxiossecure";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";

const MyArticles = () => {
  const { author_email } = useParams();
  const [mydata, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
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
        axiosSecure
          .delete(`Articles/id/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
            setMyData((prevData) =>
              prevData.filter((article) => article._id !== id)
            );
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error!", "Failed to delete the article.", "error");
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100  text-primary  p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Articles
        </motion.h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner text-blue-500 loading-lg"></span>
          </div>
        ) : mydata.length === 0 ? (
          <p className="text-center text-primary-600 dark:text-primary-300">
            No articles found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <motion.table
              className="min-w-full table-auto border-collapse"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <thead className="sticky top-0 bg-base-200 text-base-content">
                <tr>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mydata.map((article) => (
                  <motion.tr
                    key={article._id}
                    className="border-b bg-base-100 text-base-content hover:bg-base-200 transition-colors"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td className="py-3 px-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-3 px-4">{article.title}</td>
                    <td className="py-3 px-4">{article.category}</td>
                    <td className="py-3 px-4">{article.date}</td>
                    <td className="py-3 px-4 space-x-3 flex items-center">
                      <Link
                        to={`/Articles/id/${article._id}`}
                        className="text-info hover:text-info-content transition"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/update-article/${article._id}`}
                        className="text-success hover:text-success-content transition"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="text-error hover:text-error-content transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles;
