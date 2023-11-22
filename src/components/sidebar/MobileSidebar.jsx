import React, { useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { useMutation } from "react-query";
import { AuthContext } from "../../providers/AuthProvider";
import { adminLogout } from "../../utills/logOut";
import MobileSidebarItem from "./MobileSidebarItem";
import "./Sidebar.css";
import { sidebarItems } from "./sidebarItems";

const MobileSidebar = ({ isSidebarOpen, removeSidebar }) => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(
    new Array(sidebarItems.length).fill(false)
  );

  /*to set user  */
  const { setUser } = useContext(AuthContext);

  /* react query */
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () => adminLogout(),
    onSuccess: async (data) => {
      setUser(null);

      removeSidebar();
    },
  });

  /* Menu toogle handler */
  const toggleAdminDropdown = (index) => {
    setIsAdminDropdownOpen((prev) => {
      const newItems = prev.map((item, idx) => {
        if (idx === index) {
          return !item;
        } else {
          return false;
        }
      });

      return newItems;
    });
  };
  return (
    <div
      className={`sidebar bg-slate-300 ${
        isSidebarOpen ? "open" : ""
      } ml-2 p-5 pt-14 `}
    >
      {/* cross btn */}
      <button className="close-button" onClick={removeSidebar}>
        <span>
          <FiX />
        </span>
      </button>

      {/* menu items */}
      {sidebarItems.map((item, index) => (
        <MobileSidebarItem
          key={index}
          title={item.title}
          isOpen={isAdminDropdownOpen[index]}
          toggle={() => toggleAdminDropdown(index)}
          links={item.links}
          removeSidebar={removeSidebar}
        />
      ))}

      {/* Logout Icon */}
      <div className="mt-4 text-center">
        <ul>
          <li className="flex">
            <span
              className={`flex items-center cursor-pointer ${
                isLoading && "cursor-not-allowed"
              }`}
              onClick={async () => await mutateAsync()}
            >
              <i className="pr-2 text-2xl">
                <TbLogout2 />
              </i>
              {isLoading ? "Loading" : "Log Out"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
