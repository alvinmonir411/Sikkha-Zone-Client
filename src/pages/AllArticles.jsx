import React, { useEffect, useState } from "react";
import Articlecard from "../components/Articlecard";

const AllArticles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/Articles")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
            <Articlecard key={article.id} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllArticles;
