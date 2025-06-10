import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}Articles/id/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        toast.error("Failed to fetch article data.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const category = e.target.category.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;
    const tags = e.target.tags.value
      ? e.target.tags.value.split(",").map((tag) => tag.trim())
      : [];

    const updatedArticle = {
      title,
      content,
      category,
      author,
      date,
      image,
      tags,
      author_id: user?.uid,
      author_name: user?.displayName,
      author_email: user?.email,
      author_photoURL: user?.photoURL || "",
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}Articles/${id}`, updatedArticle)
      .then(() => {
        toast.success("Article updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        toast.error("Failed to update article. Please try again.");
      });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading article data...</div>;
  }

  if (!data) {
    return <div className="text-center mt-10">Article not found.</div>;
  }

  const { title, content, category, author, date, image, tags } = data;

  return (
    <div>
      <h1 className="text-blue-500 font-semibold text-5xl text-center">
        Update your Article
      </h1>
      <div className="max-w-5xl mx-auto px-4 py-6 shadow-2xl rounded-lg bg-base-100 dark:bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-4">
          Share Your Knowledge
        </h2>
        <p className="text-primary-600 text-center mb-6">
          Share your knowledge and insights with the{" "}
          <span className="font-semibold">world</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <fieldset>
            <label className="block text-sm font-medium text-primary-700">
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={title}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter article title"
              required
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-primary-700"
            >
              Article Content
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={content}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter article content"
              required
            ></textarea>
          </fieldset>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              defaultValue={category}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Environment">Environment</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <fieldset>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-primary-700"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={author}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter author name"
              required
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-primary-700"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              defaultValue={date}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </fieldset>

          <fieldset>
            <label className="block text-sm font-medium text-primary-700">
              Article Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={image}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter image URL"
            />
          </fieldset>

          <fieldset>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-primary-700"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              defaultValue={tags?.join(", ") || ""}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter tags (e.g., education, technology)"
            />
          </fieldset>

          <fieldset>
            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              readOnly
            />
          </fieldset>

          <fieldset>
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              readOnly
            />
          </fieldset>

          <input
            type="submit"
            className="btn w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-4 py-2 mt-4"
            value="Update Article"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
