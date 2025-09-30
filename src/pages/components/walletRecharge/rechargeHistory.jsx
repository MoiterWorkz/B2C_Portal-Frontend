import { TrendingUp, History } from "lucide-react";
const transactions = [
  {
    id: "WR001",
    date: "30 Sept 2025",
    method: "via UPI",
    amount: "+₹2,000.00",
    status: "Completed",
    type: "Manual",
  },
  {
    id: "WR002",
    date: "29 Sept 2025",
    method: "via Net Banking",
    amount: "+₹1,500.00",
    status: "Completed",
    type: "Auto",
  },
  {
    id: "WR003",
    date: "28 Sept 2025",
    method: "via Debit Card",
    amount: "+₹5,000.00",
    status: "Completed",
    type: "Manual",
  },
];

const RechargeHistory = () => {
  return (
    <div className="p-4 rounded-xl border card-hover-effect">
      <h1 className="card-title flex items-center gap-2 mb-5">
        <History size="18" />
        Recent Recharge History
      </h1>

      {transactions.map((txn) => (
        <div
          style={{ background: "#fad48905" }}
          key={txn.id}
          className="card-hover-effect p-4 mb-4 shadow-lg flex justify-between items-center"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[var(--bg-primary\/20)] p-2 rounded-lg">
              <TrendingUp size="12" className="text-[var(--primary-color)]" />
            </div>
            <div>
              <p className="text-[var(--subheading-color)] text-xs">{txn.id}</p>
              <p className="text-sm text-[var(--primary-font-color)]">
                {txn.date}
              </p>
              <p className="text-[var(--subheading-color)] text-xs">
                {txn.method}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[var(--primary-color)] font-semibold">
              {txn.amount}
            </div>
            <div className="flex justify-end gap-2 mt-1">
              <span className="text-green-500 border border-[text-green-500] text-xs px-[6px] py-1 rounded-md">
                {txn.status}
              </span>
              <span
                className={`text-xs px-[6px] py-1 rounded-md ${
                  txn.type === "Manual"
                    ? "text-purple-500 border border-[text-purple-500]"
                    : "text-blue-500 border border-[text-blue-500]"
                }`}
              >
                {txn.type}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RechargeHistory;
