import React from "react";

const topContributors = [
  {
    name: "Alvin Monir",
    email: "monir@example.com",
    photoURL: "https://i.ibb.co/RpvFW1z4/doctor-1.jpg",
    posts: 25,
    badge: "🔥 Expert Author",
  },
  {
    name: "Sarah Rahman",
    email: "sarah@example.com",
    photoURL: "https://i.ibb.co/0qVgqD1/profile2.jpg",
    posts: 18,
    badge: "💡 Creative Thinker",
  },
  {
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    photoURL: "https://i.ibb.co/7RzNq5L/profile3.jpg",
    posts: 15,
    badge: "🚀 Rising Star",
  },
  {
    name: "Alvin monir",
    email: "tanvir@example.com",
    photoURL: "https://i.ibb.co/k66KFvGg/doctor-14.jpg",
    posts: 20,
    badge: "🚀 Rising Star",
  },
  {
    name: "Alvin Monir",
    email: "monir@example.com",
    photoURL: "https://i.ibb.co/RpvFW1z4/doctor-1.jpg",
    posts: 25,
    badge: "🔥 Expert Author",
  },

  {
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    photoURL: "https://i.ibb.co/7RzNq5L/profile3.jpg",
    posts: 15,
    badge: "🚀 Rising Star",
  },
];

const TopContributors = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 container mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🏆 Top Contributors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topContributors.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-20 h-20 rounded-full mb-3 border-2 border-blue-500"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="text-sm text-green-600 mt-2">{user.badge}</span>
            <p className="text-sm text-gray-700 mt-1">{user.posts} Posts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
