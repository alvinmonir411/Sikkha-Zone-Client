import React, { useEffect, useState } from "react";
import Articlecard from "../components/Articlecard";

import axios from "axios";

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
