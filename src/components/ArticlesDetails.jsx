import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../Hooks/useaxiossecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ArticlesDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  // ✅ Fetch Article
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["article", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`Articles/id/${_id}`);
      return res.data;
    },
  });
  console.log(article);
  // ✅ Set Like and Comment States
  useEffect(() => {
    if (article) {
      setLike(article.likedBy?.includes(user.email));
      setLikeCount(article.likeCount || 0);
      setComments(article.comment || []);
    }
  }, [article, user.email]);

  // ✅ Like Mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post(`Articles/id/${_id}/like`, {
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Liked!");
      setLike(true);
      setLikeCount((prev) => prev + 1);
      queryClient.invalidateQueries({ queryKey: ["article", _id] });
    },
    onError: () => {
      toast.error("Already liked");
    },
  });

  const handleLike = () => {
    if (!like) likeMutation.mutate();
  };

  // ✅ Comment Mutation
  const commentMutation = useMutation({
    mutationFn: async (newComment) => {
      return axiosSecure.post(`Articles/id/${_id}/comment`, newComment);
    },
    onSuccess: (_, newComment) => {
      toast.success("Comment added!");
      setComments((prev) => [...prev, newComment]);
      queryClient.invalidateQueries({ queryKey: ["article", _id] });
    },
    onError: () => {
      toast.error("Failed to add comment.");
    },
  });

  const handleCommentForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const newComment = {
      comment: form.comment.value.trim(),
      articleId: _id,
      author_name: user.displayName,
      photoURL: user.photoURL,
    };

    commentMutation.mutate(newComment);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load article.
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
              Like {likeCount}
            </button>
            <button className="flex cursor-pointer items-center gap-1">
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
        {tags?.map((tag, idx) => (
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
      <NavLink
        className="btn bg-blend-color-burn w-full mt-10"
        to="/AllArticles"
      >
        View More Articles
      </NavLink>

      {/* ✅ Comment Form */}
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
                  src={c.author_photoURL || "default-profile.png"}
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
