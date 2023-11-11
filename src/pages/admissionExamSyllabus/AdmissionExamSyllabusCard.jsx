import moment from "moment/moment";
import { useState } from "react";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteNews } from "../../utills/deleteNews";

const AdmissionExamSyllabusCard = ({ notice, refetch }) => {
  // Modal popup state For confirmation

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
      <tr className="border-b">
        <td className="flex items-center pt-2">
          <i className="p-2">
            <BsFillCalendarDateFill />
          </i>
          <p className="py-2">
            {moment(notice.updatedAt).format("DD - MM - YYYY")}
          </p>
        </td>
        <td className="p-2">{notice.title}</td>
        <td className="p-2">
          <Link to={`/notice/${notice._id}`} className="flex items-center">
            {" "}
            <i className="pr-1">
              <AiFillEye />
            </i>{" "}
            View
          </Link>
        </td>
        <td className="p-2">
          {notice?.pdf?.url && (
            <a
              href={`#download-link-${notice._id}`}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </a>
          )}
        </td>
        <td className="p-2">
          {notice?.image?.url && (
            <a
              href={`#download-link-${notice._id}`}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </a>
          )}
        </td>
        <td className="p-2">
          <button>
            <i>
              <AiOutlineEdit />
            </i>
          </button>
        </td>
        <td className="p-2">
          <button onClick={openModal}>
            <i>
              <AiOutlineDelete />
            </i>
          </button>
        </td>
      </tr>

      {/* overley  */}
      {isConfirmModalOpen && <div className="overlay"></div>}

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
export default AdmissionExamSyllabusCard;
