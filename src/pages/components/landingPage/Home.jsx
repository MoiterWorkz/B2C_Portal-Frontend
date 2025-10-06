// HomePage.jsx
import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import Mobile from "./Mobile";
import { Navigate, useNavigate } from "react-router-dom";
// import PanVerification from "

const stats = [
  { value: "10M+", label: "Active Users" },
  { value: "₹500Cr+", label: "Transactions" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/Sign-Up");
  };
  return (
    <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side with animation */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }} // start left
            whileInView={{ opacity: 1, x: 0 }} // animate to center
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }} // animate once per scroll
          >
            <div className="space-y-4">
              {/* Badge */}
              <span
                className="inline-flex items-center justify-center rounded-md border text-xs w-fit whitespace-nowrap shrink-0 gap-1 px-4 py-2 font-semibold smallbutton"
                style={{
                  backgroundColor: "var(--button-background)",
                  fontSize: "var(--smaller-font)",
                  borderColor:
                    "color-mix(in oklab, var(--primary-color) 30%, transparent)",
                  color: "var(--primary-color)",
                }}
              >
                🚀 India's Fastest Growing Payment App
              </span>

              {/* Headings */}
              <h1
                className="home-font font-bold leading-tight"
                style={{ color: "var(--primary-font-color)" }}
              >
                Simplify Your
                <span
                  className="block home-font"
                  style={{ color: "var(--primary-color)" }}
                >
                  Payments,
                </span>
                <span
                  className="block home-font"
                  style={{ color: "var(--primary-color)" }}
                >
                  Anytime,
                </span>
                <span
                  className="block home-font"
                  style={{ color: "var(--primary-color)" }}
                >
                  Anywhere
                </span>
              </h1>

              {/* Subheading */}
              <p className="max-w-lg leading-relaxed subheading-size">
                Experience the future of digital payments with Moiterworkz. Send
                money, pay bills, and manage your finances with unmatched
                security and convenience.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="custom-button"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--font-black)",
                }}
                onClick={HandleClick}
              >
                Get Started Free
                <ArrowRight className="arrow-icon" />
              </button>

              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border-2 transition custom-buton1"
                style={{
                  backgroundColor: "var(--backgroundcolor)",
                  border: "var(--transparent-color)",
                  color: "var(--primary-color)",
                }}
              >
                <Play className="h-5 w-5 mr-2" />
                See How It Works
              </button>
            </div>

            {/* Stats Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 rounded-xl border small-cards"
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="subheading1-size">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side with animation */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 100 }} // start right
            whileInView={{ opacity: 1, x: 0 }} // animate to center
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Mobile />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
