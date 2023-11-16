import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateModal from "../../components/layoutModal/CreateModal";
import UpdateModal from "../../components/layoutModal/UpdateModal";
import Spinner from "../../components/spinner/Spinner";
import { getLayoutData } from "../../utills/getLayoutData";

const DebateCompetition = () => {
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
    queryKey: ["debates_compitition"],
    queryFn: () => getLayoutData(`/layout?type=debates_compitition`),
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
        className="no-tailwind"
        dangerouslySetInnerHTML={{
          __html: data?.payload?.debates_compitition?.desc || "",
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div id="aboutUs" className="bg-[#FFFFFF80] ">
        <div className="aboutUS-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md  py-4 pl-4">
            বিতর্ক প্রতিযোগিতা
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
          type={"debates_compitition"}
          keyword={"debates_compitition"}
          heading={{ title: "নতুন সংযোগ করুন" }}
          link={`/layout/create`}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          id={data?.payload?._id}
          handleModalClose={handleUpdateModalClose}
          type={"debates_compitition"}
          keyword={"debates_compitition"}
          heading={{ title: "আপডেট করুন" }}
        />
      )}
    </React.Fragment>
  );
};

export default DebateCompetition;
