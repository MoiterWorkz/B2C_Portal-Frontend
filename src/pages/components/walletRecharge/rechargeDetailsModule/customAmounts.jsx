import { IndianRupee } from "lucide-react";
const CustomAmounts = ({ amount, handleChange }) => {
  return (
    <section>
      <h2 className="card-whiteText-title flex items-center gap-2">
        <IndianRupee size="18" className="text-[var(--primary-color)]" />
        Custom Amount
      </h2>
      <p className="card-whiteText-title mt-5">Enter Recharge Amount</p>

      <div className="relative w-full mt-2">
        <span className="absolute inset-y-0 left-3 flex items-center text-[var(--subheading-color)]">
          ₹
        </span>
        <input
          style={{ padding: "0.25rem 24px" }}
          type="text"
          value={amount}
          onChange={handleChange}
          placeholder="Enter amount (Min: ₹100, Max: ₹50,000)"
          className="profilecard-input"
        />
      </div>

      <p className="text-[var(--primary-color)] text-xs mt-[2px] min-h-[18px]">
        {amount
          ? `Amount in words: ₹${Number(amount).toLocaleString("en-IN")}.00`
          : ""}
      </p>
    </section>
  );
};

export default CustomAmounts;
