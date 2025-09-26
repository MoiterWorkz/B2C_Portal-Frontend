// Features.jsx
import React from "react";
import { Send, Receipt, Gift, Wallet, Shield, QrCode, ArrowUp } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const features = [
  {
    title: "Send Money Instantly",
    description:
      "Transfer money to anyone, anywhere in India with just a few taps. Lightning-fast UPI payments.",
    icon: <Send size={32} className="text-primary" color="var(--primary-color)" />,
  },
  {
    title: "Pay All Bills",
    description:
      "Electricity, mobile, DTH, gas, water, broadband - pay all your bills in one place.",
    icon: <Receipt size={32} className="text-primary" color="var(--primary-color)" />,
  },
  {
    title: "Rewards & Cashback",
    description:
      "Earn rewards and cashback on every transaction. More you pay, more you save.",
    icon: <Gift size={32} className="text-primary" color="var(--primary-color)" />,
  },
  {
    title: "Digital Wallet",
    description:
      "Store money securely in your digital wallet. Top up instantly and pay anywhere.",
    icon: <Wallet size={32} className="text-primary" color="var(--primary-color)" />,
  },
  {
    title: "Bank-Level Security",
    description:
      "256-bit encryption, PIN protection, and fraud detection to keep your money safe.",
    icon: <Shield size={32} className="text-primary" color="var(--primary-color)" />,
  },
  {
    title: "QR Code Payments",
    description:
      "Scan any QR code to pay merchants, friends, or services instantly and securely.",
    icon: <QrCode size={32} className="text-primary" color="var(--primary-color)" />,
  },
];
 const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
const Features = () => {
  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center"
      style={{ backgroundColor: "var(--secondary-backgroundcolor)" }}
      initial={{ opacity: 0, y: 60 }} // Start from bottom
      whileInView={{ opacity: 1, y: 0 }} // Animate to position
      
      transition={{ duration: 0.6 }}
    >
      <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
        
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
         
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs w-fit whitespace-nowrap font-semibold smallbutton"
              style={{
                backgroundColor: "var(--button-background)",
                fontSize: "var(--smaller-font)",
                borderColor:
                  "color-mix(in oklab, var(--primary-color) 30%, transparent)",
                color: "var(--primary-color)",
              }}
            >
              ✨ Powerful Features
            </span>
            <h2
              className="home-font font-bold text-foreground"
              style={{ color: "var(--primary-font-color)" }}
            >
              Everything You Need for
              <span
                className="home-font block"
                style={{ color: "var(--primary-color)" }}
              >
                Digital Payments
              </span>
            </h2>
            <p className="subheading-size leading-relaxed">
              From instant money transfers to bill payments, Moiterworkz offers
              all the tools you need to manage your financial life seamlessly.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-6 rounded-xl bg-card small-cards"
                style={{ maxWidth: "320px", margin: "0 auto" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="p-8 space-y-4 flex flex-col min-h-[280px]">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center small-cards-icon">
                    {feature.icon}
                  </div>
                  <h3
                    className="text-xl font-bold subheading-size"
                    style={{ color: "var(--primary-font-color)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="subheading2-size leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
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
    </motion.div>
  );
};

export default Features;
