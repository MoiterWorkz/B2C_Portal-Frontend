import React, { useState } from "react";
import { Settings } from "lucide-react";
const AutoRechargeSettings = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [threshold, setThreshold] = useState(500);
  const [amount, setAmount] = useState(2000);

  const handleSubmit = () => {
    // Add API call or local storage logic here
    alert(
      `Auto Recharge Enabled: ${isEnabled}\nThreshold: ₹${threshold}\nAmount: ₹${amount}`
    );
  };

  return (
    <div className="p-4 rounded-xl border card-hover-effect">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="card-title flex items-center gap-2 mb-5">
            <Settings size="18" />
            Auto Recharge Settings
          </h1>
          <div className="card-whiteText-title">Enable Auto Recharge</div>
          <div className="text-xs text-[var(--subheading-color)]">
            Automatically add money when wallet balance falls below threshold
          </div>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <div className="w-11 h-6 bg-yellow-600 rounded-full peer peer-checked:bg-yellow-400 transition-colors duration-300 relative">
            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>

      {/* Conditional Inputs */}
      {isEnabled && (
        <div className=" rounded-md p-4 bg-[var(card-settings-bg)] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Threshold Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Trigger when balance falls below
              </label>
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-md px-3 py-2">
                <span className="text-gray-400 mr-2">₹</span>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="bg-transparent outline-none text-white w-full"
                  placeholder="e.g. 500"
                />
              </div>
            </div>

            {/* Auto Recharge Amount */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Auto recharge amount
              </label>
              <div className="flex items-center bg-gray-800 border border-gray-600 rounded-md px-3 py-2">
                <span className="text-gray-400 mr-2">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-transparent outline-none text-white w-full"
                  placeholder="e.g. 2000"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
          >
            Save Auto Recharge Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default AutoRechargeSettings;
