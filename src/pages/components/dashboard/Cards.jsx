import React from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CircleCheckBig,
} from "lucide-react";

const Cards = ({ hideBalance }) => {
  const defaultColors = [
    "var(--primary-font-color)",
    "var(--color-green-400)",
    "var(--color-red-400)",
    "var(--color-blue-400)",
  ];

  const negativeColors = [
    "var(--primary-font-color)",
    "var(--color-red-400)",
    "var(--color-red-400)",
    "var(--color-blue-400)",
  ];

  const cards = [
    {
      title: "Current Balance",
      value: 45720,
      subtext: "Available in wallet",
      icon: <Wallet className="card-icon h-6 w-6" />,
    },
    {
      title: "Total Loading",
      value: 5000,
      subtext: "Money loaded this month",
      icon: <ArrowUpRight className="card-icon h-6 w-6" />,
    },
    {
      title: "Total Unloading",
      value: -4408,
      subtext: "Money spent this month",
      icon: <ArrowDownRight className="card-icon h-6 w-6" />,
    },
    {
      title: "KYC Status",
      value: "Full KYC",
      subtext: "Monthly limit: ₹2,00,000",
      icon: <CircleCheckBig className="card-icon h-6 w-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const isNegative = typeof card.value === "number" && card.value < 0;
        const color = isNegative ? negativeColors[index] : defaultColors[index];

        return (
          <div
            key={index}
            className="text-card-foreground flex flex-col gap-6 m-1 rounded-xl border card-hover-effect "
          >
            <div className="p-6 cards rounded-xl">
              <div className="flex items-center justify-between">
                <div className="space-y-2 ">
                  <p>{card.title}</p>
                  <p className="text-2xl font-medium" style={{ color }}>
                    {/* If first card and hideBalance = true => mask */}
                    {index === 0 && hideBalance
                      ? "*******"
                      : typeof card.value === "number" && card.value < 0
                      ? `-${Math.abs(card.value).toLocaleString()}`
                      : card.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {card.subtext}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg small-cards-icon">
                  {React.cloneElement(card.icon, {
                    className: "icon-wrapper",
                    style: { color },
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
