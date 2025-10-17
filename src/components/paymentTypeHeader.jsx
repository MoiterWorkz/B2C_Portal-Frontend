const PaymentTypeHeader = ({ icon, title, desc }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="p-2 rounded-full bg-[var(--smallbutton-inside-backgound)] text-[var(--primary-color)]">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-medium text-white">{title}</h2>
        <p className="text-xs text-gray-400">{desc}</p>
      </div>
    </div>
  );
};

export default PaymentTypeHeader;
