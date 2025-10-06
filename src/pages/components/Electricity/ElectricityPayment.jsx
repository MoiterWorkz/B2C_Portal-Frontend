import React, { useState, useEffect } from "react";
import {
  CircleCheckBig,
  CreditCard,
  Shield,
  Zap,
  Calendar,
  X,
} from "lucide-react";

const PaymentSuccessDialog = ({
  isOpen,
  onClose,
  amount,
  provider,
  accountNo = "••••••4567",
  transactionId = "TXN1234567890",
  dateTime = new Date().toLocaleString(),
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // auto close
      }, 1000000); // 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`
    fixed inset-0 z-50 flex items-center justify-center 
    bg-black/40
    ${isOpen ? "block" : "hidden"}
  `}
    >
      <div
        className={`
      relative bg-card border-2 backdrop-blur-sm
      p-6
      w-full sm:max-w-md 
      h-auto sm:h-auto 
      sm:rounded-lg sm:overflow-visible
      max-h-full
      popup
    `}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="card-bg-br absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <X size={20} />
          <span className="sr-only icon             ">Close</span>
        </button>

        <div className="text-center space-y-6 p-2 sm:p-4 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-center">
            <CircleCheckBig className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 drop-shadow-lg" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl text-green-400">
              Payment Successful!
            </h2>
            <p className="text-muted-foreground text-sm">
              Your payment has been processed successfully
            </p>
          </div>

          <div className="bg-primary/5 border rounded-lg p-4 space-y-4 card-bg-br">
            <div className="text-center border-b pb-3 border-bottom">
              <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
              <p className="text-primary amount">{amount}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Service</span>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-foreground text-sm span-data">
                    Electricity Bill
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Provider</span>
                <span className="text-foreground font-medium span-data">
                  {provider}
                </span>
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-muted-foreground">Account No.</span>
                <span className="text-foreground font-mono text-xs span-data">
                  {accountNo}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-primary/10 border-top">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="text-primary font-mono text-xs span-account-id">
                  {transactionId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date & Time
                </span>
                <span className="text-foreground text-xs span-data">
                  {dateTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center ">
            <span
              className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/30 rounded-md text-xs font-medium smallbutton "
              style={{ color: "var(--primary-color)" }}
            >
              <CreditCard className="h-4 w-4" />
              MW Banking - Secure Payment
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            This popup will close automatically in a few seconds
          </p>
        </div>
      </div>
    </div>
  );
};

const ElectricityPayment = ({
  provider,
  consumerNumber,
  customerName,
  billAmount,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000);
  };

  const handleCloseDialog = () => {
    setIsPaid(false);
    if (onSuccess) {
      onSuccess(); // notify parent to redirect
    }
  };

  return (
    <div className="space-y-6">
      {/* Bill Details Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border card-bg-br bill-details-confirm-card1">
        <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4">
          <h4 className="flex items-center gap-2 text-base sm:text-lg font-medium">
            <CircleCheckBig className="icon" size={20} />
            Bill Details Confirmed
          </h4>
        </div>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Provider</p>
              <p className="innerpara">{provider}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consumer Number</p>
              <p className="innerpara">{consumerNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customer Name</p>
              <p className="innerpara">{customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bill Amount</p>
              <p className="amount-para">₹{billAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl card-bg-br bill-details-confirm-card2">
        <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 sm:pb-4">
          <h4 className="flex items-center gap-2 text-primary text-base sm:text-lg font-medium">
            <CreditCard className="icon" size={20} />
            Payment
          </h4>
          <p className="text-muted-foreground text-sm">
            Confirm your payment to process the electricity bill
          </p>
        </div>
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
          <div className="bg-primary/5 p-3 sm:p-4 rounded-lg border card">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-foreground span1">Total Amount</span>
              <span className="span2">₹{billAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || isPaid}
            className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 text-sm sm:text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isProcessing
              ? "Processing..."
              : isPaid
              ? "Payment Successful"
              : `Pay ₹${billAmount.toLocaleString()}`}
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground justify-center action">
            <Shield size={15} />
            <span>Secured by MW Banking</span>
          </div>
        </div>
      </div>

      {/* Payment Success Dialog */}
      <PaymentSuccessDialog
        isOpen={isPaid}
        onClose={handleCloseDialog}
        amount={`₹${billAmount.toLocaleString()}`}
        provider={provider}
        className="w-full h-full sm:w-auto sm:h-auto sm:rounded-lg"
      />
    </div>
  );
};

export default ElectricityPayment;
