import React, { use } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./../context/AuthContext";
import axiosinstance from "../Hooks/useaxiossecure";

const PostArticle = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const category = e.target.category.value;
    const author = e.target.author.value;
    const date = e.target.date.value;
    const image = e.target.image.value;
    const tags = e.target.tags.value.split(",").map((tag) => tag.trim());
    const email = e.target.email.value;
    const name = e.target.name.value;
    const articleData = {
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

    axiosinstance
      .post("Articles", articleData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Article posted successfully!");
          e.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error posting article:", error);
        toast.error("Failed to post article. Please try again.");
      });
    "Article data:", articleData;
  };
  return (
    <div>
      <h1 className="text-blue-500 font-semibold text-5xl text-center">
        Post A New Article
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
            <label
              htmlFor="title"
              className="block text-sm font-medium text-primary-700"
            >
              Article Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter article title"
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
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter article content"
            ></textarea>
          </fieldset>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter author name"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
              className="mt-1 block w-
              
              
              
              
              
              full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter tags (e.g., education, technology)"
            />
          </fieldset>
          <fieldset>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={user?.email || ""}
              readOnly
            />
          </fieldset>
          <fieldset>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              defaultValue={user?.displayName || ""}
              readOnly
            />
          </fieldset>
          <input
            type="submit"
            className="btn w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md px-4 py-2 mt-4"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default PostArticle;
