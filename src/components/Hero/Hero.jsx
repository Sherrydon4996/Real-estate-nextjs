"use client";
import { useState, useEffect } from "react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import styles from "./Hero.module.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  function handleHomeButtons(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // High-quality real estate images with different focal points
  const slides = [
    {
      image: "/landingPage1.jpg",
      alt: "Luxury modern home with pool",
      title: "Finding Your Next",
      subtitle: "Home Is Simple",
      description:
        "Experience luxury living with our exclusive collection of premium properties.",
    },
    {
      image: "/landingPage2.jpg",
      alt: "Elegant contemporary mansion",
      title: "Discover Your",
      subtitle: "Dream Property",
      description:
        "From modern penthouses to classic estates, find your perfect sanctuary.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className={styles.hero} ref={ref} id="home">
      {/* Sliding Background Images */}
      <div className={styles.sliderContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== currentSlide}
          >
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

      {/* Hero Content - Slides with images */}
      <div className={styles.contentContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.heroContent} ${
              index === currentSlide ? styles.activeContent : ""
            }`}
          >
            <div className="container">
              <h1 className={styles.heroTitle}>
                {slide.title}
                <br />
                <span className={styles.titleAccent}>{slide.subtitle}</span>
              </h1>
              <p className={styles.heroSubtitle}>{slide.description}</p>
              <div className={styles.heroActions}>
                <button
                  onClick={() => handleHomeButtons("properties")}
                  className={styles.primaryAction}
                >
                  Explore Properties <FiArrowRight />
                </button>
                <button
                  onClick={() => handleHomeButtons("gallery")}
                  className={styles.secondaryAction}
                >
                  <FiPlay /> Watch Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
