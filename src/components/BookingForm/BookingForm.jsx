"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiCheck, FiAlertCircle } from "react-icons/fi";
import styles from "./BookingForm.module.css";

const ScheduleViewingModal = ({ isOpen, onClose, properties, locations }) => {
  const [notification, setNotification] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const onSubmit = async (data) => {
    try {
      // Client-side validation
      if (!/^\+?254\d{9}$/.test(data.phone)) {
        showNotification(
          "error",
          "Please enter a valid Kenyan phone number (e.g., +254712345678)"
        );
        return;
      }

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showNotification(
          "success",
          "Viewing scheduled successfully! We'll contact you soon."
        );
        reset();
        setTimeout(() => {
          onClose();
          setNotification(null);
        }, 2000);
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        showNotification(
          "error",
          errorData.message || "Failed to schedule viewing. Please try again."
        );
      }
    } catch (error) {
      showNotification(
        "error",
        "Network error occurred. Please check your connection and try again."
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={20} />
        </button>

        {/* Notification */}
        {notification && (
          <div
            className={`${styles.notification} ${styles[notification.type]}`}
          >
            {notification.type === "success" ? (
              <FiCheck size={16} />
            ) : (
              <FiAlertCircle size={16} />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        <h2 className={styles.modalTitle}>Schedule a Viewing</h2>
        <p className={styles.modalDescription}>
          Book a viewing with our expert agents.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`${styles.input} ${
                errors.name ? styles.inputError : ""
              }`}
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+254712345678"
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ""
              }`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?254\d{9}$/,
                  message: "Please enter a valid Kenyan phone number",
                },
              })}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="property" className={styles.label}>
              Property
            </label>
            <select
              id="property"
              className={`${styles.select} ${
                errors.property ? styles.inputError : ""
              }`}
              {...register("property", {
                required: "Please select a property",
              })}
            >
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.title}>
                  {property.title} - {property.location}
                </option>
              ))}
            </select>
            {errors.property && (
              <span className={styles.error}>{errors.property.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <select
              id="location"
              className={`${styles.select} ${
                errors.location ? styles.inputError : ""
              }`}
              {...register("location", {
                required: "Please select a location",
              })}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className={styles.error}>{errors.location.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input
              id="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className={`${styles.input} ${
                errors.date ? styles.inputError : ""
              }`}
              {...register("date", { required: "Preferred date is required" })}
            />
            {errors.date && (
              <span className={styles.error}>{errors.date.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              Time
            </label>
            <input
              id="time"
              type="time"
              className={`${styles.input} ${
                errors.time ? styles.inputError : ""
              }`}
              {...register("time", { required: "Preferred time is required" })}
            />
            {errors.time && (
              <span className={styles.error}>{errors.time.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Schedule Viewing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleViewingModal;
