import { NavLink, useParams } from "react-router";
import { useEffect, useState } from "react";

const ArticlesDetails = () => {
  const { _id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(_id);

  useEffect(() => {
    fetch(`http://localhost:3000/Articles/id/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [_id]);

  if (!article) return <p className="text-center py-10">Loading...</p>;
  if (loading)
    return (
      <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    );

  const {
    title,
    content,
    image,
    category,
    date,
    author_name,
    author_photoURL,
    author_email,
    tags,
  } = article;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Article Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6 text-gray-900">{title}</h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-4">
        <img
          src={author_photoURL}
          alt={author_name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-700">{author_name}</p>
          <p className="text-sm text-gray-500">{author_email}</p>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
          📅 {date}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
          📚 {category}
        </span>
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 text-lg leading-relaxed text-gray-800">
        {content}
      </div>

      <NavLink className="btn bg-blue-300 w-full mt-10" to="/AllArticles">
        View More Article
      </NavLink>
    </div>
  );
};

export default ArticlesDetails;
