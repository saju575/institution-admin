import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Sidebar from "./Sidebar";

import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  // New Side bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (location.pathname === "/login") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
  return (
    <div>
      <Topbar menuVisible={isSidebarOpen} toggleMenu={toggleSidebar} />

      <Sidebar isSidebarOpen={isSidebarOpen} removeSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
};

export default RootLayout;
