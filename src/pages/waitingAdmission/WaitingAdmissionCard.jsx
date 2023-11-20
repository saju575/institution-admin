import moment from "moment/moment";
import { useState } from "react";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import UpdateModal from "../../components/allNotice/UpdateModal";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteItem } from "../../utills/deleteItem";
import { downloadFileFromUrl } from "../../utills/downloadFileFromURL";

const WaitingAdmissionCard = ({ notice, refetch }) => {
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
    mutationFn: (id) => deleteItem(`/news/delete/${id}`),
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
            <button
              onClick={() => downloadFileFromUrl(notice.pdf.url)}
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
          {notice?.image?.url && (
            <button
              onClick={() => downloadFileFromUrl(notice.image.url)}
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
          id={notice._id}
          heading={{
            title: "অপেক্ষমান শিক্ষার্থীর শিরোনাম",
            pdf: "অপেক্ষমান শিক্ষার্থীর পিডিএফ",
            img: "অপেক্ষমান শিক্ষার্থীর ছবি",
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

export default WaitingAdmissionCard;
