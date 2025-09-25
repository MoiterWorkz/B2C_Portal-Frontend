import React from "react";
import { Menu, Globe, ChevronDown } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header
      className="shadow-sm border-b border-border header-glass-effect border-bottom w-full fixed top-0 z-50"
      style={{ backgroundColor: "var(--card-background-color)" }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 border-bottom">
        {/* Left section: Menu button + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle button */}
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center lg:hidden h-8 gap-1.5 px-3 rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-md header-item-glass"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 header-item-glass rounded-lg px-2 py-1">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
          </div>
        </div>

        {/* Right section: Language + Avatar */}
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center hover:text-accent-foreground 
                   rounded-md 
                   px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 
                   gap-1 sm:gap-2 
                   transition-all duration-300 
                   hover:scale-105 
                   Language-button"
          >
            <Globe className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 icon-color" />
            <span className="font-medium white-letter-color subheading1-size text-xs sm:text-sm md:text-base">
              English
            </span>
            <ChevronDown className="h-2 sm:h-3 md:h-3 w-2 sm:w-3 md:w-3 text-muted-foreground transition-transform duration-200 small-letter-greycolor" />
          </button>

          <button className="relative h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg transition-all duration-200 ease-in-out header-item-glass">
            <span
              className="relative flex h-8 w-8 items-center justify-center rounded-full white-letter-color"
              style={{ backgroundColor: "var(--user-icon-background-color)" }}
            >
              KA
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
