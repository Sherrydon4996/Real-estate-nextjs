"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero/Hero";
import FeaturedProperties from "@/components/FeauturedProperties/FeauturedProperties";
import Header from "./../components/Header/Header2";
import Services from "@/components/Service/Service";
import About from "@/components/About/About";
import Testimonials from "./../components/Testimonials/Testimonials";
import Gallery from "@/components/Gallery/Gallery";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="loadingScreen">
        <div className="loadingContent">
          <div className="logo">
            <h1>Prestige Properties</h1>
          </div>
          <div className="loadingSpinner">
            <div className="spinner"></div>
          </div>
          <p>Loading luxury experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main>
        <Hero />
        <FeaturedProperties />

        <Services />
        <About />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
