"use client";
import {
  FiX,
  FiMapPin,
  FiMaximize,
  FiCalendar,
  FiPhone,
  FiMail,
  FiShare2,
} from "react-icons/fi";
import {
  FaBath as FaBathIcon,
  FaBed as FaBedIcon,
  FaCar,
} from "react-icons/fa";
import styles from "./PropertyModal.module.css";

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleScheduleViewing = () => {
    alert(
      `Scheduling viewing for ${property.title}. You will be contacted by ${property.agent.name} shortly.`
    );
  };

  const handleContactAgent = () => {
    alert(`Contacting ${property.agent.name} at ${property.agent.phone}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Property link copied to clipboard!");
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.headerInfo}>
              <h2 className={styles.propertyTitle}>{property.title}</h2>
              <div className={styles.propertyLocation}>
                <FiMapPin />
                <span>{property.location}</span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.shareButton} onClick={handleShare}>
                <FiShare2 />
              </button>
              <button className={styles.closeButton} onClick={onClose}>
                <FiX />
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className={styles.imageSection}>
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className={styles.propertyImage}
            />
            <div className={styles.priceOverlay}>
              <span className={styles.price}>{property.price}</span>
              {property.featured && (
                <span className={styles.featuredBadge}>Featured</span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            {/* Property Details */}
            <div className={styles.detailsGrid}>
              <div className={styles.detailsColumn}>
                <h3 className={styles.sectionTitle}>Property Details</h3>
                <div className={styles.detailsList}>
                  <div className={styles.detailItem}>
                    <FaBedIcon className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Bedrooms:</span>
                    <span className={styles.detailValue}>{property.beds}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaBathIcon className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Bathrooms:</span>
                    <span className={styles.detailValue}>{property.baths}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FiMaximize className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Square Feet:</span>
                    <span className={styles.detailValue}>{property.sqft}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FaCar className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Garage:</span>
                    <span className={styles.detailValue}>
                      {property.garage} cars
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <FiCalendar className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Year Built:</span>
                    <span className={styles.detailValue}>
                      {property.yearBuilt}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <FiMaximize className={styles.detailIcon} />
                    <span className={styles.detailLabel}>Lot Size:</span>
                    <span className={styles.detailValue}>
                      {property.lotSize}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsColumn}>
                <h3 className={styles.sectionTitle}>Description</h3>
                <p className={styles.description}>{property.description}</p>

                <h3 className={styles.sectionTitle}>Key Features</h3>
                <ul className={styles.featuresList}>
                  <li>Premium finishes throughout</li>
                  <li>Smart home technology</li>
                  <li>Energy-efficient systems</li>
                  <li>Professional landscaping</li>
                  <li>Security system included</li>
                  <li>Move-in ready condition</li>
                </ul>
              </div>
            </div>

            {/* Agent Information */}
            <div className={styles.agentSection}>
              <h3 className={styles.sectionTitle}>Listing Agent</h3>
              <div className={styles.agentInfo}>
                <div className={styles.agentAvatar}>
                  <img
                    src="/placeholder.svg?height=60&width=60"
                    alt={property.agent.name}
                    className={styles.agentImage}
                  />
                </div>
                <div className={styles.agentDetails}>
                  <h4 className={styles.agentName}>{property.agent.name}</h4>
                  <div className={styles.agentContact}>
                    <div className={styles.contactItem}>
                      <FiPhone className={styles.contactIcon} />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <FiMail className={styles.contactIcon} />
                      <span>{property.agent.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={styles.primaryButton}
                onClick={handleScheduleViewing}
              >
                <FiCalendar />
                Schedule Viewing
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleContactAgent}
              >
                <FiPhone />
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
