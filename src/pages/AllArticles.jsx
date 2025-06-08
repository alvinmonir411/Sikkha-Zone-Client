import React, { useEffect, useState } from "react";
import Articlecard from "../components/Articlecard";
import axiosinstance from "../Hooks/useaxiossecure";

const AllArticles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosinstance.get("Articles").then((data) => {
      data.data;
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
