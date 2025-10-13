const PaymentList = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {list?.map((option) => (
        <button
          key={option}
          className="px-2 py-1 text-[10px] text-gray-400  border border-thin bg-[var(--payment-bg)] rounded-full"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default PaymentList;
