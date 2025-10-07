// File: BillsAndTransactions.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate

import {
  Calendar,
  Zap,
  Smartphone,
  Droplets,
  Flame,
  History,
  CreditCard,
  Phone,
  Bolt,
  Tv,
  Plus,
} from "lucide-react";
import SelectProvider from "../Electricity/BillDetails";

const upcomingBills = [
  {
    title: "TNEB",
    dueDate: "1/15/2025",
    amount: "₹2,450",
    icon: <Zap className="text-yellow-400" size={20} />,
  },
  {
    title: "Airtel Postpaid",
    dueDate: "1/18/2025",
    amount: "₹899",
    icon: <Smartphone className=" text-green-400" size={20} />,
  },
  {
    title: "BWSSB",
    dueDate: "1/22/2025",
    amount: "₹1,280",
    icon: <Droplets className="text-cyan-400" size={20} />,
  },
  {
    title: "HP Gas",
    dueDate: "1/25/2025",
    amount: "₹950",
    icon: <Flame className="text-orange-400" size={20} />,
  },
];

const transactions = [
  {
    title: "Card Top-up via UPI",
    date: "29/9/2025",
    amount: "+₹5,000",
    icon: <CreditCard size={20} />,
    isCredit: true,
  },
  {
    title: "Airtel Mobile Recharge",
    date: "28/9/2025",
    amount: "-₹399",
    icon: <Phone size={20} />,
    isCredit: false,
  },
  {
    title: "TNEB Electricity Bill Payment",
    date: "27/9/2025",
    amount: "-₹1,850",
    icon: <Bolt size={20} />,
    isCredit: false,
  },
  {
    title: "Tata Sky DTH Recharge",
    date: "26/9/2025",
    amount: "-₹459",
    icon: <Tv size={20} />,
    isCredit: false,
  },
  {
    title: "HP Gas Cylinder Booking",
    date: "24/9/2025",
    amount: "-₹950",
    icon: <Flame size={20} />,
    isCredit: false,
  },
];
const BillAndTransaction = () => {
  const navigate = useNavigate(); // <-- initialize navigate

  const handleBillClick = (bill) => {
    if (bill.title === "TNEB") {
      window.scrollTo(0, 0);

      // Navigate to the SelectProvider route
      navigate("/SelectorProvider");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5 ml-2 mr-2">
      {/* Upcoming Bills */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br w-full max-w-xl mx-auto sm:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 icon-header flex-wrap gap-2">
          <h4 className="leading-none text-foreground flex items-center gap-2 text-base sm:text-lg font-semibold">
            <Calendar className="icon" size={18} />
            Upcoming Bills
          </h4>
          <button className="text-xs sm:text-sm h-8 px-2 sm:px-3 whitespace-nowrap">
            View All
          </button>
        </div>

        {/* Bills List */}
        <div className="p-4 sm:p-6 space-y-4">
          {upcomingBills.map((bill, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer group hover:shadow-lg hover:shadow-primary/20 bill-item card-hover-effect"
              onClick={() => handleBillClick(bill)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg">{bill.icon}</div>
                  <div>
                    <p className="font-medium text-foreground bill-title text-sm sm:text-base">
                      {bill.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground subheading1-size">
                      Due {bill.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-medium text-foreground bill-amount text-sm sm:text-base">
                    {bill.amount}
                  </p>
                  <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
                    Due Soon
                  </span>
                </div>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to pay this bill →
              </div>
            </div>
          ))}
          <div className="pt-2 border-top all-bill">
            <button className="w-full h-9 sm:h-10 px-3 sm:px-4 py-2 rounded-md text-primary flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Plus className="icon" size={12} />
              Pay All Bills or Add New
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br w-full max-w-xl mx-auto sm:max-w-2xl lg:max-w-4xl">
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 icon-header flex-wrap gap-2">
          <h4 className="leading-none text-foreground flex items-center gap-2 text-base sm:text-lg font-semibold">
            <History className="icon" size={18} />
            Recent Transactions
          </h4>
          <button className="text-xs sm:text-sm h-8 px-2 sm:px-3 whitespace-nowrap">
            View All
          </button>
        </div>

        {/* Transactions */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-3 rounded-md border card-hover-effect"
            >
              <div className="flex items-center gap-3">
                <div className="transaction-icon flex-shrink-0">{tx.icon}</div>
                <div>
                  <p className="transaction-title text-sm sm:text-base font-medium">
                    {tx.title}
                  </p>
                  <p className="transaction-date text-xs sm:text-sm text-muted-foreground">
                    {tx.date}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p
                  className={`transaction-amount text-sm sm:text-base font-medium ${
                    tx.isCredit ? "credit" : "debit"
                  }`}
                >
                  {tx.amount}
                </p>
                <span className="transaction-status text-[10px] sm:text-xs text-muted-foreground">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillAndTransaction;
