"use client";

import { useState } from "react";
import { FiMenu, FiX, FiPhone, FiMail } from "react-icons/fi";
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

  const properties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      type: "villa",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description:
        "Stunning modern villa with panoramic city views, featuring high-end finishes and smart home technology.",
      yearBuilt: 2021,
      lotSize: "0.8 acres",
      garage: 3,
      agent: {
        name: "Sarah Johnson",
        phone: "(555) 123-4567",
        email: "sarah@luxuryrealty.com",
      },
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      location: "Manhattan, NY",
      price: "$4,200,000",
      beds: 3,
      baths: 3,
      sqft: "2,800",
      type: "penthouse",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description:
        "Luxurious penthouse in the heart of Manhattan with breathtaking skyline views and premium amenities.",
      yearBuilt: 2019,
      lotSize: "N/A",
      garage: 2,
      agent: {
        name: "Michael Chen",
        phone: "(555) 987-6543",
        email: "michael@manhattanlux.com",
      },
    },
    {
      id: 3,
      title: "Oceanfront Estate",
      location: "Malibu, CA",
      price: "$6,750,000",
      beds: 6,
      baths: 5,
      sqft: "5,500",
      type: "estate",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description:
        "Spectacular oceanfront estate with private beach access, infinity pool, and world-class entertaining spaces.",
      yearBuilt: 2020,
      lotSize: "2.1 acres",
      garage: 4,
      agent: {
        name: "Emma Rodriguez",
        phone: "(555) 456-7890",
        email: "emma@malibucoast.com",
      },
    },
    {
      id: 4,
      title: "Contemporary Townhouse",
      location: "Georgetown, DC",
      price: "$1,950,000",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      type: "townhouse",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      description:
        "Elegant townhouse in historic Georgetown with modern updates and charming original details.",
      yearBuilt: 2018,
      lotSize: "0.1 acres",
      garage: 2,
      agent: {
        name: "David Wilson",
        phone: "(555) 234-5678",
        email: "david@georgetownhomes.com",
      },
    },
    {
      id: 5,
      title: "Luxury Condo",
      location: "Miami Beach, FL",
      price: "$1,450,000",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      type: "condo",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      description:
        "Sophisticated beachfront condo with floor-to-ceiling windows and resort-style amenities.",
      yearBuilt: 2022,
      lotSize: "N/A",
      garage: 1,
      agent: {
        name: "Sofia Martinez",
        phone: "(555) 345-6789",
        email: "sofia@miamibeachlux.com",
      },
    },
    {
      id: 6,
      title: "Historic Mansion",
      location: "Charleston, SC",
      price: "$3,200,000",
      beds: 7,
      baths: 6,
      sqft: "6,800",
      type: "mansion",
      image:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      description:
        "Magnificent antebellum mansion meticulously restored with period details and modern conveniences.",
      yearBuilt: 1847,
      lotSize: "1.5 acres",
      garage: 3,
      agent: {
        name: "Robert Thompson",
        phone: "(555) 567-8901",
        email: "robert@charlestonestates.com",
      },
    },
    {
      id: 7,
      title: "Waterfront Penthouse",
      location: "Seattle, WA",
      price: "$3,750,000",
      beds: 4,
      baths: 4,
      sqft: "3,800",
      type: "penthouse",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description:
        "Contemporary waterfront penthouse with panoramic Sound views and premium finishes throughout.",
      yearBuilt: 2020,
      lotSize: "N/A",
      garage: 2,
      agent: {
        name: "Jennifer Lee",
        phone: "(555) 678-9012",
        email: "jennifer@seattlewaterfront.com",
      },
    },
    {
      id: 8,
      title: "Mountain View Estate",
      location: "Aspen, CO",
      price: "$8,500,000",
      beds: 8,
      baths: 7,
      sqft: "7,200",
      type: "estate",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description:
        "Spectacular mountain estate with ski-in/ski-out access and breathtaking alpine views.",
      yearBuilt: 2019,
      lotSize: "3.2 acres",
      garage: 4,
      agent: {
        name: "Mark Anderson",
        phone: "(555) 789-0123",
        email: "mark@aspenluxury.com",
      },
    },
  ];

  const locations = [
    { value: "beverly-hills", label: "Beverly Hills, CA" },
    { value: "manhattan", label: "Manhattan, NY" },
    { value: "malibu", label: "Malibu, CA" },
    { value: "georgetown", label: "Georgetown, DC" },
    { value: "miami-beach", label: "Miami Beach, FL" },
    { value: "charleston", label: "Charleston, SC" },
    { value: "seattle", label: "Seattle, WA" },
    { value: "aspen", label: "Aspen, CO" },
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
                FB
              </a>
              <a href="#" aria-label="Instagram">
                IG
              </a>
              <a href="#" aria-label="LinkedIn">
                LI
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
        properties={properties}
        locations={locations}
      />
    </>
  );
};

export default Header;
