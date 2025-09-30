// File: BillsAndTransactions.jsx

import React from "react";
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5 ml-2 mr-2 ">
      {/* Upcoming Bills */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br">
        <div className="flex flex-row items-center justify-between px-6 pt-6 icon-header">
          <h4 className="leading-none text-foreground flex items-center gap-2 text-lg font-semibold">
            <Calendar className="icon" size={20} />
            Upcoming Bills
          </h4>
          <button className="text-sm h-8 px-3">View All</button>
        </div>
        <div className="p-6 space-y-4">
          {upcomingBills.map((bill, idx) => (
            <div
              key={idx}
              className={
                "p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] cursor-pointer group hover:shadow-lg hover:shadow-primary/20 bill-item card-hover-effect"
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${bill.bgColor} hover:scale-110 transition-transform duration-300`}
                  >
                    {bill.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground bill-title">
                      {bill.title}
                    </p>
                    <p className="text-sm text-muted-foreground subheading1-size">
                      Due {bill.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground bill-amount">
                    {bill.amount}
                  </p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30">
                    Due Soon
                  </span>
                </div>
              </div>
              <div
                className="mt-2 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
                style={{ color: "var(--primary-color)" }}
              >
                Click to pay this bill →
              </div>
            </div>
          ))}
          <div className="pt-2 border-top all-bill">
            <button className="w-full h-9 px-4 py-2 rounded-md text-primary flex items-center justify-center gap-2">
              <Plus className="icon" size={10} />
              Pay All Bills or Add New
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br">
        <div className="flex flex-row items-center justify-between px-6 pt-6 icon-header">
          <h4 className="leading-none text-foreground flex items-center gap-2 text-lg font-semibold ">
            <History className="icon" size={20} />
            Recent Transactions
          </h4>
          <button className="text-sm h-8 px-3 ">View All</button>
        </div>
        <div className="p-6 space-y-4">
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 border card-hover-effect"
            >
              <div className="flex items-center gap-3">
                {/* ICON */}
                <div className="transaction-icon">{tx.icon}</div>

                {/* TEXT */}
                <div>
                  <p className="transaction-title">{tx.title}</p>
                  <p className="transaction-date">{tx.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`transaction-amount ${
                    tx.isCredit ? "credit" : "debit"
                  }`}
                >
                  {tx.amount}
                </p>
                <span className="transaction-status">completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillAndTransaction;
