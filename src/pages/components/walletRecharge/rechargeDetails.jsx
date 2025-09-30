import { useState } from "react";

const RechargeDetails = () => {
  const [amount, setAmount] = useState("");

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];
  return (
    <div className="text-card-foreground flex flex-col gap-6 m-1 rounded-xl border card-hover-effect">
      {/* Wallet Recharge Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>💰</span> Wallet Recharge Details
        </h2>

        <div className="grid grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Current Balance</span>
            <span className="text-lg font-bold">₹1,850</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Total Spent</span>
            <span className="text-lg font-bold text-red-500">₹45,200</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Monthly Remaining</span>
            <span className="text-lg font-bold text-blue-400">₹48,150</span>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="space-y-2">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          💳 Payment Method
        </h3>

        <div className="flex gap-4">
          {["UPI", "Net Banking", "Debit Card"].map((method, index) => (
            <button
              key={index}
              className={`flex-1 p-4 rounded-lg text-center ${
                index === 0 ? "bg-yellow-300 text-black" : "bg-gray-800"
              }`}
            >
              {method}
              <div className="text-xs mt-1">
                {method === "UPI"
                  ? "Instant & Free"
                  : method === "Net Banking"
                  ? "All Banks"
                  : "Visa/Master/Rupay"}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Recharge */}
      <section className="space-y-2">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          ⚡ Quick Recharge
        </h3>

        <div className="flex gap-3">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className="flex-1 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              onClick={() => setAmount(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </section>

      {/* Custom Amount */}
      <section className="space-y-2">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          ₹ Custom Amount
        </h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (Min: ₹100, Max: ₹50,000)"
          className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400"
        />
      </section>

      {/* Buttons */}
      <section className="flex gap-4">
        <button className="flex-1 bg-yellow-500 p-3 rounded-lg hover:bg-yellow-400 font-bold">
          Recharge Wallet
        </button>
        <button className="flex-1 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 font-bold">
          Clear
        </button>
      </section>
    </div>
  );
};

export default RechargeDetails;
