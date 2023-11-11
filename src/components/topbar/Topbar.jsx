import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Topbar = ({ menuVisible, toggleMenu }) => {
  return (
    <React.Fragment>
      <div className="flex justify-between items-center bg-white  p-4 lg:p-8 rounded text-black text-2xl font-semibold mb-2">
        <h2>Admin Panel</h2>
        <div
          className={`lg:hidden block ml-2 cursor-pointer`}
          onClick={toggleMenu}
        >
          {menuVisible ? <FiX /> : <FiMenu />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
