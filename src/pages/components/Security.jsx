import {
  Lock,
  Shield,
  Eye,
  Award,
  Building2,
  Globe,
  CircleCheckBig,
} from "lucide-react";
const securityFeatures = [
  {
    icon: <Lock color="var(--primary-color)" />,
    title: "256-bit SSL Encryption",
    description: "Bank-grade encryption",
  },
  {
    icon: <Shield color="var(--primary-color)" />,
    title: "PCI DSS Compliant",
    description: "Highest security standards",
  },
  {
    icon: <Eye color="var(--primary-color)" />,
    title: "24/7 Fraud Monitoring",
    description: "Real-time protection",
  },
  {
    icon: <Award color="var(--primary-color)" />,
    title: "RBI Approved",
    description: "Regulated & trusted",
  },
];
const badges = [
  {
    icon: <Building2 style={{ color: "var(--primary-color)" }} size={10} />,
    label: "RBI Regulated",
  },
  {
    icon: <Globe style={{ color: "var(--primary-color)" }} size={10} />,
    label: "ISO 27001 Certified",
  },
  {
    icon: <Award style={{ color: "var(--primary-color)" }} size={10} />,
    label: "PCI DSS Level 1",
  },
];
const Security = () => {
  return (
    <div
      className="pt-12 pb-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--secondary-backgroundcolor)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text & Features */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span
                className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs w-fit whitespace-nowrap gap-1 bg-green-500/10 text-green-400 border-green-500/30 font-semibold"
                style={{
                  backgroundColor: "var(--positive-background",
                  fontSize: "var(--smaller-font)",
                  borderColor:
                    "color-mix(in oklab, var(--positive-color) 30%, transparent)",
                  color: "var(--positive-color)",
                }}
              >
                🔒 Bank-Level Security
              </span>
              <h2
                className="home-font font-bold text-foreground normal-heading"
                style={{ color: "var(--primary-font-color)" }}
              >
                Your Money is
                <span
                  className="block normal-heading"
                  style={{ color: "var(--primary-color)" }}
                >
                  100% Safe
                </span>
              </h2>
              <p className="subheading-size leading-relaxed">
                We use the same security standards as major banks to protect
                your transactions and personal information. Your trust is our
                top priority.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              {securityFeatures.map((feature, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <h4
                      className="font-bold text-foreground subheading-size"
                      style={{ color: "var(--primary-font-color)" }}
                    >
                      {feature.title}
                    </h4>
                  </div>
                  <p className="subheading2-size text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 pt-4 ">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center justify-center w-fit gap-1 px-2 py-1 smallbutton"
                >
                  {badge.icon}
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Image / Protection Card */}
          <div className="relative">
            <div className="relative p-8">
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"
                style={{ backgroundColor: "var(--accent-color)" }}
              ></div>
              <div
                className="relative border-2 rounded-2xl p-8 space-y-6 third-normal-heading"
                style={{
                  backgroundColor: "var(--third-backgroundcolor)",
                  border:
                    "2px solid color-mix(in oklab, var(--primary-border-color) 30%, transparent)",
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Multi-Layer Protection
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    "Biometric Authentication",
                    "Two-Factor Authentication",
                    "Real-time Fraud Detection",
                    "End-to-End Encryption",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20 smallbutton "
                      style={{
                        color: "var(--primary-font-color)",
                        backgroundColor: "var(--dark-accent-color)",
                      }}
                    >
                      <span
                        className="subheading1-size text-foreground "
                        style={{
                          color: "var(--primary-font-color)",
                          fontWeight: "600",
                        }}
                      >
                        {item}
                      </span>
                      <CircleCheckBig className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
