import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeatureSection from "../components/FeatureSection";
import TopContributors from "../components/TopContributors";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        Welcome to ShikkhaZone
      </h1>
      <HeroSlider />
      <FeatureSection />
      <TopContributors />
    </div>
  );
};

export default Home;
