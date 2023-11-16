import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import CreateModal from "../../components/layoutModal/CreateModal";
import UpdateModal from "../../components/layoutModal/UpdateModal";
import Spinner from "../../components/spinner/Spinner";
import { getLayoutData } from "../../utills/getLayoutData";

const AboutUs = () => {
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
    data: aboutUs,
    isLoading: isAboutUsLoading,
    error: aboutUsError,
    isError: isAboutUsError,
  } = useQuery({
    staleTime: Infinity,
    queryKey: ["about_institution"],
    queryFn: () => getLayoutData(`/layout?type=about_institution`),
  });

  /* render data */
  let layoutData;

  if (isAboutUsLoading) {
    layoutData = (
      <div className="flex justify-center items-center py-4">
        <Spinner />
      </div>
    );
  } else if (!isAboutUsLoading && isAboutUsError) {
    layoutData = (
      <div>
        <ErrorMsg msg={aboutUsError.message} />
      </div>
    );
  } else if (!isAboutUsLoading && !isAboutUsError && !aboutUs?.payload) {
    layoutData = (
      <div>
        <ErrorMsg msg={"No data found"} />
      </div>
    );
  } else if (!isAboutUsLoading && !isAboutUsError && aboutUs?.payload) {
    layoutData = (
      <div
        className="no-tailwind"
        dangerouslySetInnerHTML={{
          __html: aboutUs?.payload?.about_institution?.desc || "",
        }}
      />
    );
  }

  return (
    <React.Fragment>
      <div id="aboutUs" className="bg-[#FFFFFF80]">
        <div className="aboutUS-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md py-4 pl-4">
            আমাদের কথা
          </h3>

          {/* add and update btn */}
          {aboutUs && (
            <div className="flex justify-end gap-4 px-2 pt-2">
              {!aboutUs?.payload ? (
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
          type={"about_institution"}
          keyword={"about_institution"}
          heading={{ title: "নতুন সংযোগ করুন" }}
          link={`/layout/create`}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          id={aboutUs?.payload?._id}
          handleModalClose={handleUpdateModalClose}
          type={"about_institution"}
          keyword={"about_institution"}
          heading={{ title: "নতুন সংযোগ করুন" }}
        />
      )}
    </React.Fragment>
  );
};

export default AboutUs;
