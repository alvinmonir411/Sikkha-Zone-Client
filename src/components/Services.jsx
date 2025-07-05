import React from "react";
import { motion } from "framer-motion";
import { FaTasks, FaGavel, FaUserCheck, FaShieldAlt } from "react-icons/fa";

const services = [
  {
    title: "Post a Task",
    description:
      "Easily post tasks with details, deadline & budget. Let others help you get things done.",
    icon: <FaTasks className="text-4xl text-blue-600" />,
  },
  {
    title: "Bid on Tasks",
    description:
      "Explore tasks and place competitive bids with a message to increase your chances.",
    icon: <FaGavel className="text-4xl text-green-600" />,
  },
  {
    title: "Manage Tasks",
    description:
      "Track your task status, bids, and assignments from your personal dashboard.",
    icon: <FaUserCheck className="text-4xl text-purple-600" />,
  },
  {
    title: "Secure & Admin Controlled",
    description:
      "Admin ensures all tasks are moderated. Users stay safe and protected.",
    icon: <FaShieldAlt className="text-4xl text-red-600" />,
  },
];

const Service = () => {
  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Empowering users to connect, collaborate, and complete tasks
          efficiently in a secure environment.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md p-6 rounded-2xl hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
