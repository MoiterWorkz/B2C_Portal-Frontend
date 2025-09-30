import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header full width */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <SideBar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Main content */}
        <main className="flex-1 my-8 max-w-6xl mx-3 md:mx-6 lg:mx-20">
          <Outlet />
        </main>
      </div>

      {/* Footer outside main */}
      <Footer />
    </div>
  );
};

export default Layout;
