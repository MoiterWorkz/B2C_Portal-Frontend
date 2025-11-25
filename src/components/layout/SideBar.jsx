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
import { useNavigate, useLocation } from "react-router";
import UseIconsData from "../../hooks/useIconsData";

const SideBar = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { sidebarItems } = UseIconsData();
  const navigate = useNavigate();
  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleItemClick = (label, hasDropdown = false, url) => {
    navigate(url);
    if (!hasDropdown) onClose(); // close sidebar on mobile
  };

  const location = useLocation();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        // style={{ backgroundColor: "var(--card-background-color)" }}
      />

      <aside
        className={`fixed top-16 left-0 z-40  w-64 transform transition-transform duration-300 ease-in-out border-right
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          h-screen lg:translate-x-0 lg:static lg:h-auto`}
        style={{ backgroundColor: "var(--card-background-color)" }}
      >
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.url;
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
                      const isSubActive = location.pathname === subItem.url;
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
