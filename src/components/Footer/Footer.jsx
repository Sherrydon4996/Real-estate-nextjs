"use client";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUp,
} from "react-icons/fi";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Properties", href: "#properties" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Property Sales",
    "Property Rentals",
    "Investment Advisory",
    "Property Valuation",
    "Property Management",
    "Relocation Services",
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.companyInfo}>
            <h3>Prestige Properties</h3>
            <p>
              Your trusted partner in luxury real estate. We specialize in
              high-end residential and commercial properties, delivering
              exceptional service and results.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FiMapPin />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone />
                <span>+1 (234) 567-890</span>
              </div>
              <div className={styles.contactItem}>
                <FiMail />
                <span>info@prestigeproperties.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.href)}>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4>Our Services</h4>
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <button onClick={() => scrollToSection("#services")}>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.footerSection}>
            <h4>Stay Updated</h4>
            <p>
              Subscribe to our newsletter for the latest property listings and
              market insights.
            </p>
            <div className={styles.newsletter}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.emailInput}
              />
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={styles.socialLink}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; 2024 Prestige Properties. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className={styles.backToTop}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
