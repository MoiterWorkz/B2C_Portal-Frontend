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
import { useNavigate } from "react-router";

const sidebarItems = [
  { label: "Dashboard", icon: Home, url: "dashboard" },
  { label: "Manage Wallet", icon: Banknote, url: "manage-wallet" },
  { label: "My Card", icon: CreditCard, url: "my-card" },
  { label: "Bill & Recharges", icon: Receipt, url: "bill-recharges" },
  { label: "Transaction History", icon: History, url: "transaction-history" },
  { label: "Wallet Recharge", icon: Wallet, url: "wallet-recharge" },
  {
    label: "Fund Transfer",
    icon: ArrowRightLeft,
    dropdown: [
      { label: "Add Payee", icon: UserPlus, url: "fund-transfer/add-payee" },
      { label: "Payee List", icon: Users, url: "fund-transfer/payee-list" },
    ],
  },
];

const SideBar = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleItemClick = (label, hasDropdown = false, url) => {
    navigate(url);
    setActiveItem(label);
    if (!hasDropdown) onClose(); // close sidebar on mobile
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out border-r
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:static lg:h-auto`}
        style={{
          backgroundColor: "var(--card-background-color)",
          border: "var(--border-right)",
        }}
      >
        <nav className="p-4 space-y-2 h-full overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.label;

            return (
              <div key={item.label}>
                <button
                  className={`sidebar-item ${
                    isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                  }`}
                  onClick={() => {
                    handleItemClick(item.label, !!item.dropdown, item.url);
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
                          onClick={() =>
                            handleItemClick(subItem.label, false, subItem.url)
                          }
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
