import { PiggyBank, Wallet } from "lucide-react";

const WalletInfo = () => {
  const walletInfos = [
    {
      label: "Current Balance",
      value: "₹1,850",
      color: "text-[var(--primary-color)]",
    },
    { label: "Total Spent", value: "₹45,200", color: "text-red-500" },
    { label: "Monthly Remaining", value: "₹48,150", color: "text-blue-400" },
  ];

  return (
    <section className="space-y-4">
      <h1 className="card-title flex items-center gap-2">
        <PiggyBank size="20" />
        Wallet Recharge Details
      </h1>

      {/* Wallet Information */}
      <h2 className="card-whiteText-title  flex items-center gap-2">
        <Wallet size="18" className="text-[var(--primary-color)]" /> Wallet
        Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {walletInfos.map((item, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-xs font-bold text-[var(--subheading-color)] mb-1">
              {item.label}
            </label>
            <div className="relative overflow-hidden card-topup-info-box rounded-lg p-2 cursor-not-allowed">
              <input
                type="text"
                value={item.value}
                disabled
                className={`rounded-lg font-semibold disabled:opacity-70 cursor-not-allowed ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="card-bottom-border" />
    </section>
  );
};

export default WalletInfo;
