import React, { useState } from "react";
import {
  Home,
  CreditCard,
  Banknote,
  Wallet,
  History,
  ArrowRightLeft,
  Users,
  UserPlus,
  Receipt,
  ChevronDown,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", icon: Home },
  { label: "Manage Wallet", icon: Banknote },
  { label: "My Card", icon: CreditCard },
  { label: "Bill & Recharges", icon: Receipt },
  { label: "Transaction History", icon: History },
  { label: "Card Topup", icon: Wallet },
  {
    label: "Fund Transfer",
    icon: ArrowRightLeft,
    dropdown: [
      { label: "Add Payee", icon: UserPlus },
      { label: "Payee List", icon: Users },
    ],
  },
];

const SideBar = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleItemClick = (label, hasDropdown = false) => {
    setActiveItem(label);
    if (!hasDropdown) onClose(); // close sidebar on mobile
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        style={{ backgroundColor: "var(--card-background-color)" }}
      />

      <aside
        className={`fixed top-16 left-0 z-40  w-64 transform transition-transform duration-300 ease-in-out border-right
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:top-16 lg:bottom-0`}
        style={{ backgroundColor: "var(--card-background-color)" }}
      >
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <div key={item.label}>
                <button
                  className={`sidebar-item ${
                    isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                  }`}
                  onClick={() => {
                    handleItemClick(item.label, !!item.dropdown);
                    if (item.dropdown) toggleDropdown(item.label);
                  }}
                >
                  <div className="flex items-center gap-3 ">
                    <item.icon
                      className={`sidebar-icon ${
                        isActive
                          ? "sidebar-icon-active"
                          : "sidebar-icon-inactive"
                      }`}
                      size={15}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.dropdown && (
                    <ChevronDown
                      className={`sidebar-icon transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      } ${
                        isActive
                          ? "sidebar-icon-active"
                          : "sidebar-icon-inactive"
                      }`}
                      size={15}
                    />
                  )}
                </button>

                {item.dropdown && openDropdown === item.label && (
                  <div className="sidebar-dropdown">
                    {item.dropdown.map((subItem) => {
                      const isSubActive = activeItem === subItem.label;
                      return (
                        <button
                          key={subItem.label}
                          className={`sidebar-item ${
                            isSubActive
                              ? "sidebar-item-active"
                              : "sidebar-item-inactive"
                          }`}
                          onClick={() => handleItemClick(subItem.label)}
                        >
                          <subItem.icon
                            className={`sidebar-icon ${
                              isSubActive
                                ? "sidebar-icon-active"
                                : "sidebar-icon-inactive"
                            }`}
                            size={15}
                          />
                          <span>{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
