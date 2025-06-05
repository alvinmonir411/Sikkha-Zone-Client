import React from "react";
import { NavLink } from "react-router";

const Categores = () => {
  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Health" },
    { id: 3, name: "Education" },
    { id: 4, name: "Lifestyle" },
    { id: 5, name: "Travel" },
  ];
  return (
    <div className="flex justify-center gap-5 items-center my-10">
      <ul className="flex gap-5 rounded-2xl">
        {categories.map((category) => (
          <NavLink to={`/category/${category.name}`} key={category.id}>
            <button className="btn"> {category.name}</button>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Categores;
