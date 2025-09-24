// LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./components/Home";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Security from "./components/Security";
import CustomerReview from "./components/CustomerReview";
import PaymentExperience from "./components/PaymentExperience";
import Contact from "./components/Contact";

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

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 80; // height of the fixed navbar
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-primary-background text-white min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-primary-background border-b border-primary-bottom z-50 shadow-md h-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4">
          <div className="text-xl font-bold">
            Moiterworkz
            <span className="text-yellow-300 text-sm block">
              Digital Payments
            </span>
          </div>

          <nav className="flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className="hover:text-yellow-300 transition-colors"
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex space-x-2">
            <button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition">
              Sign In
            </button>
            <button
              onClick={() => navigate("/Sign-Up")}
              className="bg-yellow-300 text-black px-4 py-1 rounded hover:opacity-90 transition"
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
            className={`flex items-center justify-center ${
              idx === 0 ? "min-h-screen" : "min-h-screen"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center">
              {section.component}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default LandingPage;
