import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Sidebar from "./Sidebar";
import styles from "./rootLayout.module.css";

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

      <div className="lg:flex">
        <Sidebar isSidebarOpen={isSidebarOpen} removeSidebar={toggleSidebar} />
        <div className={`${styles.outlet}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
