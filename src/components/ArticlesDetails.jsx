import { NavLink, useParams } from "react-router";
import { use, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { FaComment } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/Authcontext";

const ArticlesDetails = () => {
  const { user } = use(AuthContext);
  console.log(user);
  const { _id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [like, setlike] = useState(false);
  const [comment, setComment] = useState([]);

  const [commentOpen, setCommentOpen] = useState(false);
  const hanldeComment = () => {
    console.log("comment clicked");
    setCommentOpen(!commentOpen);
  };

  // handle comment form submission
  const hanldeCommentform = (e) => {
    e.preventDefault();
    const form = e.target;
    const commentText = {
      comment: form.comment.value.trim(),
      articleId: _id,
      author_name: author_name,
      photoURLL: user.photoURL,
    };
    // sending comment to the server
    axios
      .post(`http://localhost:3000/Articles/id/${_id}/comment`, commentText)
      .then(() => {
        toast.success("Comment added successfully!");
        setComment(commentText);
        form.reset();
      })
      .catch((error) => {
        toast.error("faild to add comment  ");
      });
  };

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
        <div className="flex justify-between w-full">
          <div>
            {" "}
            <p className="font-semibold text-gray-700">{author_name}</p>
            <p className="text-sm text-gray-500">{author_email}</p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => {
                setlike(!like);
              }}
              className={`flex items-center gap-1 ${
                like ? "text-blue-500" : ""
              }`}
            >
              <AiFillLike />
              like
            </button>
            <button
              onClick={() => hanldeComment()}
              className="flex items-center gap-1"
            >
              <FaComment />
              Comment
            </button>
          </div>
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

      <form
        onSubmit={hanldeCommentform}
        className={` "mt-10" ${commentOpen ? "block" : "hidden"} `}
      >
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          Leave a Comment
        </label>
        <textarea
          name="comment"
          className="border-2 w-full"
          cols="4"
          id=""
        ></textarea>
        <input type="submit" className="btn" value="Submit" />
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
        <div>
          <h2>Comments</h2>
          {/* Comments List */}
          {article.comment && article.comment.length > 0 ? (
            <div className="space-y-6">
              {article.comment.map((c, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <img
                    src={c.photoURL || "default-profile.png"}
                    alt={`${c.author_name}'s profile`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {c.author_name}
                    </p>
                    <p className="mt-1 text-gray-700">{c.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesDetails;
