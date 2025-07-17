"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import styles from "./Contact.module.css";

const Contact = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [leftRef, leftInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [rightRef, rightInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showMessage, setShowMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const watchedFields = watch();

  // Updated handleShowMessage function
  function handleShowMessage() {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setSubmitStatus(null); // Clear the status after hiding
    }, 3000);
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        reset(); // Reset form on success
        handleShowMessage(); // Auto-hide success message after 3 seconds
      } else {
        setSubmitStatus("error");
        handleShowMessage(); // Auto-hide error message after 3 seconds
        console.error("Form submission error:", result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
      handleShowMessage(); // Auto-hide error message after 3 seconds
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Visit Our Office",
      details: [
        "123 Luxury Avenue",
        "Beverly Hills, CA 90210",
        "United States",
      ],
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: [
        "+1 (234) 567-890",
        "+1 (234) 567-891",
        "Toll Free: 1-800-PRESTIGE",
      ],
    },
    {
      icon: FiMail,
      title: "Email Us",
      details: [
        "info@prestigeproperties.com",
        "sales@prestigeproperties.com",
        "support@prestigeproperties.com",
      ],
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 5:00 PM",
        "Sunday: By Appointment",
      ],
    },
  ];

  return (
    <section id="contact" className={styles.contact}>
      {/* Background Elements */}
      <div className={styles.backgroundImage}></div>
      <div className={styles.backgroundOverlay}></div>

      <div className={styles.container}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${
            headerInView ? styles.headerVisible : styles.headerHidden
          }`}
        >
          <div className={styles.badge}>
            <span>Contact Us</span>
          </div>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Ready to find your dream property? Contact our expert team today
          </p>
        </div>

        {/* Contact Content */}
        <div className={styles.contactContent}>
          {/* Contact Information - Slide from Left */}
          <div
            ref={leftRef}
            className={`${styles.contactInfo} ${
              leftInView ? styles.slideInLeft : styles.slideOutLeft
            }`}
          >
            <div className={styles.infoContainer}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <p className={styles.infoDescription}>
                We're here to help you with all your real estate needs. Reach
                out to us through any of the following channels, and we'll get
                back to you promptly.
              </p>

              <div className={styles.infoGrid}>
                {contactInfo.map((info, index) => (
                  <div key={info.title} className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <info.icon />
                    </div>
                    <div className={styles.infoDetails}>
                      <h4>{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733!2d-118.4085!3d34.0901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1635789012345!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Prestige Properties Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form - Slide from Right */}
          <div
            ref={rightRef}
            className={`${styles.contactForm} ${
              rightInView ? styles.slideInRight : styles.slideOutRight
            }`}
          >
            <div className={styles.formContainer}>
              <h3 className={styles.formTitle}>Send us a Message</h3>
              <p className={styles.formDescription}>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      <FiUser />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`${styles.formInput} ${
                        errors.name ? styles.inputError : ""
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <span className={styles.errorText}>
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      <FiMail />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className={`${styles.formInput} ${
                        errors.email ? styles.inputError : ""
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <span className={styles.errorText}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      <FiPhone />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone", {
                        pattern: {
                          value: /^\+?[\d\s\-\(\)]+$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className={styles.formInput}
                      placeholder="+1 (234) 567-890"
                    />
                    {errors.phone && (
                      <span className={styles.errorText}>
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      <FiMessageSquare />
                      Subject
                    </label>
                    <select
                      id="subject"
                      {...register("subject")}
                      className={styles.formSelect}
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying Property</option>
                      <option value="selling">Selling Property</option>
                      <option value="renting">Property Rental</option>
                      <option value="investment">
                        Investment Opportunities
                      </option>
                      <option value="valuation">Property Valuation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    <FiMessageSquare />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`${styles.formTextarea} ${
                      errors.message ? styles.inputError : ""
                    }`}
                    placeholder="Tell us about your real estate needs..."
                  />
                  {errors.message && (
                    <span className={styles.errorText}>
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Success/Error Messages */}
                {submitStatus === "success" && showMessage && (
                  <div className={styles.successMessage}>
                    <FiCheckCircle />
                    <span>
                      Message sent successfully! We'll get back to you within 24
                      hours.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && showMessage && (
                  <div className={styles.errorMessage}>
                    <FiAlertCircle />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.submitButton} ${
                    isSubmitting ? styles.submitButtonDisabled : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
