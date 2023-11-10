import React, { useState } from "react";
import { useMutation } from "react-query";
import UpdateModal from "../../components/administrator/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteAdministration } from "../../utills/deleteAdministration";

const Card = ({ teacher, refetch }) => {
  // Modal popup For add Events
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  /* 
    update modal handler
  */
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  /* 
    confirm modal handler
  */
  const openModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeModal = () => {
    setIsConfirmModalOpen(false);
  };

  /* 
        delete mutation
      */
  const { mutateAsync: deleteMutate, isLoading } = useMutation({
    mutationFn: (id) => deleteAdministration(id),
    onSuccess: async () => {
      refetch();

      closeModal();
    },
  });

  /* 
    delete item handler
  */
  const handleDeleteItem = async () => {
    await deleteMutate(teacher._id);
  };
  return (
    <>
      {(isModalOpen || isConfirmModalOpen) && <div className="overlay"></div>}
      <div className="teachers-card p-4 bg-[#FFFFFF] shadow my-3 flex flex-col items-center">
        <div className="teachers-card-img my-4">
          {teacher?.image?.url ? (
            <picture>
              <img src={teacher.image.url} alt="profile" />
            </picture>
          ) : (
            <picture>
              <img src={"/assets/profile.jpg"} alt="profile" />
            </picture>
          )}
        </div>
        <div className="teachers-card-identity">
          <h4 className="font-medium text-md">{teacher.name}</h4>
          <h5>{teacher.position}</h5>
          {teacher?.phone && <h5>মোবাইলঃ {teacher.phone}</h5>}
          <h6>{teacher.institution}</h6>
          <div className="flex justify-between mt-3">
            <button
              className="bg-[#244c63ad] text-white px-4 py-1"
              onClick={handleModalOpen}
            >
              আপডেট
            </button>
            <button
              className="bg-[#CE5A67] text-white px-4 py-1"
              onClick={openModal}
            >
              অপসারণ
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal Popup */}
      {isModalOpen && (
        <UpdateModal handleModalClose={handleModalClose} id={teacher._id} />
      )}

      {/* Confirm Modal Popup */}
      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onCancel={closeModal}
          onConfirm={handleDeleteItem}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Card;
