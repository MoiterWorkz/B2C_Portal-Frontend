import React from "react";
import PaymentList from "../../../../components/paymentList";

const CreditDebitCard = ({ list, cardType }) => {
  return (
    <>
      <label className="block text-xs text-white mb-1 mt-3">{cardType}</label>
      <input
        type="text"
        placeholder="1234 6565 4344 8788"
        className="profilecard-input"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-xs text-white mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="profilecard-input"
          />
        </div>
        <div>
          <label className="block text-xs text-white mb-1">CVV</label>
          <input type="text" placeholder="655" className="profilecard-input" />
        </div>
      </div>
      <label className="block text-xs text-white mb-1 mt-3">
        Cardholder Name
      </label>
      <input
        type="text"
        placeholder="Name as on card"
        className="profilecard-input"
      />
      <PaymentList list={list} />
    </>
  );
};

export default CreditDebitCard;
