import React, { useState } from "react";
import "./Sidebar.css";

import { BsCaretDownFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { TbBuildingBank, TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, removeSidebar }) => {
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isAdminDropdownOpen1, setIsAdminDropdownOpen1] = useState(false);
  const [isAdminDropdownOpen2, setAdminDropdownOpen2] = useState(false);
  const [isAdminDropdownOpen3, setAdminDropdownOpen3] = useState(false);
  const [isAdminDropdownOpen4, setAdminDropdownOpen4] = useState(false);
  const [isAdminDropdownOpen5, setAdminDropdownOpen5] = useState(false);
  const [isAdminDropdownOpen6, setAdminDropdownOpen6] = useState(false);
  const [isAdminDropdownOpen7, setAdminDropdownOpen7] = useState(false);

  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen(!isAdminDropdownOpen);
  };

  const toggleAdminDropdown1 = () => {
    setIsAdminDropdownOpen1(!isAdminDropdownOpen1);
  };

  const toggleAdminDropdown2 = () => {
    setAdminDropdownOpen2(!isAdminDropdownOpen2);
  };

  const toggleAdminDropdown3 = () => {
    setAdminDropdownOpen3(!isAdminDropdownOpen3);
  };

  const toggleAdminDropdown4 = () => {
    setAdminDropdownOpen4(!isAdminDropdownOpen4);
  };

  const toggleAdminDropdown5 = () => {
    setAdminDropdownOpen5(!isAdminDropdownOpen5);
  };

  const toggleAdminDropdown6 = () => {
    setAdminDropdownOpen6(!isAdminDropdownOpen6);
  };

  const toggleAdminDropdown7 = () => {
    setAdminDropdownOpen7(!isAdminDropdownOpen7);
  };

  return (
    <React.Fragment>
      {/* Large Device Sidebar */}
      <div
        id="adminSidebar"
        className="adminSidebar hidden lg:block relative mr-5 shadow "
      >
        <div className="p-8 top-34">
          {/* 1st Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown}
            className={`adminNavbar-link ${
              isAdminDropdownOpen ? "active" : ""
            } px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              প্রথম পাতা
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className="mb-1 ml-4">
                  <Link to="/">জরুরী নিউজ</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/about-us">আমাদের কথা</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/aim-objective">লক্ষ্য ও উদ্দেশ্য</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 2nd Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown1}
            className={`adminNavbar-link ${
              isAdminDropdownOpen1 ? "active" : ""
            } mt-1 px-4 py-2  justify-between flex cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              প্রশাসনিক
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen1 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/management-committee">পরিচালনা কমিটি</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/president-message">প্রতিষ্ঠান সভাপতির বাণী</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/principal-message">অধ্যক্ষের বাণী</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/teachers">শিক্ষকবৃন্দ</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/workers">কর্মকর্তা</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 3rd Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown2}
            className={`adminNavbar-link ${
              isAdminDropdownOpen2 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              একাডেমিক
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen2 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/class-routine">ক্লাস রুটিন</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/exam-routine">পরীক্ষার রুটিন</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/notice">নোটিশ</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/syllabus">সিলেবাস</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 4rd Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown7}
            className={`adminNavbar-link ${
              isAdminDropdownOpen7 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              সহপাঠ
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen7 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/scout-guide">বয় ও গার্লস স্কাউট গাইড</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/debate-competition">বিতর্ক প্রতিযোগিতা</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/play">ক্রিয়া</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 5th Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown3}
            className={`adminNavbar-link ${
              isAdminDropdownOpen3 ? "active" : ""
            } mt-1  px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              ভর্তি
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen3 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/admission-notice">ভর্তি বিজ্ঞপ্তি</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/admission-exam-syllabus">
                    ভর্তি পরিক্ষার সিলেবাস
                  </Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/list-of-selected-students-seeking-admission">
                    ভর্তি নির্বাচিত শিক্ষার্থীর তালিকা
                  </Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/list-of-selected-students-waiting-admission">
                    ভর্তি অপেক্ষমান শিক্ষার্থীর তালিকা
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* 6th Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown4}
            className={`adminNavbar-link ${
              isAdminDropdownOpen4 ? "active" : ""
            } mt-1 px-4 py-2  justify-between flex cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              রেজাল্ট
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen4 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/school-result">স্কুলের রেজাল্ট প্রকাশ</Link>
                </li>
                <li className=" mb-1 ml-4">
                  <Link to="/check-school-result">স্কুল রেজাল্ট</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 7th Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown5}
            className={`adminNavbar-link ${
              isAdminDropdownOpen5 ? "active" : ""
            } mt-1 px-4 py-2  justify-between flex cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              গ্যালারি
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen5 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/events">ইভেন্টস</Link>
                </li>
              </ul>
            </div>
          )}

          {/* 8th Sidebar Nav Item */}
          <div
            onClick={toggleAdminDropdown6}
            className={`adminNavbar-link ${
              isAdminDropdownOpen6 ? "active" : ""
            } mt-1 px-4 py-2  justify-between flex cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              যোগাযোগ
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen6 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li className=" mb-1 ml-4">
                  <Link to="/contact">যোগাযোগ</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Logout Icon */}
          <div className="mt-4 text-center">
            <ul>
              <li className="flex">
                <a href="##" className="flex items-center">
                  <i className="pr-2 text-2xl">
                    <TbLogout2 />
                  </i>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive Sidebar */}
      <div className="adminResponsiveSidebar block lg:hidden">
        <div
          className={`sidebar bg-slate-300  ${
            isSidebarOpen ? "open" : ""
          } ml-2 p-5 pt-14 `}
        >
          {/* Dropdown Sidebar Menu 1 */}
          <div
            onClick={toggleAdminDropdown}
            className={`adminNavbar-link ${
              isAdminDropdownOpen ? "active" : ""
            } px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <button className="close-button" onClick={removeSidebar}>
              <span>
                <FiX />
              </span>
            </button>
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>
              প্রথম পাতা
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/">জরুরী নিউজ</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/about-us">আমাদের কথা</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/aim-objective">লক্ষ্য ও উদ্দেশ্য</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 2 */}
          <div
            onClick={toggleAdminDropdown1}
            className={`adminNavbar-link ${
              isAdminDropdownOpen1 ? "active" : ""
            } px-4 mt-1 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              প্রশাসনিক
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen1 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/management-committee">পরিচালনা কমিটি</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/president-message">প্রতিষ্ঠান সভাপতির বাণী</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/principal-message">অধ্যক্ষের বাণী</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/teachers">শিক্ষকবৃন্দ</Link>
                </li>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/workers">কর্মকর্তা</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 3 */}
          <div
            onClick={toggleAdminDropdown2}
            className={`adminNavbar-link ${
              isAdminDropdownOpen2 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              একাডেমিক
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen2 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/class-routine">ক্লাস রুটিন</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/exam-routine">পরীক্ষার রুটিন</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/notice">নোটিশ</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/syllabus">সিলেবাস</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 4 */}
          <div
            onClick={toggleAdminDropdown7}
            className={`adminNavbar-link ${
              isAdminDropdownOpen7 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              সহপাঠ
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen7 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/scout-guide">বয় ও গার্লস স্কাউট গাইড</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/debate-competition">বিতর্ক প্রতিযোগিতা</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/play">ক্রিয়া</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 5 */}
          <div
            onClick={toggleAdminDropdown3}
            className={`adminNavbar-link ${
              isAdminDropdownOpen3 ? "active" : ""
            } mt-1  px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              ভর্তি
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen3 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/admission-notice">ভর্তি বিজ্ঞপ্তি</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/admission-exam-syllabus">
                    ভর্তি পরিক্ষার সিলেবাস
                  </Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/list-of-selected-students-seeking-admission">
                    ভর্তি নির্বাচিত শিক্ষার্থীর তালিকা
                  </Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/list-of-selected-students-waiting-admission">
                    ভর্তি অপেক্ষমান শিক্ষার্থীর তালিকা
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 6 */}
          <div
            onClick={toggleAdminDropdown4}
            className={`adminNavbar-link ${
              isAdminDropdownOpen4 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              রেজাল্ট
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen4 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/school-result">স্কুলের রেজাল্ট প্রকাশ</Link>
                </li>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/check-school-result">স্কুল রেজাল্ট</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 7 */}
          <div
            onClick={toggleAdminDropdown5}
            className={`adminNavbar-link ${
              isAdminDropdownOpen5 ? "active" : ""
            } mt-1 px-4 py-2  justify-between flex cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              গ্যালারি
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen5 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className=" mb-1 ml-4">
                  <Link to="/events">ইভেন্টস</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Dropdown Sidebar Menu 8 */}
          <div
            onClick={toggleAdminDropdown6}
            className={`adminNavbar-link ${
              isAdminDropdownOpen6 ? "active" : ""
            } mt-1 px-4 py-2 flex justify-between  cursor-pointer items-center`}
          >
            <div className="flex items-center">
              <i className="pr-2">
                <TbBuildingBank />
              </i>{" "}
              যোগাযোগ
            </div>
            <i className="pl-12">
              <BsCaretDownFill />
            </i>
          </div>
          {isAdminDropdownOpen6 && (
            <div className="dropdown-menu border p-2">
              <ul>
                <li onClick={removeSidebar} className="mb-1 ml-4">
                  <Link to="/contact">যোগাযোগ</Link>
                </li>
              </ul>
            </div>
          )}

          {/* Logout Button */}
          <div className="mt-4 text-center">
            <ul>
              <li className="flex">
                <span className="cursor-pointer flex items-center">
                  <i className="pr-2 text-2xl">
                    <TbLogout2 />
                  </i>
                  Log Out
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
