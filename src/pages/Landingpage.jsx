// LandingPage.jsx
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./components/landingPage/Home";
import Features from "./components/landingPage/Features";
import HowItWorks from "./components/landingPage/HowItWorks";
import Security from "./components/landingPage/Security";
import CustomerReview from "./components/landingPage/CustomerReview";
import PaymentExperience from "./components/landingPage/PaymentExperience";
import Contact from "./components/landingPage/Contact";
import { ArrowUp, Menu, X } from "lucide-react";
import LOGO from "../assets/logo.png";

const sections = [
  { id: "home", label: "Home", component: <HomePage /> },
  { id: "features", label: "Features", component: <Features /> },
  { id: "howitworks", label: "HowItWorks", component: <HowItWorks /> },
  { id: "security", label: "Security", component: <Security /> },
  {
    id: "customerReview",
    component: <CustomerReview />,
  },
  {
    id: "paymentExperience",
    component: <PaymentExperience />,
  },
  {
    id: "contact",
    label: "Contact",
    component: <Contact />,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-primary-background min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-primary-background border-b border-primary-bottom z-50 shadow-md h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6">
          {/* Logo */}
          <div className="flex flex-col items-center ">
            <img
              src={LOGO}
              alt="Moiterworkz Logo"
              className=" w-60 object-contain"
            />
            <div>
              <span className="text-yellow-400 text-xs">Digital Payments</span>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {sections
              .filter((section) => section.label)
              .map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleScroll(section.id)}
                  className={`subheading2-size transition-colors hover:text-gray-400 ${
                    activeSection === section.id ? "" : "text-white"
                  }`}
                  style={
                    activeSection === section.id
                      ? { color: "var(--primary-color)" }
                      : {}
                  }
                  type="button"
                >
                  {section.label}
                </button>
              ))}
            {/* <button
              onClick={() => {
                navigate("/dashboard");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // scroll to top after navigation
              }}
              className="subheading2-size transition-colors text-white hover:text-gray-400"
              type="button"
            >
              Dashboard
            </button> */}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            <button
              onClick={() => navigate("/Customer-Login")}
              className="px-4 py-1 rounded border sign-in-button transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/Sign-Up")}
              className="px-4 py-1 rounded sign-up-button transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-background px-6 py-4 space-y-4 border-t border-primary-bottom shadow">
            {sections
              .filter((section) => section.label)
              .map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    handleScroll(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-white hover:text-gray-400 transition-colors ${
                    activeSection === section.id ? "text-yellow-400" : ""
                  }`}
                >
                  {section.label}
                </button>
              ))}
            {/* <button
              onClick={() => {
                navigate("/dashboard");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-gray-400 transition-colors"
            >
              Dashboard
            </button> */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => navigate("/Customer-Login")}
                className="flex-1 py-1 rounded border sign-in-button transition"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate("/Sign-Up");
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-1 rounded sign-up-button transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sections */}
      <main className="pt-20">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`${
              idx === 0 ? "min-h-screen" : "py-5"
            } flex items-center justify-center`}
          >
            <div className="w-full flex items-center justify-center">
              {section.component}
            </div>
          </section>
        ))}
      </main>

      {/* Scroll to Top Button */}
      {activeSection !== "home" && (
        <button
          onClick={handleScrollToTop}
          className={`
            scroll-to-top-btn
            fixed z-50 w-12 h-12 rounded-full flex items-center justify-center
            bg-[#fad489f2] border border-[#fad4894d]
            shadow-xl
            transition-all duration-300
            hover:scale-110
          `}
          style={{
            transformOrigin: "center",
            minWidth: "44px",
            minHeight: "44px",
            overflow: "hidden",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))",
            right: "max(1rem, env(safe-area-inset-right, 1rem))",
            isolation: "isolate",
          }}
        >
          <ArrowUp className="h-5 w-5 text-primary-foreground" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;
