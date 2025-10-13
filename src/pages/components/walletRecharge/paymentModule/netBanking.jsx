import { useState, useEffect, useRef } from "react";
import { paymentBanks } from "../../../../constants/static";
import { Shield } from "lucide-react";

const NetBanking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const handleSelect = (bank) => {
    setSelected(bank);
    setIsOpen(false);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <label className="block text-xs text-gray-400 mb-1">
        Select Your Bank
      </label>

      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="select-input cursor-pointer flex justify-between items-center"
        >
          <span className="text-xs text-white">
            {selected || "Choose your bank"}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <ul className="absolute left-0 right-0 mt-1 bg-[var(--card-background-color)] border full-border rounded-md shadow-lg max-h-50 scrollbar-hide overflow-y-auto z-10">
            {paymentBanks.map((bank, index) => (
              <li
                key={index}
                onClick={() => handleSelect(bank)}
                className="px-3 py-2 text-xs text-white cursor-pointer hover:bg-[var(--primary-color)] hover:text-black transition-colors"
              >
                {bank}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-start gap-2 border border-thin bg-[var(--secondary-backgroundcolor)] rounded-xl p-2 mt-3">
        <Shield size={18} className="text-[#fad489] mt-1" />
        <div>
          <p className="text-white text-sm">Secure Banking</p>
          <p className="text-xs text-gray-400">
            You will be redirected to your bank's secure portal to complete the
            payment.
          </p>
        </div>
      </div>
    </>
  );
};

export default NetBanking;
