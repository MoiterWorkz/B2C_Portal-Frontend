const Buttons = ({ amount, setConfirmModal, setAmount }) => {
  return (
    <section className="flex gap-4">
      <button
        disabled={!amount}
        className={`${
          !amount
            ? "opacity-50 cursor-not-allowed hover:opacity-50"
            : "hover:opacity-90 cursor-pointer"
        } flex-1 bg-[var(--primary-color)] p-2 rounded-lg `}
        onClick={() => setConfirmModal(true)}
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
