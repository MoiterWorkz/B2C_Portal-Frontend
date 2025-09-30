import React from "react";
import { Eye, EyeOff, Clock } from "lucide-react";

const DashboardHeader = ({ hideBalance, setHideBalance }) => {
  return (
    <div className="flex items-center justify-between">
      {/* Left Side: Welcome message */}
      <div>
        <h1 className="second-normal-heading">Welcome back, Kavin! 👋</h1>
        <p className="text-sm subheading2-size">
          Here's what's happening with your money today.
        </p>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-5">
        {/* Toggle Button */}
        <button
          onClick={() => setHideBalance(!hideBalance)}
          className="inline-flex items-center justify-center whitespace-nowrap white-letter-color"
        >
          {hideBalance ? (
            <Eye className="h-4 w-4 custom-buton2" size={15} />
          ) : (
            <EyeOff className="h-4 w-4 custom-buton2" size={15} />
          )}
        </button>

        {/* Date Badge */}
        <span
          className="inline-flex items-center justify-center rounded-md border w-fit whitespace-nowrap 
            gap-1 overflow-hidden px-3 py-1 smallbutton"
        >
          <Clock className="h-3 w-3 mr-1" />
          25/09/2025
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;
