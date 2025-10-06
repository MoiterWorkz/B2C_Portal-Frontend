import { CreditCard, TabletSmartphone } from "lucide-react";
const PaymentMethod = ({ activePayment, setActivePayment }) => {
  const paymentMethods = [
    {
      name: "UPI",
      label: "Instant & Free",
      icon: <TabletSmartphone size="12" />,
    },
    {
      name: "Net Banking",
      label: "All Banks",
      icon: <CreditCard size="12" />,
    },
    {
      name: "Debit Card",
      label: "Visa/Master/Rupay",
      icon: <CreditCard size="12" />,
    },
  ];
  return (
    <section className="space-y-2">
      <h2 className="card-whiteText-title flex items-center gap-2">
        <CreditCard size="18" className="text-[var(--primary-color)]" />
        Payment Method
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {paymentMethods.map((method, index) => (
          <button
            style={{
              background:
                activePayment === method.name && "var(--primary-color)",
            }}
            key={index}
            className={`${
              activePayment === method.name ? "text-black" : "text-white"
            }  card-hover-effect-noboder flex-1 p-4 rounded-lg flex flex-col items-center justify-center transition ${
              method.bg
            }`}
            onClick={() => setActivePayment(method.name)}
          >
            <div>{method.icon}</div>
            <p>{method.name}</p>
            <label className="text-xs mt-1">{method.label}</label>
          </button>
        ))}
      </div>
      <div className="card-bottom-border" />
    </section>
  );
};

export default PaymentMethod;
