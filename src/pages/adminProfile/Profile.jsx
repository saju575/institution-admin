import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const handleCloseModal = () => {
    setChangePasswordModalOpen(() => false);
  };

  const handleOpenModal = () => {
    setChangePasswordModalOpen(() => true);
  };
  return (
    <div>
      <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
        অ্যাডমিন প্রোফাইল
      </h3>

      <div className="md:w-[500px] p-6 bg-slate-300">
        {user?.name && (
          <div className="flex items-center gap-4 mb-2">
            <p className="w-1/3 font-bold uppercase">User name</p>
            <p className="w-4/6">{user?.name}</p>
          </div>
        )}

        <div className="flex items-center gap-4 mb-2">
          <p className="w-1/3 font-bold uppercase">Email</p>
          <p className="w-4/6">{user.email}</p>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <p className="w-1/3 font-bold uppercase">Role</p>
          <p className="w-4/6">{user.role}</p>
        </div>

        {/* add btn */}
        <div className="text-end mt-6 text-white">
          <span
            onClick={handleOpenModal}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border cursor-pointer"
          >
            পাসওয়ার্ড পরিবর্তন করুন
          </span>
        </div>
      </div>

      {changePasswordModalOpen && (
        <ChangePasswordModal
          handleModalClose={handleCloseModal}
          email={user.email}
        />
      )}
    </div>
  );
};

export default Profile;
