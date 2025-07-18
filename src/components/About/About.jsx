"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./About.module.css";

const About = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const [partnersRef, partnersInView] = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const partners = [
    {
      name: "Luxury Estates",
      logo: "/logo1.jpg",
    },
    {
      name: "Elite Properties",
      logo: "/logopartner2.jpg",
    },
    {
      name: "Prime Realty",
      logo: "/logopartner3.jpg",
    },
    {
      name: "Global Homes",
      logo: "/logopartner4.jpg",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/TeamMember1.jpg",
      bio: "With over 20 years in luxury real estate, Sarah has built Prestige Properties into a leading firm.",
    },
    {
      name: "Michael Chen",
      role: "Senior Partner",
      image: "/teamMember2.jpg",
      bio: "Michael specializes in high-end commercial properties and investment opportunities.",
    },
    {
      name: "Emily Rodriguez",
      role: "Director of Sales",
      image: "/teamMember3.jpg",
      bio: "Emily leads our residential sales team with expertise in luxury home markets.",
    },
  ];

  return (
    <section id="about" className={styles.about}>
      {/* Hero Header Section with Luxury Background */}
      <div className={styles.heroHeader}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div
            ref={headerRef}
            className={`${styles.headerContainer} ${
              headerInView ? styles.headerVisible : ""
            }`}
          >
            <div className={styles.premiumBadge}>
              <span>Premium Real Estate</span>
            </div>
            <h2 className={styles.heroTitle}>Introducing A New</h2>
            <h3 className={styles.heroSubtitle}>Standard of Excellence</h3>
            <p className={styles.heroDescription}>
              Your trusted partner in luxury real estate for over 15 years,
              creating extraordinary experiences in premium property acquisition
            </p>
          </div>
        </div>
      </div>

      {/* Partners Section with Scrolling Animation */}
      <div className={styles.partnersSection}>
        <div className={styles.partnersBackground}></div>
        <div className={styles.partnersOverlay}></div>
        <div className={styles.partnersContainer}>
          <div
            ref={partnersRef}
            className={`${styles.partnersGrid} ${
              partnersInView ? styles.partnersVisible : ""
            }`}
          >
            <div className={styles.partnersTrack}>
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className={styles.partnerItem}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={styles.partnerLogo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story Section with Parallax Effect */}
      <div className={styles.storySection}>
        <div className={styles.storyBackground}></div>
        <div className={styles.storyContainer}>
          <div
            ref={storyRef}
            className={`${styles.storyGrid} ${
              storyInView ? styles.storyVisible : ""
            }`}
          >
            <div className={styles.storyContent}>
              <div className={styles.storyHeader}>
                <span className={styles.storySubtitle}>Our Journey</span>
                <h3 className={styles.storyTitle}>Our Story</h3>
                <div className={styles.storyDivider}></div>
              </div>

              <div className={styles.storyText}>
                <p>
                  Founded in 2008, Prestige Properties has grown from a boutique
                  real estate firm to one of the most respected names in luxury
                  property sales and management.
                </p>
                <p>
                  We specialize in high-end residential and commercial
                  properties, offering comprehensive services from property
                  acquisition to investment management.
                </p>
              </div>

              <div className={styles.valuesGrid}>
                {[
                  {
                    title: "Excellence",
                    desc: "Maintaining the highest standards in every aspect of our service",
                  },
                  {
                    title: "Integrity",
                    desc: "Honest, transparent dealings form the foundation of our relationships",
                  },
                  {
                    title: "Innovation",
                    desc: "Leveraging cutting-edge technology and market insights",
                  },
                ].map((value, index) => (
                  <div key={value.title} className={styles.valueGroup}>
                    <div className={styles.valueCard}>
                      <h4 className={styles.valueTitle}>{value.title}</h4>
                      <p className={styles.valueDesc}>{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.storyImageWrapper}>
              <div className={styles.storyImageBackground}></div>
              <div className={styles.storyImageContainer}>
                <img
                  src="/servicesImage2.jpg"
                  alt="Prestige Properties Office"
                  className={styles.storyImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with Luxury Background */}
      <div className={styles.teamSection}>
        <div className={styles.teamContainer}>
          <div
            ref={teamRef}
            className={`${styles.teamContent} ${
              teamInView ? styles.teamVisible : ""
            }`}
          >
            <div className={styles.teamHeader}>
              <span className={styles.teamSubtitle}>Our Experts</span>
              <h3 className={styles.teamTitle}>Meet Our Team</h3>
              <div className={styles.teamDivider}></div>
            </div>

            <div className={styles.teamMembers}>
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className={`${styles.teamMember} ${
                    teamInView
                      ? index === 0
                        ? styles.memberLeftVisible
                        : index === 1
                        ? styles.memberUpVisible
                        : styles.memberRightVisible
                      : index === 0
                      ? styles.memberLeft
                      : index === 1
                      ? styles.memberUp
                      : styles.memberRight
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={styles.memberCard}>
                    <div className={styles.memberImageWrapper}>
                      <div className={styles.memberImageContainer}>
                        <img
                          src={member.image}
                          alt={member.name}
                          className={styles.memberImage}
                        />
                      </div>
                    </div>
                    <h4 className={styles.memberName}>{member.name}</h4>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberBio}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
