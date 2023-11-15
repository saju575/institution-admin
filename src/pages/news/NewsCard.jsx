import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import UpdateModal from "../../components/allNotice/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteNews } from "../../utills/deleteNews";

const NewsCard = ({ item, refetch }) => {
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
    await deleteMutate(item._id);
  };

  return (
    <>
      <li className="list-none mx-2">
        <div className="currentNewsList my-2 flex justify-between flex-wrap">
          <Link to={`/notice/${item._id}`}>{item.title}</Link>
          <div className="">
            <button
              onClick={handleUpdateModalOpen}
              className="bg-[#CE5A67] text-white px-4 py-1 mr-2"
            >
              পরিবর্তন
            </button>
            <button
              onClick={openModal}
              className="bg-[#CE5A67] text-white px-4 py-1"
            >
              মুছুন
            </button>
          </div>
        </div>
      </li>

      {/* update modal popup */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          id={item._id}
          heading={{
            title: "জরুরী নিউজের শিরোনাম",
            pdf: "জরুরী নিউজের পিডিএফ",
            img: "জরুরী নিউজের ছবি",
            desc: "জরুরী নিউজের বর্ণনা",
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

export default NewsCard;
