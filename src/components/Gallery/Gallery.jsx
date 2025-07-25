"use client";

import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const galleryImages = [
    {
      id: 1,
      src: "/gallery1.jpg",
      category: "exterior",
      title: "Modern Villa Exterior",
      description: "Contemporary architecture with clean lines",
    },
    {
      id: 2,
      src: "/gallery2.jpg",
      category: "interior",
      title: "Luxury Living Room",
      description: "Spacious living area with premium finishes",
    },
    {
      id: 3,
      src: "/gallery4.jpg",
      category: "exterior",
      title: "Oceanfront Property",
      description: "Stunning waterfront views and architecture",
    },
    {
      id: 4,
      src: "/gallery5.avif",
      category: "interior",
      title: "Gourmet Kitchen",
      description: "Chef-inspired kitchen with top appliances",
    },
    {
      id: 5,
      src: "/gallery7.jpg",
      category: "interior",
      title: "Master Bedroom",
      description: "Elegant master suite with panoramic views",
    },
    {
      id: 6,
      src: "/gallery8.jpg",
      category: "exterior",
      title: "Garden Landscape",
      description: "Professionally designed outdoor spaces",
    },
    {
      id: 7,
      src: "/gallery9.jpg",
      category: "interior",
      title: "Spa Bathroom",
      description: "Luxury bathroom with premium fixtures",
    },
    {
      id: 8,
      src: "/gallery10.jpg",
      category: "exterior",
      title: "Historic Estate",
      description: "Timeless elegance and classic design",
    },
    {
      id: 9,
      src: "/gallery12.jpg",
      category: "interior",
      title: "Home Office",
      description: "Sophisticated workspace with city views",
    },
  ];

  const categories = [
    { key: "all", label: "All" },
    { key: "exterior", label: "Exteriors" },
    { key: "interior", label: "Interiors" },
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section id="gallery" className={`${styles.gallery} section-padding`}>
      <div className="container">
        <div
          ref={ref}
          className={`${styles.header} ${
            inView ? "fade-in visible" : "fade-in"
          }`}
        >
          <h2>Property Gallery</h2>
          <p>
            Explore our stunning collection of luxury properties and interiors
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`${styles.categories} ${
            inView ? "slide-in-left visible" : "slide-in-left"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`${styles.categoryButton} ${
                activeCategory === category.key ? styles.active : ""
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`${styles.galleryItem} ${
                inView ? "scale-in visible" : "scale-in"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className={styles.galleryImage}
              />
              <div className={styles.overlay}>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className={styles.lightbox} onClick={closeLightbox}>
            <div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <FiX />
              </button>

              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevImage}
                aria-label="Previous image"
              >
                <FiChevronLeft />
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextImage}
                aria-label="Next image"
              >
                <FiChevronRight />
              </button>

              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className={styles.lightboxImage}
              />

              <div className={styles.lightboxInfo}>
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
