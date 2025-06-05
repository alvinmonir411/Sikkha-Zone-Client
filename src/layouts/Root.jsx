import React from "react";
import Navber from "../components/Navber";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";

const Root = () => {
  return (
    <div>
      <Navber />
      <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-100px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
