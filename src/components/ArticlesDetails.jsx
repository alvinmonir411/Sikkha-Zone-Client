import { NavLink, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { FaComment } from "react-icons/fa";
import axiosinstance from "../Hooks/useaxiossecure";
import { AuthContext } from "./../context/AuthContext";

const ArticlesDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);

  const handleCommentToggle = () => {
    setCommentOpen(!commentOpen);
  };

  // Handle Like
  const handleLike = async () => {
    try {
      await axiosinstance.post(`/Articles/id/${_id}/like`, {
        userEmail: user.email,
      });
      setLike(true);
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      setLike(false);
      toast.error(
        err.response?.data?.message || "Already liked or error occurred"
      );
    }
  };

  // Fetch article
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosinstance.get(`/Articles/id/${_id}`);
        const data = res.data;
        setArticle(data);
        setComments(data.comment || []);
        setLikeCount(data.likeCount || 0);
        setLike(data.likedBy?.includes(user.email));
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, user.email]);

  // Handle Comment Submit
  const handleCommentForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newComment = {
      comment: form.comment.value.trim(),
      articleId: _id,
      author_name: user.displayName,
      photoURL: user.photoURL,
    };

    try {
      await axiosinstance.post(`/Articles/id/${_id}/comment`, newComment);
      toast.success("Comment added successfully!");
      setComments((prev) => [...prev, newComment]);
      form.reset();
    } catch (error) {
      toast.error("Failed to add comment.");
    }
  };

  if (loading || !article) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

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
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg"
      />

      <h1 className="text-4xl font-bold mt-6 text-primary-900">{title}</h1>

      <div className="flex items-center gap-4 mt-4">
        <img
          src={author_photoURL}
          alt={author_name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex justify-between w-full">
          <div>
            <p className="font-semibold text-primary-700">{author_name}</p>
            <p className="text-sm text-primary-500">{author_email}</p>
          </div>
          <div className="md:flex gap-5 items-center">
            <button
              onClick={handleLike}
              className={`flex cursor-pointer items-center gap-1 ${
                like ? "text-blue-500" : ""
              }`}
            >
              <AiFillLike />
              like {likeCount}
            </button>
            <button
              onClick={handleCommentToggle}
              className="flex cursor-pointer items-center gap-1"
            >
              <FaComment />
              Comment
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-600">
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

      <div className="mt-8 text-lg leading-relaxed text-primary-800">
        {content}
      </div>

      <NavLink className="btn bg-blue-300 w-full mt-10" to="/AllArticles">
        View More Articles
      </NavLink>

      {/* Comment Form */}
      {commentOpen && (
        <form onSubmit={handleCommentForm} className="mt-10">
          <label className="block mb-2 text-lg font-semibold text-primary-700">
            Leave a Comment
          </label>
          <textarea
            name="comment"
            className="border-2 w-full rounded p-2"
            rows="4"
            required
          ></textarea>
          <input
            type="submit"
            className="btn mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            value="Submit"
          />
        </form>
      )}

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-primary-800">
          {comments.length} Comment{comments.length !== 1 && "s"}
        </h2>
        {comments.length > 0 ? (
          <div className="space-y-6 mt-4">
            {comments.map((c, index) => (
              <div
                key={index}
                className="flex gap-4 bg-base-50 rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <img
                  src={c.photoURL || "default-profile.png"}
                  alt={`${c.author_name}'s profile`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-primary-900">
                    {c.author_name}
                  </p>
                  <p className="mt-1 text-primary-700">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-primary-500 italic mt-2">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticlesDetails;
