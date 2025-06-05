import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const slides = [
  {
    id: 1,
    image: "/Slider4.jpg",
    title: "Share Your Knowledge",
    description:
      "Empower others with your expertise and explore insightful articles from our vibrant community.",
  },
  {
    id: 2,
    image: "/Slider.5.jpg",
    title: "Inspire with Your Ideas",
    description: "Write what you know, read what you don’t, and grow together.",
  },
  {
    id: 3,
    image: "/Slider4.jpg",
    title: "Build a Knowledge Network",
    description:
      "Connect with contributors across technology, science, and arts.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
      ))}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-30">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-xl max-w-xl drop-shadow-md mb-6">
          {slides[currentSlide].description}
        </p>
        <NavLink to="AllArticles">
          <button className="btn btn-primary px-6 py-2 text-lg">
            Explore Articles
          </button>
        </NavLink>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 w-full flex justify-between px-5 transform -translate-y-1/2 z-40">
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-black/40 text-white border-none hover:bg-black/70"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-black/40 text-white border-none hover:bg-black/70"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
