import { Download, CreditCard, Zap } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <Download
          className="h-12 w-12 text-primary-foreground"
          color="var(--font-black)"
        />
      ),
      title: "Download & Sign Up",
      description:
        "Get the Moiterworkz app and create your account in under 2 minutes.",
      step: "1",
    },
    {
      icon: (
        <CreditCard
          className="h-12 w-12 text-primary-foreground"
          color="var(--font-black)"
        />
      ),
      title: "Add Your Bank Account",
      description:
        "Link your bank account or debit card securely with our encrypted connection.",
      step: "2",
    },
    {
      icon: (
        <Zap
          className="h-12 w-12 text-primary-foreground"
          color="var(--font-black)"
        />
      ),
      title: "Start Paying Instantly",
      description:
        "Send money, pay bills, and make purchases with just a few taps.",
      step: "3",
    },
  ];

  return (
    <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
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
            🎯 Simple Process
          </span>

          <h2
            className="font-bold text-foreground home-font"
            style={{ color: "var(--primary-font-color)" }}
          >
            Get Started in
            <span
              className="home-font"
              style={{ color: "var(--primary-color)" }}
            >
              {" "}
              3 Easy Steps
            </span>
          </h2>
          <p className="subheading-size leading-relaxed">
            Join millions of Indians who trust Moiterworkz for their daily
            payment needs.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="text-center space-y-6 relative max-w-[280px] mx-auto"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }} // stagger effect
            >
              <div className="relative mx-auto">
                <div
                  className="w-24 h-24 flex items-center justify-center shadow-2xl"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    borderRadius: "var(--circle-border)",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: "var(--primary-font-color)",
                    borderRadius: "var(--circle-border)",
                    color: "var(--font-black)",
                  }}
                >
                  {step.step}
                </div>
              </div>
              <div className="space-y-2">
                <h3
                  className="text-xl font-bold subheading-size"
                  style={{ color: "var(--primary-font-color)" }}
                >
                  {step.title}
                </h3>
                <p className="subheading2-size leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
