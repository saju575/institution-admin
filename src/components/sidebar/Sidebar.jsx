import React, { useContext, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { useMutation } from "react-query";
import { AuthContext } from "../../providers/AuthProvider";
import { adminLogout } from "../../utills/logOut";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

const Sidebar = () => {
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
    },
  });
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
    <div id="adminSidebar" className="adminSidebar relative mr-5 shadow ">
      <div className="p-8 top-34">
        {/* side menu items */}
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            title={item.title}
            isOpen={isAdminDropdownOpen[index]}
            toggle={() => toggleAdminDropdown(index)}
            links={item.links}
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
    </div>
  );
};

export default Sidebar;
