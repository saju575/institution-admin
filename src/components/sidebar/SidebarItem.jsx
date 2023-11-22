import React from "react";
import { BsCaretDownFill } from "react-icons/bs";
import { TbBuildingBank } from "react-icons/tb";
import { Link } from "react-router-dom";

const SidebarItem = ({ title, isOpen, toggle, links }) => {
  return (
    <>
      <div
        onClick={toggle}
        className={`adminNavbar-link ${
          isOpen ? "active" : ""
        } mt-1 px-4 py-2 flex justify-between cursor-pointer items-center`}
      >
        <div className="flex items-center">
          <i className="pr-2">
            <TbBuildingBank />
          </i>{" "}
          {title}
        </div>
        <i className="pl-12">
          <BsCaretDownFill />
        </i>
      </div>
      {isOpen && (
        <div className="dropdown-menu border p-2">
          <ul>
            {links.map((link, index) => (
              <li key={index} className="mb-1 ml-4">
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarItem;
