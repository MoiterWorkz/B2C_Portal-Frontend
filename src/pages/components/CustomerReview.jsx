import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Business Owner",
    emoji: "👩‍💼",
    text: "Moiterworkz has made managing my business payments so easy. The UPI integration is seamless and the rewards are amazing!",
  },
  {
    name: "Arjun Patel",
    role: "Software Engineer",
    emoji: "👨‍💻",
    text: "Finally, a payment app that gets it right. Fast, secure, and the interface is beautiful. Highly recommended!",
  },
  {
    name: "Neha Verma",
    role: "Freelancer",
    emoji: "🎨",
    text: "Sending payments to clients has never been easier. The simplicity and reliability of Moiterworkz are unmatched.",
  },
];

const StarRating = () => (
  <div className="flex gap-1">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className="w-5 h-5"
          color="var(--primary-color)"
          fill="var(--primary-color)"
        />
      ))}
  </div>
);

const TestimonialCard = ({ name, role, emoji, text }) => (
  <div className="flex flex-col gap-6 rounded-xl border-2 border-border p-8 small-cards h-full">
    <StarRating />
    <p className="italic subheading2-size flex-1">"{text}"</p>
    <div className="flex items-center gap-4 mt-auto">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center border"
        style={{
          backgroundColor: "var(--smallbutton-inside-backgound)",
          border: "var(--thin-border)",
        }}
      >
        {emoji}
      </div>
      <div>
        <h4
          className="font-bold subheading2-size"
          style={{ color: "var(--primary-font-color)" }}
        >
          {name}
        </h4>
        <p className="subheading1-size">{role}</p>
      </div>
    </div>
  </div>
);

export default function CustomerReview() {
  return (
    <div className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit font-semibold smallbutton">
            💬 Customer Love
          </span>
          <h2
            className="font-bold text-foreground home-font"
            style={{ color: "var(--primary-font-color)" }}
          >
            What Our Users{" "}
            <span
              className="home-font"
              style={{ color: "var(--primary-color)" }}
            >
              Say About Us
            </span>
          </h2>
          <p className="subheading-size leading-relaxed">
            Join millions of satisfied customers who have made Moiterworkz their
            go-to payment app.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {reviews.map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
