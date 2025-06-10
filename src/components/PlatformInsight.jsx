import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const insights = [
  { title: "Total Users", value: 1200 },
  { title: "Total Articles", value: 350 },
  { title: "Total Comments", value: 980 },
  { title: "Top Category", value: "Web Development" },
];

const PlatformInsight = () => {
  return (
    <section className="py-10  text-center">
      <h2 className="text-3xl font-bold mb-8">📊 Platform Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {insights.map((item, index) => (
          <motion.div
            key={index}
            className="bg-base-100  p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            {typeof item.value === "number" ? (
              <p className="text-2xl font-bold text-indigo-600">
                <CountUp end={item.value} duration={2} />
              </p>
            ) : (
              <p className="text-lg font-semibold text-indigo-600">
                {item.value}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlatformInsight;
