/*import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Wifi, 
  Home, 
  Building, 
  Shield, 
  Wrench, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Moon,
  Sun,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';

const WifiServicesWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const threeCanvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Hero slides data
  const heroSlides = [
    {
      title: "Lightning Fast Internet",
      subtitle: "Experience Kenya's fastest WiFi speeds up to 100 Mbps",
      cta: "Get Connected Now",
      bg: "from-blue-600 to-purple-700"
    },
    {
      title: "Reliable Business Solutions",
      subtitle: "Power your business with enterprise-grade connectivity",
      cta: "Explore Business Plans",
      bg: "from-green-600 to-blue-600"
    }
  ];

  // Services data
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Home WiFi",
      description: "High-speed internet for your home with unlimited data"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Business Broadband",
      description: "Enterprise solutions with dedicated support"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Solutions",
      description: "CCTV, IoT devices, and smart home integration"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Installation & Support",
      description: "Professional installation and 24/7 customer support"
    }
  ];

  // Packages data
  const packages = [
    {
      name: "Starter",
      speed: "5 Mbps",
      price: "KSh 2,500",
      features: ["Unlimited Data", "Basic Support", "1 Device", "Email Support"],
      popular: false
    },
    {
      name: "Family",
      speed: "10 Mbps",
      price: "KSh 4,000",
      features: ["Unlimited Data", "Priority Support", "5 Devices", "Phone Support", "Free Router"],
      popular: true
    },
    {
      name: "Business",
      speed: "25 Mbps",
      price: "KSh 8,000",
      features: ["Unlimited Data", "24/7 Support", "Unlimited Devices", "Static IP", "Free Installation"],
      popular: false
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Wanjiku",
      location: "Nairobi",
      rating: 5,
      text: "Excellent service! The internet is fast and reliable. Customer support is always helpful."
    },
    {
      name: "James Mwangi",
      location: "Nakuru",
      rating: 5,
      text: "Best decision for my business. The connection is stable and the speeds are as promised."
    },
    {
      name: "Grace Akinyi",
      location: "Kisumu",
      rating: 4,
      text: "Great value for money. Installation was quick and professional."
    }
  ];

  // Three.js setup
  useEffect(() => {
    if (!threeCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: threeCanvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: isDarkMode ? 0x4facfe : 0x00f2fe,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;
    sceneRef.current = { scene, camera, renderer, particlesMesh };

    const animate = () => {
      requestAnimationFrame(animate);
      if (sceneRef.current) {
        sceneRef.current.particlesMesh.rotation.x += 0.001;
        sceneRef.current.particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
      }
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Auto-sliding hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'packages', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletterEmail);
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
     
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">KenyaNet</span>
          </div>

          /* Desktop Navigation */ /*
          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'services', 'packages', 'about', 'testimonials', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  activeSection === item ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Connected
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */ /*
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2 space-y-2">
              {['home', 'services', 'packages', 'about', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */ /*
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={threeCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: 'transparent' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bg} opacity-90`} />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
            {heroSlides[currentSlide].cta}
          </button>
        </div>

        {/* Slide indicators */ /*
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */ /*
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive internet solutions for homes and businesses across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-2">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */ /*
      <section id="packages" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Flexible packages designed to meet your connectivity needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 ${
                pkg.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{pkg.speed}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.price}</div>
                  <div className="text-gray-600 dark:text-gray-300">per month</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  pkg.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */ /*
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About KenyaNet</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We are Kenya's leading internet service provider, dedicated to connecting communities across the country with reliable, high-speed internet solutions. Since our founding, we've been committed to bridging the digital divide and empowering Kenyans with world-class connectivity.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our mission is to provide affordable, reliable internet access to every Kenyan, enabling education, business growth, and digital transformation across our beautiful nation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                  <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">47</div>
                  <div className="text-gray-600 dark:text-gray-300">Counties Served</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Wifi className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */ /*
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real feedback from satisfied customers across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */ /*
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to get connected? Contact us today for a free consultation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+254 700 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@kenyanet.co.ke</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Tech Plaza, Nairobi CBD<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
                
                <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    placeholder="Tell us about your internet needs"
                  />
                </div>
                
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */ /*
      <footer className="bg-gray-900 text-white py-16">
        < className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">KenyaNet</span>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting Kenya with reliable, high-speed internet solutions for homes and businesses.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white">Services</button></li>
                <li><button onClick={() => scrollToSection('packages')} className="text-gray-400 hover:text-white">Packages</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Home WiFi</span></li>
                <li><span className="text-gray-400">Business Internet</span></li>
                <li><span className="text-gray-400">Smart Solutions</span></li>
                <li><span className="text-gray-400">Installation</span></li>
                <li><span className="text-gray-400">Support</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest offers and news.</p>
              <div className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>*/
