import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdSubject, MdPerson, MdMessage } from "react-icons/md";
import { toast } from "react-toastify";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Get in Touch</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base">
          We'd love to hear from you. Fill out the form below and we’ll respond
          as soon as we can.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <MdPerson className="text-primary text-lg" /> Full Name
            </span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full focus:outline-primary"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <MdEmail className="text-primary text-lg" /> Email Address
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            className="input input-bordered w-full focus:outline-primary"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <MdSubject className="text-primary text-lg" /> Subject
            </span>
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Subject of your message"
            className="input input-bordered w-full focus:outline-primary"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-2">
              <MdMessage className="text-primary text-lg" /> Message
            </span>
          </label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message here..."
            className="textarea textarea-bordered w-full focus:outline-primary"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Button */}
        <div className="pt-2">
          <button
            type="submit"
            className={`btn btn-primary w-full md:w-1/3 mx-auto block ${
              loading && "btn-disabled"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default Contact;
