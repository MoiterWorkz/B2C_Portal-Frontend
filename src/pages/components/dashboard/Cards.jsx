import React, { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CircleCheckBig,
} from "lucide-react";
// import { fetchDashboard } from "../../../services/service";
// import { useSignInStore } from "../../../store/useSigninStore";

const Cards = ({ hideBalance, dashBoardData }) => {
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
      value: dashBoardData.currentBalance,
      subtext: "Available in wallet",
      icon: <Wallet className="card-icon h-6 w-6" />,
    },
    {
      title: "Total Loading",
      value: dashBoardData.totalLoading, // fallback if missing
      subtext: "Money loaded this month",
      icon: <ArrowUpRight className="card-icon h-6 w-6" />,
    },
    {
      title: "Total Unloading",
      value: dashBoardData.totalUnloading, // fallback if missing
      subtext: "Money spent this month",
      icon: <ArrowDownRight className="card-icon h-6 w-6" />,
    },
    {
      title: "KYC Status",
      value: dashBoardData.kycStatus,
      subtext: `Monthly limit: ₹${dashBoardData.monthlyLoadLimit?.toLocaleString(
        "en-IN"
      )}`,

      icon: <CircleCheckBig className="card-icon h-6 w-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const isNegative = typeof card.value === "number" && card.value < 0;
        const color = isNegative ? negativeColors[index] : defaultColors[index];

        return (
          <div
            key={index}
            className="text-card-foreground flex flex-col gap-6 m-1 rounded-xl border card-hover-effect"
          >
            <div className="p-6 cards rounded-xl">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p>{card.title}</p>
                  <p className="text-2xl font-medium" style={{ color }}>
                    {/* Mask balance for first card */}
                    {index === 0 && hideBalance ? (
                      "*******"
                    ) : typeof card.value === "number" ? (
                      card.value < 0 ? (
                        <span className="text-red-500">
                          -{Math.abs(card.value).toLocaleString()}
                        </span>
                      ) : (
                        card.value.toLocaleString()
                      )
                    ) : (
                      card.value
                    )}
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
