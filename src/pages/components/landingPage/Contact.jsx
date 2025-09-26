import React from "react";
import {
  Wallet,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const socialIcons = [Facebook, Twitter, Instagram, Linkedin];
const quickLinks = ["About Us", "Careers", "Press", "Blog", "Help Center"];
const services = [
  "Money Transfer",
  "Bill Payments",
  "Mobile Recharge",
  "QR Payments",
  "Digital Wallet",
];
const contactDetails = [
  { icon: Phone, text: "+91 1800-123-4567" },
  { icon: Mail, text: "support@moiterworkz.com" },
  { icon: MapPin, text: "Chennai, India" },
];

export default function Contact() {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 t">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 0 rounded-xl flex items-center justify-center "
                  style={{
                    backgroundColor: "var( --primary-color) ",
                    borderRadius: "var(--circle-border)",
                  }}
                >
                  <Wallet
                    className="h-6 w-6 text-primary-foreground"
                    color="var(--font-black)"
                  />
                </div>
                <div>
                  <h3
                    className="font-bold  text-foreground"
                    style={{ color: "--primary-font-color" }}
                  >
                    Moiterworkz
                  </h3>
                  <p
                    className="text-xs text-primary"
                    style={{
                      color: "var(--primary-color)",
                      fontSize: "var(--smaller-font)",
                    }}
                  >
                    Digital Payments
                  </p>
                </div>
              </div>
              <p className="subheading2-size leading-relaxed">
                India's most trusted digital payment platform. Making financial
                transactions simple, secure, and rewarding for everyone.
              </p>
              <div className="flex gap-4">
                {socialIcons.map((Icon, idx) => (
                  <button
                    key={idx}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-md backgroundicon-hover"
                  >
                    <Icon className="h-5 w-5 " />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4
                className="font-bold subheading-size"
                style={{ color: "var(--primary-font-color)" }}
              >
                Quick Links
              </h4>
              {quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  className="block subheading2-size backgroundfont-hover"
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4
                className="font-bold subheading-size"
                style={{ color: "var(--primary-font-color)" }}
              >
                Services
              </h4>
              {services.map((service, idx) => (
                <button
                  key={idx}
                  className="block subheading2-size backgroundfont-hover"
                >
                  {service}
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4
                className="font-bold subheading-size"
                style={{ color: "var(--primary-font-color)" }}
              >
                Contact Us
              </h4>
              <div className="space-y-3">
                {contactDetails.map(({ icon: Icon, text }, idx) => (
                  <div key={idx} className="flex items-center gap-3 subheading2-size backgroundfont-hover">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="subheading2-size">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-top mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 Moiterworkz. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link, idx) => (
                  <button
                    key={idx}
                    className="subheading2-size backgroundfont-hover"
                  >
                    {link}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
