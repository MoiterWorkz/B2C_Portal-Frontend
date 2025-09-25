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
      
     <header className="fixed top-0 left-0 w-full bg-primary-background border-b border-primary-bottom z-50 shadow-md h-16">
  <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6">
    
    {/* Logo + Title */}
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
          className="subheading2-size "
        >
          {section.label}
        </button>
      ))}
    </nav>

    {/* Auth Buttons */}
    <div className="flex space-x-3">
      <button className="px-4 py-1 rounded border sign-in-button transition">
        Sign In
      </button>
      <button
        onClick={() => navigate('/Sign-Up')}
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
      className={`${idx === 0 ? "min-h-screen" : "py-5"} flex items-center justify-center`}
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
