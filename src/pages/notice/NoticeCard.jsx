import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../../components/allNotice/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteNews } from "../../utills/deleteNews";
import { formatDate } from "../../utills/formatDate";

const NoticeCard = ({ notice, refetch }) => {
  const navigate = useNavigate();

  // Modal popup state For confirmation

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // state For Update Modal
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  /* 
    update modal handler
  */
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
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
    client query
  */
  const queryClient = useQueryClient();

  /* 
    delete mutation
  */
  const { mutateAsync: deleteMutate, isLoading } = useMutation({
    mutationFn: (id) => deleteNews(id),
    onSuccess: async () => {
      // refetch();
      queryClient.invalidateQueries();
      closeModal();
    },
  });

  /* 
        delete item handler
      */
  const handleDeleteItem = async () => {
    await deleteMutate(notice._id);
  };
  return (
    <>
      <div className="bg-[#F1EFEF] flex flex-wrap justify-between m-2  items-center">
        <div className="flex flex-wrap">
          <div className="notice-date flex items-center justify-center py-2 flex-col text-center text-white bg-[#79929C]">
            <h5 className="border-b number-font">
              {formatDate(notice.updatedAt).date}
            </h5>
            <h5 className="number-font">{formatDate(notice.updatedAt).year}</h5>
          </div>
          <div className="items-center flex px-4 py-2 notice-desc">
            <h4
              className="cursor-pointer"
              onClick={() => navigate(`/notice/${notice._id}`)}
            >
              {notice.title}
            </h4>
          </div>
        </div>
        <div className="flex mt-3 justify-end flex-wrap">
          <button
            onClick={handleUpdateModalOpen}
            className="bg-[#EBE4D1] mr-2 text-black px-4 my-1 py-2"
          >
            আপডেট
          </button>
          <button
            onClick={openModal}
            className="bg-[#CE5A67] mr-2 text-white px-4 my-1 py-2"
          >
            মুছুন
          </button>
        </div>
      </div>

      {/* overley  */}
      {(isConfirmModalOpen || isUpdateModalOpen) && (
        <div className="overlay"></div>
      )}

      {/* update modal popup */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          id={notice._id}
          heading={{
            title: "নোটিশ শিরোনাম",
            pdf: "নোটিশ পিডিএফ",
            img: "নোটিশ ছবি",
            desc: "বর্ণনা",
          }}
        />
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

export default NoticeCard;
