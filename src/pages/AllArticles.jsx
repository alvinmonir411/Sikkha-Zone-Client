import React, { useEffect, useState } from "react";
import Articlecard from "../components/Articlecard";
import { motion } from "framer-motion";
import axios from "axios";
import FilterArticle from "../components/FilterArtilce";

const AllArticles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}Articles`).then((data) => {
      setData(data.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FilterArticle />
      </motion.div>
      {loading ? (
        <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      ) : (
        <ul>
          {data.map((article) => (
            <Articlecard key={article._id} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllArticles;
