import React, { useState } from "react";
import {
  User,
  Banknote,
  Phone,
  Clock,
  Trash2,
  Send,
  Plus,
  Building2,
  Shield,
  CreditCard,
} from "lucide-react";
import TransferModal from "./TransferModal";
import SuccessModal from "./SuccessModal";

const payees = [
  {
    name: "Gav",
    initials: "G",
    bank: "HDFC Bank",
    branch: "Main Branch",
    ifsc: "HDFC0000123",
    account: "12345678901",
    contact: "+91 9876543210",
    mode: "IMPS (IFSC)",
    date: "03 Oct 25",
    time: "05:17 pm",
  },
  {
    name: "SS",
    initials: "S",
    bank: "ICICI Bank",
    branch: "Retail Branch",
    ifsc: "ICIC0001234",
    account: "11223344556",
    contact: "+91 9988776655",
    mode: "IMPS (IFSC)",
    date: "07 Oct 25",
    time: "05:17 pm",
  },
  {
    name: "Kitu",
    initials: "K",
    bank: "Axis Bank",
    branch: "Commercial Branch",
    ifsc: "UTIB0000567",
    account: "55667788998",
    contact: "+91 9555666777",
    mode: "IMPS (IFSC)",
    date: "08 Oct 25",
    time: "05:17 pm",
  },
  {
    name: "Ano",
    initials: "A",
    bank: "Bank of Baroda",
    branch: "Priority Banking Branch",
    ifsc: "BARB0VJIIAN",
    account: "77889900112",
    contact: "+91 9777888999",
    mode: "IMPS (IFSC)",
    date: "10 Oct 25",
    time: "05:17 pm",
  },
];


const PayeeDirectory = () => {
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");

  const openTransferModal = (payee) => {
    setSelectedPayee(payee);
    setShowTransferModal(true);
  };

  const closeTransferModal = () => {
    setShowTransferModal(false);
  };

  const handleTransferSuccess = (amount) => {
    setTransferAmount(amount); // save entered amount
    setShowTransferModal(false); // close transfer modal
    setShowSuccessModal(true); // open success modal
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm full-border rounded-t-2xl">
      {/* Header */}
      <div className="flex justify-between items-center   px-6 py-4 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-semibold font-themecolor">
          <CreditCard size={18} className="font-themecolor" />
          Payee Directory
        </h2>
        <button className="flex items-center gap-2 sign-up-button  transition px-4 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} className="text-black" />
          Add Payee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  full-border rounded-t-2xl">
        <table className="w-full text-sm">
          <thead className="font-themecolor  small-text  uppercase">
            <tr>
              <th className="text-left py-3 px-4 full-border">
                Payee Information
              </th>
              <th className="text-left py-3 px-4 full-border">
                Banking Details
              </th>
              <th className="text-left py-3 px-4 full-border">
                Account Number
              </th>
              <th className="text-left py-3 px-4 full-border">
                Contact
              </th>
              <th className="text-left py-3 px-4 full-border">
                Transfer Mode
              </th>
              <th className="text-left py-3 px-4 full-border">
                Date Added
              </th>
              <th className="text-left py-3 px-4 full-border">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payees.map((p, i) => (
              <tr
                key={i}
                className="full-border hover:bg-[#232323] transition"
              >
                {/* Payee Info */}
                <td className="py-4 px-4 flex items-center gap-3 ">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full font-semibold font-themecolor icon-bg full-border">
                    {p.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">{p.name}</p>
                  </div>
                </td>

                {/* Bank Details */}
                <td className="py-4 px-4 full-border">
                  <p className="font-medium text-gray-100 flex items-center gap-1">
                    <Building2 size={14} className="font-themecolor" /> {p.bank}
                  </p>
                  <p className="small-text  gray-text">{p.branch}</p>
                  <span className="inline-block mt-1 small-text  my-blue-box rounded-md px-2 py-0.5">
                    {p.ifsc}
                  </span>
                </td>

                {/* Account Number */}
                <td className="py-4 px-4 full-border">
                  <div className="icon-bg full-border rounded-md px-3 py-1 text-white small-text">
                    {p.account}
                  </div>
                </td>

                {/* Contact */}
                <td className="py-4 px-4 flex items-center gap-2  text-white">
                  <Phone size={14} className="font-themecolor" />
                  {p.contact}
                </td>

                {/* Transfer Mode */}
                <td className="py-4 px-4 full-border">
                  <span className="small-text  my-blue-box rounded-md px-3 py-1 inline-block">
                    {p.mode}
                  </span>
                </td>

                {/* Date Added */}
                <td className="py-4 px-4 text-sm full-border">
                  <p className="gray-text flex items-center gap-1">
                    <Clock size={13} className="font-themecolor" />
                    Registered
                  </p>
                  <p className="font-semibold text-gray-200">{p.date}</p>
                  <p className="small-text  text-gray-500">{p.time}</p>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 flex gap-2">
                  <button onClick={() => openTransferModal(p)} className="flex items-center gap-1 px-3 py-1 my-gold-box font-themecolor small-text  rounded-lg  transition">
                    <Send size={14} /> Transfer
                  </button>
                  <button className="p-2 my-red-box transition">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={closeTransferModal}
        payee={selectedPayee}
        onSuccess={handleTransferSuccess}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        payee={selectedPayee}
        amount={transferAmount}
      />
    </div>
  );
};

export default PayeeDirectory;
