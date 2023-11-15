import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateModal from "../../components/layoutModal/CreateModal";
import UpdateModal from "../../components/layoutModal/UpdateModal";
import Spinner from "../../components/spinner/Spinner";
import { getLayoutData } from "../../utills/getLayoutData";

const AimAndObjective = () => {
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

  const {
    data: objective,
    isLoading: isObjectiveLoading,
    error: objectiveError,
    isError: isObjectiveError,
  } = useQuery({
    staleTime: Infinity,
    queryKey: ["institution_objective"],
    queryFn: () => getLayoutData(`/layout?type=institution_objective`),
  });

  // what to render
  let layoutData;

  if (isObjectiveLoading) {
    layoutData = (
      <div className="flex justify-center items-center py-4">
        <Spinner />
      </div>
    );
  } else if (!isObjectiveLoading && isObjectiveError) {
    layoutData = (
      <div>
        <ErrorMsg msg={objectiveError.message} />
      </div>
    );
  } else if (!isObjectiveLoading && !isObjectiveError && !objective?.payload) {
    layoutData = (
      <div>
        <ErrorMsg msg={"No data found"} />
      </div>
    );
  } else if (!isObjectiveLoading && !isObjectiveError && objective?.payload) {
    layoutData = (
      <div
        dangerouslySetInnerHTML={{
          __html: objective?.payload?.institution_objective?.desc || "",
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div id="aboutUs" className="bg-[#FFFFFF80] ">
        <div className="aboutUS-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md  py-4 pl-4">
            প্রতিষ্ঠানের লক্ষ্য ও উদ্দেশ্য
          </h3>

          {/* add and update btn */}
          {objective && (
            <div className="flex justify-end gap-4 px-2 pt-2">
              {!objective?.payload ? (
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

          {/* data */}
          <div className="py-4 px-2">{layoutData}</div>
        </div>
      </div>
      {/* Modal Popup For add new member*/}
      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleCreateModalClose}
          type={"institution_objective"}
          keyword={"institution_objective"}
          heading={{ title: "নতুন সংযোগ করুন" }}
          link={`/layout/create`}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          id={objective?.payload?._id}
          handleModalClose={handleUpdateModalClose}
          type={"institution_objective"}
          keyword={"institution_objective"}
          heading={{ title: "আপডেট করুন" }}
        />
      )}
    </React.Fragment>
  );
};

export default AimAndObjective;
