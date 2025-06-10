import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeatureSection from "../components/FeatureSection";
import TopContributors from "../components/TopContributors";
import { motion } from "framer-motion";
import PlatformInsight from "../components/PlatformInsight";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-blue-600 mb-10"
      >
        Welcome to ShikkhaZone
      </motion.h1>
      <HeroSlider />
      <FeatureSection />
      <TopContributors />
      <PlatformInsight />
    </div>
  );
};

export default Home;
