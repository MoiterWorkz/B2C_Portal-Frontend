import { Zap } from "lucide-react";

const QuickRecharge = ({ setAmount, amount }) => {
  const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];
  return (
    <section className="space-y-6">
      <h2 className="card-whiteText-title flex items-center gap-2">
        <Zap size="18" className="text-[var(--primary-color)]" />
        Quick Recharge
      </h2>

      <div className="flex flex-wrap gap-3">
        {quickAmounts.map((amt) => (
          <button
            style={{
              background: amount === amt && "var(--primary-color)",
            }}
            key={amt}
            className="flex-1 min-w-[100px] py-2 card-hover-effect-noboder "
            onClick={() => setAmount(amt)}
          >
            <p
              className={` hover:text-black ${
                amount === amt ? "text-black" : "text-white"
              } text-sm duration-200`}
            >
              ₹{amt.toLocaleString("en-IN")}
            </p>
          </button>
        ))}
      </div>
      <div className="card-bottom-border" />
    </section>
  );
};

export default QuickRecharge;
