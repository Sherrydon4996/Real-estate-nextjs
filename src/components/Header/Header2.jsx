"use client";

import { useState } from "react";
import { FiMenu, FiX, FiPhone, FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Header2.module.css";
import ScheduleViewingModal from "./../BookingForm/BookingForm";

const Header = ({ isScrolled, scrollToSection, isMenuOpen, setIsMenuOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Listings", href: "#properties" },
    { name: "Gallery", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top Bar - Only visible when scrolled */}
      <div
        className={`${styles.topBar} ${isScrolled ? styles.topBarVisible : ""}`}
      >
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.contactInfo}>
              <a href="tel:+1234567890" className={styles.contactItem}>
                <FiPhone size={14} />
                <span>+1 (234) 567-890</span>
              </a>
              <a
                href="mailto:info@prestigeproperties.com"
                className={styles.contactItem}
              >
                <FiMail size={14} />
                <span>info@prestigeproperties.com</span>
              </a>
            </div>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className="container">
          <div className={styles.headerContent}>
            {/* Logo */}
            <div className={styles.logo}>
              <h1>Prestige Properties</h1>
              <span>Luxury Real Estate</span>
            </div>

            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={styles.navItem}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              className={`${styles.ctaButton} btn-primary`}
              onClick={() => setIsModalOpen(true)}
            >
              Schedule Viewing
            </button>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.href);
                  setIsMenuOpen(false);
                }}
                className={styles.mobileNavItem}
              >
                {item.name}
              </button>
            ))}
            <button
              className={`btn-primary ${styles.mobileCtaButton}`}
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Schedule Viewing
            </button>
          </nav>
        </div>
      </header>

      {/* Schedule Viewing Modal */}
      <ScheduleViewingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
