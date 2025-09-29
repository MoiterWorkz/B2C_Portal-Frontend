import React from "react";
import { Zap, Receipt, Plus, Users, CreditCard } from "lucide-react"; // ✅ import icons

const quickActions = [
  { icon: Receipt, label: "Pay Bills", color: "text-blue-400" },
  { icon: Plus, label: "Card Topup", color: "text-green-400" },
  { icon: Users, label: "Add Payee", color: "text-purple-400" },
  { icon: CreditCard, label: "View Transactions", color: "text-yellow-400" },
];
const QuickAction = () => {
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl border m-2 card-bg-br">
      {/* Card Header */}
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 icon-header">
        <h4 className="leading-none text-foreground flex items-center gap-2">
          <Zap className="icon" size={20} /> Quick Actions
        </h4>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {quickActions.map((action, index) => {
            const Icon = action.icon; // get the component
            return (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-md lable card-hover-effect-noboder "
              >
            <Icon size={20} className={`${action.color}`} />
          <span className="text-sm duration-200">
            {action.label}
          </span>
          </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
