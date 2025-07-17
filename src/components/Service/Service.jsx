"use client";

import { useState } from "react";
import {
  FiHome,
  FiKey,
  FiTrendingUp,
  FiDollarSign,
  FiShield,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import styles from "./Service.module.css";

const Services = () => {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const services = [
    {
      icon: FiHome,
      title: "Property Sales",
      description:
        "Expert guidance through every step of buying or selling luxury properties with personalized service.",
      features: [
        "Market Analysis",
        "Professional Photography",
        "Negotiation Support",
        "Legal Assistance",
      ],
      gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
      hoverGradient: "linear-gradient(135deg, #2563EB, #1E40AF)",
    },
    {
      icon: FiKey,
      title: "Property Rentals",
      description:
        "Premium rental properties with comprehensive tenant screening and property management services.",
      features: [
        "Tenant Screening",
        "Lease Management",
        "Maintenance Coordination",
        "24/7 Support",
      ],
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      hoverGradient: "linear-gradient(135deg, #059669, #047857)",
    },
    {
      icon: FiTrendingUp,
      title: "Investment Advisory",
      description:
        "Strategic real estate investment consulting to maximize your portfolio returns and growth potential.",
      features: [
        "Market Research",
        "ROI Analysis",
        "Portfolio Planning",
        "Risk Assessment",
      ],
      gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
      hoverGradient: "linear-gradient(135deg, #7C3AED, #6D28D9)",
    },
    {
      icon: FiDollarSign,
      title: "Property Valuation",
      description:
        "Accurate property appraisals using advanced market analysis and professional expertise.",
      features: [
        "Comparative Analysis",
        "Market Trends",
        "Detailed Reports",
        "Expert Consultation",
      ],
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      hoverGradient: "linear-gradient(135deg, #D97706, #B45309)",
    },
    {
      icon: FiShield,
      title: "Property Management",
      description:
        "Complete property management solutions to protect and enhance your real estate investments.",
      features: [
        "Maintenance Services",
        "Tenant Relations",
        "Financial Reporting",
        "Property Inspections",
      ],
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      hoverGradient: "linear-gradient(135deg, #DC2626, #B91C1C)",
    },
    {
      icon: FiUsers,
      title: "Relocation Services",
      description:
        "Comprehensive relocation assistance for individuals and corporations moving to new areas.",
      features: [
        "Area Orientation",
        "School Information",
        "Community Resources",
        "Moving Coordination",
      ],
      gradient: "linear-gradient(135deg, #6366F1, #4F46E5)",
      hoverGradient: "linear-gradient(135deg, #4F46E5, #4338CA)",
    },
  ];

  const stats = [
    { number: 500, label: "Properties Sold", icon: FiHome, suffix: "+" },
    { number: 98, label: "Client Satisfaction", icon: FiUsers, suffix: "%" },
    { number: 15, label: "Years Experience", icon: FiTrendingUp, suffix: "+" },
    { number: 2, label: "Total Sales", icon: FiDollarSign, suffix: "B+" },
  ];

  return (
    <section id="services" className={styles.section}>
      {/* OTHERWISE SAME AS ORIGINAL - Hero Section with Luxury Background */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <div
              ref={heroRef}
              className={`${styles.heroAnimation} ${
                heroInView ? styles.heroAnimationVisible : ""
              }`}
            >
              <div className={styles.premiumBadge}>
                <span>Premium Services</span>
              </div>
              <h2 className={styles.heroTitle}>Our Services</h2>
              <p className={styles.heroDescription}>
                Comprehensive real estate solutions tailored to your unique
                needs with unmatched expertise and personalized service
              </p>
            </div>

            {/* Stats in Hero */}
            <div
              ref={statsRef}
              className={`${styles.stats} ${
                statsInView ? styles.statsVisible : ""
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={styles.statItem}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={styles.statIconWrapper}>
                    <stat.icon className={styles.statIcon} />
                  </div>
                  <div className={styles.statNumber}>
                    <CountUp
                      end={stat.number}
                      duration={4}
                      suffix={stat.suffix}
                      enableScrollSpy={false}
                      scrollSpyOnce={true}
                      start={statsInView ? 0 : stat.number}
                    />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className={styles.servicesSection}>
        <div className={styles.servicesBackground}></div>
        <div className={styles.servicesContainer}>
          <div
            ref={servicesRef}
            className={`${styles.servicesHeader} ${
              servicesInView ? styles.servicesHeaderVisible : ""
            }`}
          >
            <h3 className={styles.servicesTitle}>
              Premium Real Estate Solutions
            </h3>
            <div className={styles.servicesDivider}></div>
            <p className={styles.servicesDescription}>
              Experience excellence in every aspect of real estate with our
              comprehensive suite of professional services
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => {
              const isFirstRow = index < 3;
              return (
                <div
                  key={service.title}
                  className={`${styles.serviceCardWrapper} ${
                    servicesInView
                      ? isFirstRow
                        ? styles.zoomInVisible
                        : styles.flipInVisible
                      : isFirstRow
                      ? styles.zoomIn
                      : styles.flipIn
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={styles.serviceCard}
                    style={{
                      "--gradient": service.gradient,
                      "--hover-gradient": service.hoverGradient,
                    }}
                  >
                    <div className={styles.serviceGradient}></div>
                    <div className={styles.serviceTopBorder}></div>
                    <div className={styles.serviceIconContainer}>
                      <div className={styles.serviceIconWrapper}>
                        <service.icon className={styles.serviceIcon} />
                      </div>
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <ul className={styles.serviceFeatures}>
                      {service.features.map((feature, idx) => (
                        <li key={idx} className={styles.serviceFeature}>
                          <div
                            className={styles.featureDot}
                            style={{ background: service.gradient }}
                          ></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={styles.serviceButton}
                      style={{ background: service.gradient }}
                    >
                      <span>Learn More</span>
                      <FiArrowRight className={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section with Luxury Background */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaOverlay}></div>
        <div className={styles.ctaContainer}>
          <div
            ref={ctaRef}
            className={`${styles.ctaContent} ${
              ctaInView ? styles.ctaContentVisible : ""
            }`}
          >
            <h3 className={styles.ctaTitle}>Ready to Get Started?</h3>
            <p className={styles.ctaDescription}>
              Let our expert team guide you through your real estate journey
              with personalized service and unmatched expertise
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>
                Get Free Consultation
              </button>
              <button className={styles.ctaSecondaryButton}>
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
