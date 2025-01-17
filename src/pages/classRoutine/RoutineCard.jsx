import moment from "moment/moment";
import { useState } from "react";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import UpdateModal from "../../components/allNotice/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteNews } from "../../utills/deleteNews";
import { downloadFileFromUrl } from "../../utills/downloadFileFromURL";

const RoutineCard = ({ routine, refetch }) => {
  //  popup state For Confirmation Modal
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // state For Update Modal
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

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
    update modal handler
  */
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
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
    await deleteMutate(routine._id);
  };

  return (
    <>
      <tr className="border-b">
        <td className="flex items-center pt-2">
          <i className="p-2">
            <BsFillCalendarDateFill />
          </i>
          <p className="py-2">
            {moment(routine.updatedAt).format("DD - MM - YYYY")}
          </p>
        </td>
        <td className="p-2" title={routine.title}>
          {routine.title.split(/\s+/).slice(0, 5).join(" ") + "..."}
        </td>
        <td className="p-2">
          <Link to={`/notice/${routine._id}`} className="flex items-center">
            {" "}
            <i className="pr-1">
              <AiFillEye />
            </i>{" "}
            View
          </Link>
        </td>
        <td className="p-2">
          {routine?.pdf?.url && (
            <button
              onClick={() => downloadFileFromUrl(routine.pdf.url)}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </button>
          )}
        </td>
        <td className="p-2">
          {routine?.image?.url && (
            <button
              onClick={() => downloadFileFromUrl(routine.image.url)}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </button>
          )}
        </td>

        {/* update btn */}
        <td className="p-2">
          <button onClick={handleUpdateModalOpen}>
            {" "}
            <i>
              <AiOutlineEdit />
            </i>
          </button>
        </td>

        {/* delete btn */}
        <td className="p-2">
          <button onClick={openModal}>
            <i>
              <AiOutlineDelete />
            </i>
          </button>
        </td>
      </tr>

      {/* update modal popup */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          id={routine._id}
          heading={{
            title: "ক্লাস রুটিন শিরোনাম",
            pdf: "ক্লাস রুটিন পিডিএফ",
            img: "ক্লাস রুটিন ছবি",
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

export default RoutineCard;
