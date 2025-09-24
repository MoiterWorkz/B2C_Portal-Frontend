// Features.jsx
import React from "react";
import { Send, Receipt, Gift, Wallet, Shield, QrCode } from "lucide-react"; // Lucide icons for React

const features = [
  {
    title: "Send Money Instantly",
    description:
      "Transfer money to anyone, anywhere in India with just a few taps. Lightning-fast UPI payments.",
    icon: (
      <Send size={32} className="text-primary" color="var(--primary-color)" />
    ),
  },
  {
    title: "Pay All Bills",
    description:
      "Electricity, mobile, DTH, gas, water, broadband - pay all your bills in one place.",
    icon: (
      <Receipt
        size={32}
        className="text-primary"
        color="var(--primary-color)"
      />
    ),
  },
  {
    title: "Rewards & Cashback",
    description:
      "Earn rewards and cashback on every transaction. More you pay, more you save.",
    icon: (
      <Gift size={32} className="text-primary" color="var(--primary-color)" />
    ),
  },
  {
    title: "Digital Wallet",
    description:
      "Store money securely in your digital wallet. Top up instantly and pay anywhere.",
    icon: (
      <Wallet size={32} className="text-primary" color="var(--primary-color)" />
    ),
  },
  {
    title: "Bank-Level Security",
    description:
      "256-bit encryption, PIN protection, and fraud detection to keep your money safe.",
    icon: (
      <Shield size={32} className="text-primary" color="var(--primary-color)" />
    ),
  },
  {
    title: "QR Code Payments",
    description:
      "Scan any QR code to pay merchants, friends, or services instantly and securely.",
    icon: (
      <QrCode size={32} className="text-primary" color="var(--primary-color)" />
    ),
  },
];

const Features = () => {
  return (
    <div
      className="w-full h-full flex flex-col justify-center"
      style={{ backgroundColor: "var(--secondary-backgroundcolor)" }}
    >
      <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto ">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
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
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-6 rounded-xl bg-card small-cards"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
