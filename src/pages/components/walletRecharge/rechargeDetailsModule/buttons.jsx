import { useState } from "react";

const Buttons = ({
  amount,
  setConfirmModal,
  setAmount,
  setIsMethodPayment,
}) => {
  return (
    <section className="flex gap-4">
      <button
        style={{ cursor: !amount && "not-allowed" }}
        disabled={!amount}
        className={`${
          amount ? "hover:opacity-90 cursor-pointer" : "opacity-50 "
        } flex-1 bg-[var(--primary-color)] p-2 rounded-lg `}
        onClick={() => setIsMethodPayment(true)}
        // onClick={() => setConfirmModal(true)}
      >
        Recharge Wallet
      </button>
      <button
        className="flex-1 text-white hover:text-black cursor-pointer"
        onClick={() => setAmount("")}
      >
        Clear
      </button>
    </section>
  );
};

export default Buttons;
