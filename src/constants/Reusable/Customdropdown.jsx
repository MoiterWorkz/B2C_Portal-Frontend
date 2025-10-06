import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Customdropdown = ({ options = [], value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (val) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect whether to open upwards or downwards
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If not enough space below → open upwards
      setOpenUpward(rect.bottom + 200 > viewportHeight);
    }
  }, [isOpen]);

  const selected = options?.find((o) => o.id === value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center w-full border full-border rounded-lg px-3 py-1 small-text 
    ${options.length > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
  `}
      >
        {selected ? selected.name : placeholder}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Options */}
      {isOpen && options?.length > 0 && (
        <ul
          className={`absolute z-10 w-full text-left border rounded-lg max-h-60 overflow-y-auto card-bg-br shadow-lg custom-scrollbar
          ${openUpward ? "bottom-full mb-1" : "top-full mt-1"}`}
        >
          {options.map((o, index) => (
            <li
              key={o.id}
              onClick={() => handleSelect(o.id)}
              className={`cursor-pointer text-white rounded-lg small-text p-1
                hover:bg-[var(--primary-color)] hover:text-black
                ${index !== options.length - 1 ? "mb-1" : ""}`}
            >
              {o.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customdropdown;
