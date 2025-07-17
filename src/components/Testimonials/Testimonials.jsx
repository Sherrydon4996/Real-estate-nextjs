"use client";

import React from "react";
import { FiStar } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const testimonials = [
    {
      name: "David Thompson",
      role: "Property Investor",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Prestige Properties helped me build a diverse real estate portfolio. Their market insights are invaluable.",
      rating: 5,
    },
    {
      name: "Lisa Martinez",
      role: "Homeowner",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "The team made buying our dream home effortless. Professional, knowledgeable, and truly caring.",
      rating: 5,
    },
    {
      name: "Robert Kim",
      role: "Business Owner",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Outstanding service from start to finish. They understood our needs and delivered beyond expectations.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={styles.testimonialsContainer}>
        <div
          ref={testimonialsRef}
          className={`${styles.testimonialsContent} ${
            testimonialsInView ? styles.testimonialsVisible : ""
          }`}
        >
          <div className={styles.testimonialsHeader}>
            <span className={styles.testimonialsSubtitle}>Testimonials</span>
            <h3 className={styles.testimonialsTitle}>Client Success Stories</h3>
            <div className={styles.testimonialsDivider}></div>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`${styles.testimonialItem} ${
                  testimonialsInView
                    ? index === 0
                      ? styles.testimonialLeftVisible
                      : index === 1
                      ? styles.testimonialUpVisible
                      : styles.testimonialRightVisible
                    : index === 0
                    ? styles.testimonialLeft
                    : index === 1
                    ? styles.testimonialUp
                    : styles.testimonialRight
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={styles.testimonialCard}>
                  <div className={styles.testimonialAccent}></div>
                  <div className={styles.testimonialStars}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className={styles.starIcon} />
                    ))}
                  </div>
                  <blockquote className={styles.testimonialText}>
                    "{testimonial.text}"
                  </blockquote>
                  <div className={styles.testimonialAuthor}>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className={styles.authorImage}
                    />
                    <div>
                      <h5 className={styles.authorName}>{testimonial.name}</h5>
                      <p className={styles.authorRole}>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
