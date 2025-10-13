import { useState } from "react";
import { ArrowLeft, Shield, ChevronRight } from "lucide-react";
import { ruppeeWithComma } from "../../../helper";
import PaymentTypeHeader from "../../../components/paymentTypeHeader";
import CreditDebitCard from "./paymentModule/creditDebitCard";
import PaymentList from "../../../components/paymentList";
import NetBanking from "./paymentModule/netBanking";
import RechargeProcessingModal from "./rechargeDetailsModule/popup/rechargeProcessingModal";
import ReceiptModal from "./paymentModule/receiptModal";
import UseIconsData from "../../../hooks/useIconsData";
import { usePaymentStore, useSignInStore } from "../../../store/useSignInStore";
import { validBanks } from "../../../constants/static";

const PaymentMethod = ({
  setIsMethodPayment,
  amount,
  handleWalletRecharge,
  isApiErrorCaught,
}) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState("");
  const [isProceedtoPay, setIsProceedtoPay] = useState(false);
  const [isProcessingClosed, setIsProcessingClosed] = useState(false);
  const { paymentHeaders, paymentOptions } = UseIconsData();
  const {
    setPaymentFormData,
    paymentFormData,
    setPaymentFormDataErr,
    paymentFormDataErr,
  } = usePaymentStore();

  const upi = ["GPay", "PhonePe", "Paytm", "BHIM", "Amazon Pay"];
  const debitCard = ["Visa", "Mastercard", "Rupay", "Maestro"];
  const creditCard = ["Visa", "Mastercard", "American Express", "Diners Club"];
  const paymentType = {
    "Debit Card": { list: debitCard, cardType: "Debit Card Number" },
    "Credit Card": { list: creditCard, cardType: "Credit Card Number" },
  };

  console.log(paymentFormDataErr);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setPaymentFormData({ [type]: { [name]: value } });
    upiIdValidation(value);
  };

  const upiIdValidation = (value) => {
    const upiRegex = /^([\w.-]{2,256})@([a-zA-Z]{2,64})$/;
    const match = value.match(upiRegex);

    if (!match) {
      setPaymentFormDataErr({
        [activePaymentMethod]: { upiId: "Invalid UPI ID format" },
      });
      return;
    }

    const bankHandle = match[2].toLowerCase();
    setPaymentFormDataErr({
      [activePaymentMethod]: {
        upiId:
          !validBanks.includes(bankHandle) && "Bank handle is not recognized",
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="hover:bg-[var(--smallbutton-inside-backgound)] hover:rounded-lg h-[28px] w-[28px] flex items-center justify-center">
            <ArrowLeft
              className="text-white cursor-pointer"
              size={16}
              onClick={() => setIsMethodPayment(false)}
            />
          </div>

          <div>
            <h2 className="font-semibold text-white">Select Payment Method</h2>
            <p className="text-xs text-gray-400">
              Choose how you’d like to pay ₹{ruppeeWithComma(Number(amount))}
            </p>
          </div>
        </div>

        {/* Amount Summary */}
        <div className="bg-gradient-to-r from-[#2a2823] to-[#1e1c18] border border-[#4b4335] text-xs rounded-xl py-2 px-4 flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400">Amount to Pay</p>
            <p className="text-lg font-semibold text-[#fad489]">
              ₹ {ruppeeWithComma(Number(amount))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400">Wallet Recharge</p>
            <p className="font-medium text-white">Moiterworkz Wallet</p>
          </div>
        </div>

        {/* Payment Options */}
        <div>
          <h3 className="font-semibold text-white mb-3">
            Choose Payment Method
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentOptions.map((option, idx) => (
              <button
                key={idx}
                style={{
                  background:
                    activePaymentMethod === option.name &&
                    "var(--smallbutton-inside-backgound)",
                  border:
                    activePaymentMethod === option.name &&
                    "1px solid var(--primary-color)",
                }}
                className="flex items-center justify-between p-3 rounded-xl payments-card"
                onClick={() => setActivePaymentMethod(option.name)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      activePaymentMethod === option.name
                        ? "bg-[var(--primary-color)] text-black"
                        : "bg-[var(--smallbutton-inside-backgound)] text-[var(--primary-color)]"
                    } `}
                  >
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-xs text-white">
                      {option.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {option.description}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">
                  <ChevronRight size="12" />
                </span>
              </button>
            ))}
          </div>
        </div>
        {activePaymentMethod && (
          <>
            <div className="border border-thin bg-[var(--dark-primarybackground-color)] rounded-xl p-4 mt-6">
              <PaymentTypeHeader {...paymentHeaders[activePaymentMethod]} />
              {/* upi payment */}
              {activePaymentMethod === "UPI Payment" && (
                <>
                  <label className="block text-xs text-white mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi (e.g., 9876543210@paytm)"
                    name="upiId"
                    onChange={(e) => handleChange(e, activePaymentMethod)}
                    value={paymentFormData?.[activePaymentMethod]?.upiId || ""}
                    className="profilecard-input"
                  />
                  <PaymentList list={upi} />
                </>
              )}
              {activePaymentMethod === "Debit Card" && (
                <CreditDebitCard {...paymentType[activePaymentMethod]} />
              )}
              {activePaymentMethod === "Credit Card" && (
                <CreditDebitCard {...paymentType[activePaymentMethod]} />
              )}

              {activePaymentMethod === "Net Banking" && <NetBanking />}
            </div>

            <button
              style={{
                cursor:
                  !paymentFormDataErr[activePaymentMethod]?.upiId &&
                  "not-allowed",
              }}
              className="submit-btn w-full mt-6"
              onClick={() => setIsProceedtoPay(true)}
            >
              Proceed to Pay ₹{ruppeeWithComma(amount)}
            </button>
          </>
        )}
        {/* Secure Payment Note */}
        <div className="flex items-start gap-2 border border-thin bg-[var(--secondary-backgroundcolor)] rounded-xl p-2 mt-6 leading-tight">
          <Shield size={18} className="text-[#fad489] mt-1" />
          <div>
            <p className="text-white text-sm">Secure Payment</p>
            <p className="text-xs text-gray-400">
              Your payment information is encrypted and secure. We don’t store
              your card details.
            </p>
          </div>
        </div>
        {isProceedtoPay && (
          <RechargeProcessingModal
            setIsProceedtoPay={setIsProceedtoPay}
            handleWalletRecharge={handleWalletRecharge}
          />
        )}
        {typeof isApiErrorCaught !== "undefined" && !isApiErrorCaught && (
          <ReceiptModal
            amount={amount}
            isProcessingClosed={isProcessingClosed}
            onClose={() => setIsMethodPayment(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
