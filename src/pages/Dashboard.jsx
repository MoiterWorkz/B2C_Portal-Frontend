import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
          <p className="text-sm text-gray-600">
            Welcome to your dashboard! Here’s a quick overview.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>✔️ Payment of $200 completed</li>
            <li>⚡ Wallet topped up with $100</li>
            <li>📄 New bill generated</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          <div className="flex gap-4 mt-3">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Send Money
            </button>
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
