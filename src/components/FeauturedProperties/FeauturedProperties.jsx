"use client";
import { useState } from "react";
import {
  FiMaximize,
  FiMapPin,
  FiHeart,
  FiEye,
  FiArrowRight,
  FiSearch,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { FaBath as FaBathIcon, FaBed as FaBedIcon } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import styles from "./FeauturedProperties.module.css";
import PropertyModal from "./PropertyModal";

const FeaturedProperties = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [searchRef, searchInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [filtersRef, filtersInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [propertiesRef, propertiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [morePropertiesRef, morePropertiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    budget: "",
  });

  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // 'success' | 'error' | 'info'
  });

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
  ];

  const additionalProperties = [
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

  const filters = [
    { key: "all", label: "All Properties" },
    { key: "villa", label: "Villas" },
    { key: "penthouse", label: "Penthouses" },
    { key: "estate", label: "Estates" },
    { key: "townhouse", label: "Townhouses" },
    { key: "condo", label: "Condos" },
    { key: "mansion", label: "Mansions" },
  ];

  const allProperties = showMore
    ? [...properties, ...additionalProperties]
    : properties;

  // Show search results if search has been performed, otherwise show filtered properties
  const displayProperties = hasSearched ? searchResults : allProperties;

  const filteredProperties =
    activeFilter === "all"
      ? displayProperties
      : displayProperties.filter((property) => property.type === activeFilter);

  // Notification functions
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const closeNotification = () => {
    setNotification({ show: false, message: "", type: "success" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search functionality
    setTimeout(() => {
      let results = [...properties, ...additionalProperties];

      if (searchData.location) {
        results = results.filter((property) =>
          property.location
            .toLowerCase()
            .includes(searchData.location.toLowerCase())
        );
      }

      if (searchData.propertyType) {
        results = results.filter(
          (property) => property.type === searchData.propertyType
        );
      }

      if (searchData.budget) {
        const [min, max] = searchData.budget
          .split("-")
          .map((val) =>
            val.replace(/[^0-9]/g, "") === ""
              ? Number.POSITIVE_INFINITY
              : Number.parseInt(val.replace(/[^0-9]/g, ""))
          );
        results = results.filter((property) => {
          const price = Number.parseInt(property.price.replace(/[^0-9]/g, ""));
          return (
            price >= (min || 0) && price <= (max || Number.POSITIVE_INFINITY)
          );
        });
      }

      setSearchResults(results);
      setHasSearched(true);
      setIsSearching(false);
      setActiveFilter("all"); // Reset filter to show all search results

      // Show notification instead of alert
      if (results.length > 0) {
        showNotification(
          `Found ${results.length} ${
            results.length === 1 ? "property" : "properties"
          } matching your criteria!`,
          "success"
        );
      } else {
        showNotification(
          "No properties found matching your criteria. Try adjusting your search.",
          "info"
        );
      }
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleFilterChange = (filterKey) => {
    setActiveFilter(filterKey);
    if (hasSearched) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setHasSearched(false);
    setSearchResults([]);
    setSearchData({
      location: "",
      propertyType: "",
      budget: "",
    });
    setActiveFilter("all");
    showNotification("Search cleared. Showing all properties.", "info");
  };

  return (
    <>
      {/* Notification */}
      {notification.show && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <div className={styles.notificationContent}>
            <div className={styles.notificationIcon}>
              {notification.type === "success" && <FiCheckCircle />}
              {notification.type === "error" && <FiAlertCircle />}
              {notification.type === "info" && <FiSearch />}
            </div>
            <span className={styles.notificationMessage}>
              {notification.message}
            </span>
            <button
              onClick={closeNotification}
              className={styles.notificationClose}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Search Section */}
      <section className={styles.searchSection}>
        <div className={styles.searchBackground}>
          <div className={styles.searchOverlay}></div>
        </div>
        <div className={styles.container}>
          {/* Stats - Slide from Left */}
          <div
            ref={statsRef}
            className={`${styles.stats} ${
              statsInView ? styles.slideInLeft : styles.slideOutLeft
            }`}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {statsInView && (
                  <CountUp
                    end={1200}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy={false}
                  />
                )}
              </span>
              <span className={styles.statLabel}>Listed Properties</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {statsInView && (
                  <CountUp
                    end={4500}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy={false}
                  />
                )}
              </span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {statsInView && (
                  <CountUp
                    end={100}
                    duration={2.5}
                    suffix="+"
                    enableScrollSpy={false}
                  />
                )}
              </span>
              <span className={styles.statLabel}>Awards</span>
            </div>
          </div>

          {/* Search Form - Slide from Right */}
          <div
            ref={searchRef}
            className={`${styles.searchContainer} ${
              searchInView ? styles.slideInRight : styles.slideOutRight
            }`}
          >
            <h3 className={styles.searchTitle}>
              Search for available properties
            </h3>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchField}>
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  value={searchData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className={styles.searchInput}
                >
                  <option value="">Select Location</option>
                  <option value="beverly-hills">Beverly Hills, CA</option>
                  <option value="manhattan">Manhattan, NY</option>
                  <option value="malibu">Malibu, CA</option>
                  <option value="georgetown">Georgetown, DC</option>
                  <option value="miami-beach">Miami Beach, FL</option>
                  <option value="charleston">Charleston, SC</option>
                  <option value="seattle">Seattle, WA</option>
                  <option value="aspen">Aspen, CO</option>
                </select>
              </div>

              <div className={styles.searchField}>
                <label htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  value={searchData.propertyType}
                  onChange={(e) =>
                    handleInputChange("propertyType", e.target.value)
                  }
                  className={styles.searchInput}
                >
                  <option value="">Select Type</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="estate">Estate</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo</option>
                  <option value="mansion">Mansion</option>
                </select>
              </div>

              <div className={styles.searchField}>
                <label htmlFor="budget">Budget</label>
                <select
                  id="budget"
                  value={searchData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className={styles.searchInput}
                >
                  <option value="">Select Budget</option>
                  <option value="0-1000000">Under $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000-5000000">$2M - $5M</option>
                  <option value="5000000-10000000">$5M - $10M</option>
                  <option value="10000000+">$10M+</option>
                </select>
              </div>

              <button
                type="submit"
                className={styles.searchButton}
                disabled={isSearching}
              >
                <FiSearch />
                {isSearching ? "Searching..." : "Search Now"}
              </button>
            </form>

            {/* Clear Search Button */}
            {hasSearched && (
              <button
                onClick={clearSearch}
                className={styles.clearSearchButton}
              >
                Clear Search & Show All Properties
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties" className={styles.properties}>
        <div className={styles.container}>
          <div
            ref={headerRef}
            className={`${styles.header} ${
              headerInView ? styles.slideUpVisible : styles.slideUp
            }`}
          >
            <h2>
              {hasSearched
                ? `Search Results (${filteredProperties.length})`
                : "Featured Properties"}
            </h2>
            <p>
              {hasSearched
                ? "Properties matching your search criteria"
                : "Discover our handpicked selection of luxury properties"}
            </p>
          </div>

          {/* Filter Buttons */}
          <div
            ref={filtersRef}
            className={`${styles.filters} ${
              filtersInView ? styles.zoomInVisible : styles.zoomIn
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`${styles.filterButton} ${
                  activeFilter === filter.key ? styles.active : ""
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          <div ref={propertiesRef} className={styles.grid}>
            {filteredProperties
              .slice(0, showMore ? filteredProperties.length : 6)
              .map((property, index) => (
                <div
                  key={property.id}
                  className={`${styles.propertyCard} ${
                    propertiesInView
                      ? index % 2 === 0
                        ? styles.slideLeftCardVisible
                        : styles.slideRightCardVisible
                      : index % 2 === 0
                      ? styles.slideLeftCard
                      : styles.slideRightCard
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className={styles.propertyImage}
                    />
                    <div className={styles.imageOverlay}>
                      <button
                        className={styles.actionButton}
                        onClick={() => handleViewDetails(property)}
                      >
                        <FiEye />
                      </button>
                      <button className={styles.actionButton}>
                        <FiHeart />
                      </button>
                    </div>
                    {property.featured && (
                      <div className={styles.featuredBadge}>Featured</div>
                    )}
                    <div className={styles.price}>{property.price}</div>
                  </div>

                  <div className={styles.propertyInfo}>
                    <h3 className={styles.propertyTitle}>{property.title}</h3>
                    <div className={styles.location}>
                      <FiMapPin />
                      <span>{property.location}</span>
                    </div>

                    <div className={styles.features}>
                      <div className={styles.feature}>
                        <FaBedIcon />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className={styles.feature}>
                        <FaBathIcon />
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className={styles.feature}>
                        <FiMaximize />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewDetails(property)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* No Results Message */}
          {filteredProperties.length === 0 && (
            <div className={styles.noResults}>
              <FiSearch className={styles.noResultsIcon} />
              <h3>No Properties Found</h3>
              <p>
                {hasSearched
                  ? "Try adjusting your search criteria or clear the search to view all properties."
                  : "No properties match the selected filter."}
              </p>
              {hasSearched && (
                <button onClick={clearSearch} className={styles.btnPrimary}>
                  Clear Search
                </button>
              )}
            </div>
          )}

          {/* Additional Properties Section */}
          {showMore && !hasSearched && (
            <div
              ref={morePropertiesRef}
              className={`${styles.additionalPropertiesSection} ${
                morePropertiesInView ? styles.slideUpVisible : styles.slideUp
              }`}
            >
              <h3 className={styles.additionalTitle}>
                More Premium Properties
              </h3>
              <div className={styles.additionalGrid}>
                {additionalProperties
                  .filter(
                    (property) =>
                      activeFilter === "all" || property.type === activeFilter
                  )
                  .map((property, index) => (
                    <div
                      key={property.id}
                      className={`${styles.propertyCard} ${
                        morePropertiesInView
                          ? index % 2 === 0
                            ? styles.slideLeftCardVisible
                            : styles.slideRightCardVisible
                          : index % 2 === 0
                          ? styles.slideLeftCard
                          : styles.slideRightCard
                      }`}
                      style={{
                        transitionDelay: `${index * 200}ms`,
                        animationDelay: `${index * 200}ms`,
                      }}
                    >
                      <div className={styles.imageContainer}>
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className={styles.propertyImage}
                        />
                        <div className={styles.imageOverlay}>
                          <button
                            className={styles.actionButton}
                            onClick={() => handleViewDetails(property)}
                          >
                            <FiEye />
                          </button>
                          <button className={styles.actionButton}>
                            <FiHeart />
                          </button>
                        </div>
                        {property.featured && (
                          <div className={styles.featuredBadge}>Featured</div>
                        )}
                        <div className={styles.price}>{property.price}</div>
                      </div>

                      <div className={styles.propertyInfo}>
                        <h3 className={styles.propertyTitle}>
                          {property.title}
                        </h3>
                        <div className={styles.location}>
                          <FiMapPin />
                          <span>{property.location}</span>
                        </div>

                        <div className={styles.features}>
                          <div className={styles.feature}>
                            <FaBedIcon />
                            <span>{property.beds} Beds</span>
                          </div>
                          <div className={styles.feature}>
                            <FaBathIcon />
                            <span>{property.baths} Baths</span>
                          </div>
                          <div className={styles.feature}>
                            <FiMaximize />
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>

                        <button
                          className={styles.viewButton}
                          onClick={() => handleViewDetails(property)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Show More Button */}
          {!hasSearched && (
            <div className={styles.viewAllContainer}>
              <button onClick={handleShowMore} className={styles.btnPrimary}>
                {showMore ? "Show Less Properties" : "Display More Properties"}
                <FiArrowRight
                  className={`${styles.arrowIcon} ${
                    showMore ? styles.rotated : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Modal */}
      {isModalOpen && selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default FeaturedProperties;
