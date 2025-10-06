import React, { useState } from "react";
import { Settings } from "lucide-react";
import ToggleButton from "../../../components/toggleButton";
const AutoRechargeSettings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState({ trigger: "", auto: "" });

  const handleSubmit = () => {
    // Add API call or local storage logic here
    alert(
      `Auto Recharge Enabled: ${isEnabled}\nThreshold: ₹${threshold}\nAmount: ₹${amount}`
    );
  };

  const inputFields = [
    {
      label: "Trigger when balance falls below",
      name: "trigger",
    },
    {
      label: "Auto recharge amount",
      name: "auto",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/,/g, ""); // Remove commas
    if (!isNaN(cleanedValue)) {
      setAmount((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    }
  };

  return (
    <div className="p-4 rounded-xl border card-hover-effect-no-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="card-title flex items-center gap-2 mb-5">
            <Settings size="18" />
            Auto Recharge Settings
          </h1>
          <h2 className="card-whiteText-title">Enable Auto Recharge</h2>
          <p className="text-xs text-[var(--subheading-color)]">
            Automatically add money when wallet balance falls below threshold
          </p>
        </div>

        {/* Toggle Switch */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer focus:outline-none"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <ToggleButton />
        </label>
      </div>

      {/* Conditional Inputs */}
      {isEnabled && (
        <div
          style={{ background: "#fad48905" }}
          className="rounded-md py-2 px-4 space-y-4 card-hover-effect-no-pointer hover:transform-none hover:shadow-none hover:border-transparent"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field, index) => (
              <div key={index}>
                <label className="block text-xs text-[var(--primary-font-color)]">
                  {field.label}
                </label>
                <div className="relative w-full mt-2">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[var(--subheading-color)]">
                    ₹
                  </span>
                  <input
                    style={{ padding: "2px 24px", color: "white" }}
                    type="text"
                    className="w-full rounded-md input-field-style"
                    name={field.name}
                    value={amount[field.name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="bg-[var(--primary-color)] hover:opacity-90 text-sm font-semibold cursor-pointer px-4 py-2 rounded-md"
          >
            Save Auto Recharge Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default AutoRechargeSettings;
