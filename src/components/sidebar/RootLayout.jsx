import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import MobileSidebar from "./MobileSidebar";
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
        {/* Mobile view side bar */}
        <div className="block lg:hidden">
          <MobileSidebar
            isSidebarOpen={isSidebarOpen}
            removeSidebar={toggleSidebar}
          />
        </div>

        {/* Desktop view side bar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Outlet  */}
        <div
          id="scrollableterget" // Please don't remove this id. This will cause problems in infinite scrolling
          className={`${styles.outlet} overflow-y-auto`}
          style={{ height: "calc(100vh - 122px)" }}
        >
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
