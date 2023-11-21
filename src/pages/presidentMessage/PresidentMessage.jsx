import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateModal from "../../components/precedentialModal/CreateModal";
import UpdateModal from "../../components/precedentialModal/UpdateModal";
import Spinner from "../../components/spinner/Spinner";
import { getAdministrators } from "../../utills/getAdministrators";
import PresidentData from "./PresidentData";

const TYPE = "president";

const PresidentMessage = () => {
  // Modal popup For add Events
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // state For Update Modal
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(() => true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(() => false);
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

  // fetech data
  const { data, isLoading, error, isError } = useQuery({
    staleTime: Infinity,
    queryKey: [TYPE],
    queryFn: () => getAdministrators({ role: TYPE }),
  });

  return (
    <React.Fragment>
      <div id="teachers">
        <div className="teachers-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4">
            প্রতিষ্ঠানের সভাপতি সম্পর্কে
          </h3>
        </div>

        {/* add and update btn */}
        {data?.payload?.administrators && (
          <div className="flex justify-end gap-4 px-2 pt-2">
            {!data?.payload?.administrators?.length > 0 ? (
              <span
                onClick={handleCreateModalOpen}
                className="bg-[#244c63ad] px-4 text-white cursor-pointer  py-2 border"
              >
                নতুন সংযোগ
              </span>
            ) : (
              <span
                onClick={handleUpdateModalOpen}
                className="bg-[#244c63ad] px-4 text-white cursor-pointer  py-2 border"
              >
                আপডেট করুন
              </span>
            )}
          </div>
        )}

        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorMsg msg={error.message} />
        ) : data?.payload?.administrators?.length === 0 ? (
          <ErrorMsg msg="No data found" />
        ) : (
          <>
            <PresidentData data={data?.payload?.administrators[0]} />
          </>
        )}
      </div>

      {/* Modal Popup For add new member*/}
      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleCreateModalClose}
          type={TYPE}
          keyword={TYPE}
          position={"সভাপতি"}
          heading={{ messageTitle: "সভাপতি বার্তা" }}
        />
      )}

      {/* Update modal */}
      {isUpdateModalOpen && (
        <UpdateModal
          handleModalClose={handleUpdateModalClose}
          type={TYPE}
          keyword={TYPE}
          heading={{ messageTitle: "সভাপতি বার্তা" }}
          id={data?.payload?.administrators[0]._id}
        />
      )}
    </React.Fragment>
  );
};

export default PresidentMessage;
