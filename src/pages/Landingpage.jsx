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

const sections = [
  { id: "home", label: "Home", component: <HomePage /> },
  { id: "features", label: "Features", component: <Features /> },
  { id: "howitworks", label: "HowItWorks", component: <HowItWorks /> },
  { id: "security", label: "Security", component: <Security /> },

  {
    id: "customerReview",
    label: "CustomerReview",
    component: <CustomerReview />,
  },
  {
    id: "paymentExperience",
    label: "PaymentExperience",
    component: <PaymentExperience />,
  },
  {
    id: "contact",
    label: "Contact",
    component: <Contact />,
  },
  // Add other sections here if needed
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

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

  // 🔥 Track active section on scroll
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
        rootMargin: "-50% 0px -50% 0px", // Trigger when middle of viewport
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
    <div className="bg-primary-background text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-primary-background border-b border-primary-bottom z-50 shadow-md h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Moiterworkz Logo"
              className="h-8 w-8 object-contain"
            />
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight">
                Moiterworkz
              </h1>
              <span className="text-yellow-400 text-xs">Digital Payments</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`subheading2-size transition-colors ${
                  activeSection === section.id
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-white"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => navigate("/dashboard")}
            className="subheading2-size transition-colors"
          >
            Dashboard
          </button>
          {/* Auth Buttons */}
          <div className="flex space-x-3">
            <button className="px-4 py-1 rounded border sign-in-button transition">
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
    </div>
  );
};

export default LandingPage;
