import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateModal from "../../components/layoutModal/CreateModal";
import UpdateModal from "../../components/layoutModal/UpdateModal";
import Spinner from "../../components/spinner/Spinner";
import { getLayoutData } from "../../utills/getLayoutData";

const ScoutGuide = () => {
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

  const { data, isLoading, error, isError } = useQuery({
    staleTime: Infinity,
    queryKey: ["boys_and_girls_scout_guide"],
    queryFn: () => getLayoutData(`/layout?type=boys_and_girls_scout_guide`),
  });

  // data render
  let layoutData;
  if (isLoading) {
    layoutData = (
      <div className="flex justify-center items-center py-4">
        <Spinner />
      </div>
    );
  } else if (!isLoading && isError) {
    layoutData = (
      <div>
        <ErrorMsg msg={error.message} />
      </div>
    );
  } else if (!isLoading && !isError && !data?.payload) {
    layoutData = (
      <div>
        <ErrorMsg msg={"No data found"} />
      </div>
    );
  } else if (!isLoading && !isError && data?.payload) {
    layoutData = (
      <div
        dangerouslySetInnerHTML={{
          __html: data?.payload?.boys_and_girls_scout_guide?.desc || "",
        }}
      />
    );
  }
  return (
    <React.Fragment>
      <div id="aboutUs" className="bg-[#FFFFFF80] ">
        <div className="aboutUS-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md py-4 pl-4">
            বয় ও গার্লস স্কাউট গাইড
          </h3>

          {/* add and update btn */}
          {data && (
            <div className="flex justify-end gap-4 px-2 pt-2">
              {!data?.payload ? (
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
          type={"boys_and_girls_scout_guide"}
          keyword={"boys_and_girls_scout_guide"}
          heading={{ title: "নতুন সংযোগ করুন" }}
          link={`/layout/create`}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          id={data?.payload?._id}
          handleModalClose={handleUpdateModalClose}
          type={"boys_and_girls_scout_guide"}
          keyword={"boys_and_girls_scout_guide"}
          heading={{ title: "আপডেট করুন" }}
        />
      )}
    </React.Fragment>
  );
};

export default ScoutGuide;
