import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import ConfirmationModal from "../../components/confirmModal/ConfirmationModal";
import { deleteItem } from "../../utills/deleteItem";

const AdminListRow = ({ row }) => {
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

  /* client query */
  const queryClient = useQueryClient();

  /* 
    delete mutation
  */
  const { mutateAsync: deleteMutate, isLoading } = useMutation({
    mutationFn: (url) => deleteItem(url),
    onSuccess: async () => {
      // refetch();
      queryClient.invalidateQueries("admin-list");

      closeModal();
    },
  });

  /* delete item handler */
  const handleDeleteItem = async () => {
    await deleteMutate(`/admin/delete-admin/${row._id}`);
  };

  return (
    <>
      <tr className="border-b">
        <td className="p-2">{row?.name}</td>

        <td className="p-2">{row.email}</td>
        <td className="p-2">{row.role}</td>

        <td className="p-2 cursor-pointer text-red-600" onClick={openModal}>
          {<BsTrash />}
        </td>
      </tr>

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

export default AdminListRow;
