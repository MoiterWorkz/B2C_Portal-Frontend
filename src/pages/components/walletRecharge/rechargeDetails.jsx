import { useState } from "react";
import {
  PiggyBank,
  Wallet,
  CreditCard,
  TabletSmartphone,
  Zap,
  IndianRupee,
} from "lucide-react";
import ConfirmRechargeModal from "./confirmRechargeModal";
import { generateTransactionRef } from "../../../helper/index";
import { useSignInStore } from "../../../store/useSigninStore";
import { moveTransaction, rechargeWallet } from "../../../services/service";
const WalletRecharge = () => {
  const [amount, setAmount] = useState("");
  const [activePayment, setActivePayment] = useState("UPI");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCustomerId } = useSignInStore();
  // const [activeQuickAmount,setActiveQuickAmount]=  useState('')
  const quickAmounts = [500, 1000, 2000, 5000, 10000, 25000];
  const customerId = getCustomerId();

  console.log(customerId);

  console.log(generateTransactionRef());

  const walletInfo = [
    {
      label: "Current Balance",
      value: "₹1,850",
      color: "text-[var(--primary-color)]",
    },
    { label: "Total Spent", value: "₹45,200", color: "text-red-500" },
    { label: "Monthly Remaining", value: "₹48,150", color: "text-blue-400" },
  ];

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

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleConfirm = () => {
    alert(`Recharge ₹${amount} confirmed`);
    setIsModalOpen(false);
  };

  const handleWalletRecharge = async () => {
    console.log("func");
    //wallet recharge
    const rechargeWalletPayload = {
      customerId: 2000044,
      // customerId,
      amount,
      channelId: "web",
      referenceNumber: generateTransactionRef(),
    };
    try {
      const res = await rechargeWallet(rechargeWalletPayload);
      try {
        //move Transaction
        const moveTransactionPayload = {
          trackerId: res?.tracker_id,
          // apiStatus: res?.status,
          // trackerId: "f1f8fbf3-ce18-407c-b325-8fc5132bd9aa",
          apiStatus: "Failure",
        };

        const res2 = await moveTransaction(moveTransactionPayload);
        alert(res2);
      } catch (error) {
        alert("Move Transaction API failed. Please Try again Later");
      }
    } catch (error) {
      alert("Recharge Wallet API failed. Please Try again Later");
    }

    // setIsModalOpen(true)
  };

  return (
    <div className="text-card-foreground rounded-xl border card-hover-effect p-6 space-y-5">
      {/* Wallet Recharge Details */}
      <section className="space-y-4">
        <h1 className="card-title flex items-center gap-2">
          <PiggyBank size="18" />
          Wallet Recharge Details
        </h1>

        {/* Wallet Information */}
        <h2 className="card-whiteText-title  flex items-center gap-2">
          <Wallet size="18" className="text-[var(--primary-color)]" /> Wallet
          Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {walletInfo.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-xs font-bold text-[var(--subheading-color)] mb-1">
                {item.label}
              </label>
              <div className="relative overflow-hidden card-topup-info-box rounded-lg p-2">
                <input
                  type="text"
                  value={item.value}
                  disabled
                  className={`rounded-lg font-semibold disabled:opacity-70 ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="card-bottom-border" />
      </section>

      {/* Payment Method */}
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

      {/* Quick Recharge */}
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

      {/* Custom Amount */}
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
            style={{ padding: "2px 24px", color: "white" }}
            type="text"
            value={amount}
            onChange={handleChange}
            placeholder="Enter amount (Min: ₹100, Max: ₹50,000)"
            className="w-full rounded-md input-field-style"
          />
        </div>

        <p className="text-[var(--primary-color)] text-xs mt-[2px] min-h-[18px]">
          {amount
            ? `Amount in words: ₹${Number(amount).toLocaleString("en-IN")}.00`
            : ""}
        </p>
      </section>

      {/* Buttons */}
      <section className="flex gap-4">
        <button
          disabled={!amount}
          className={`${
            !amount
              ? "opacity-50 cursor-not-allowed hover:opacity-50"
              : "hover:opacity-90 cursor-pointer"
          } flex-1 bg-[var(--primary-color)] p-2 rounded-lg `}
          onClick={handleWalletRecharge}
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
      <ConfirmRechargeModal
        amount={amount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        paymentMethod={activePayment}
        amt={amount}
      />
    </div>
  );
};

export default WalletRecharge;
