import moment from "moment/moment";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useMutation } from "react-query";
import ConfirmationModal from "../../../components/confirmModal/ConfirmationModal";
import { deleteItem } from "../../../utills/deleteItem";
import UpdateModal from "./UpdateModal";
const UploadResultCard = ({ result, refetch }) => {
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
        delete mutation
      */
  const { mutateAsync: deleteMutate, isLoading } = useMutation({
    mutationFn: (id) => deleteItem(`/students-result/${id}`),
    onSuccess: async () => {
      refetch();

      closeModal();
    },
  });

  /* 
    delete item handler
  */
  const handleDeleteItem = async () => {
    await deleteMutate(result._id);
  };
  return (
    <>
      <tr className="border-b">
        <td className="flex items-center pt-2">
          <i className="p-2">
            <BsFillCalendarDateFill />
          </i>
          <p className="py-2">
            {moment(result.updatedAt).format("DD - MM - YYYY")}
          </p>
        </td>
        <td className="p-2">{result.title}</td>
        <td className="p-2">{result.examType}</td>
        <td className="p-2">{result.classTitle}</td>
        <td className="p-2">{result.section}</td>
        <td className="p-2">{result?.group ? result.group : ""}</td>

        {/* update btn */}
        <td className="p-2 text-center">
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

      {/* overley  */}
      {(isConfirmModalOpen || isUpdateModalOpen) && (
        <div className="overlay"></div>
      )}

      {/* update modal popup */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          id={result._id}
          keyword={"students results"}
          heading={{ title: "রেজাল্ট শিরোনাম", term: "টার্ম", class: "ক্লাস" }}
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

export default UploadResultCard;
