import React from "react";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

export default function PaymentExperience() {
  return (
    <div className="w-full h-full flex flex-col justify-center my-gradient">
      <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 60 }}   // start slightly below
          whileInView={{ opacity: 1, y: 0 }} // move up when in view
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="space-y-4">
            <h2
              className="font-bold home-font text-foreground"
              style={{ color: "var(--primary-font-color)" }}
            >
              Ready to Transform Your
              <span
                className="home-font block"
                style={{ color: "var(--primary-color)" }}
              >
                Payment Experience?
              </span>
            </h2>
            <p className="subheading-size leading-relaxed">
              Join over 10 million users who have already made the switch to
              smarter, faster, and more secure digital payments with
              Moiterworkz.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md font-semibold custom-button"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--font-black)",
              }}
            >
              Start Using Moiterworkz
              <ArrowRight className="arrow-icon" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold custom-buton1 ">
              Already Have an Account?
            </button>
          </div>
        </motion.div>

        {/* Features - no animation */}
        <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4" color="var(--positive-color)" />
            <span className="subheading1-size">No Setup Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4" color="var(--positive-color)" />
            <span className="subheading1-size">Free Forever</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig className="w-4 h-4" color="var(--positive-color)" />
            <span className="subheading1-size">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
