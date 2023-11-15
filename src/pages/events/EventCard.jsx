import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import UpdateModal from "../../components/allNotice/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteNews } from "../../utills/deleteNews";

const EventCard = ({ event, refetch }) => {
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
    await deleteMutate(event._id);
  };

  return (
    <>
      <div className="events-inner mt-2 shadow bg-[#FAFAFA]">
        <div className="relative">
          {event?.image?.url ? (
            <img
              src={event?.image.url}
              alt="events"
              className="object-cover relative h-64 w-full"
            />
          ) : (
            <img
              src={"/assets/event.jpg"}
              alt="events"
              className="object-cover relative h-64 w-full"
            />
          )}
        </div>
        <h3 className="p-4 text-md font-medium">{event.title}</h3>
        <p className="number-font font-normal py-2 px-4">{event.date}</p>
        <div className="py-4 text-end pr-2">
          <Link
            to={`/notice/${event._id}`}
            className="px-4 text-sm py-1 underline text-white font-medium bg-[#B4B4B3]"
          >
            বিস্তারিত
          </Link>
        </div>

        <div className="flex mt-3 justify-end flex-wrap">
          <button
            onClick={handleUpdateModalOpen}
            className="bg-[#EBE4D1] mr-2 text-black px-6 mb-2 py-1"
          >
            আপডেট
          </button>
          <button
            onClick={openModal}
            className="bg-[#CE5A67] mr-2 text-white px-6 mb-2 py-1"
          >
            মুছুন
          </button>
        </div>
      </div>

      {/* update modal popup */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          id={event._id}
          heading={{
            title: "ইভেন্টের নাম",
            pdf: "ইভেন্ট সম্পর্কে পিডিএফ",
            img: "ইভেন্ট সম্পর্কে ছবি",
            desc: "ইভেন্ট সম্পর্কে বর্ণনা",
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

export default EventCard;
