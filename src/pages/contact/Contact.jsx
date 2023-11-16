import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getLayoutData } from "../../utills/getLayoutData";
import "./Contact.css";
import ContactCreateModal from "./ContactCreateModal";
import ContactUpdateModal from "./ContactUpdateModal";

const Contact = () => {
  // const schoolData = [
  //   {
  //     name: "দানারহাট আনছারিয়া ফাজিল মাদ্রাসা",
  //     location: "ডাকঘরঃ ঠাকুরগাঁও, জেলাঃ ঠাকুরগাঁও",
  //     eiin: "EIIN: 165878",
  //     established: "স্থাপিতঃ ১৯৫২ ইং",
  //     code: "প্রতিষ্ঠানের কোড: 4587655",
  //     village: "গ্রামঃ দানারহাট, ঠাকুরগাঁও",
  //     district: "উপজেলা ও জেলাঃ ঠাকুরগাঁও",
  //     email: "ইমেইলঃ danarhut@gmail.com",
  //     mobile: "মোবাইলঃ ০১৭১৫৬৭২১৭১",
  //     website: "ওয়েবসাইটঃ dhafm.edu.bd",
  //   },
  //   // Add more data objects as needed
  // ];

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
    queryKey: ["institution_info"],
    queryFn: () => getLayoutData(`/layout?type=institution_info`),
  });
  console.log(data);
  return (
    <React.Fragment>
      <div id="contactAdminPanel" className="">
        {/* Section title */}
        <div className="teachers-title ">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
            যোগাযোগ
          </h3>
        </div>

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

        {/* Current Contact Area */}
        {data?.payload && (
          <div className="mt-3 contact-inner grid grid-cols-1 sm:grid-cols-2 gap-4  items-center">
            <div className="pl-2 py-5 rounded flex justify-center flex-col">
              {data?.payload?.institution_info?.logo?.url && (
                <picture className="flex justify-center sm:justify-start">
                  <img
                    src={data?.payload?.institution_info?.logo?.url}
                    alt="Institution logo"
                  />
                </picture>
              )}
              <div>
                <h2 className="max-[767px]:text-lg md:text-xl font-semibold mt-4">
                  {data?.payload?.institution_info?.institution_name}
                </h2>
                <h4 className="max-[767px]:text-sm md:text-md">
                  {data?.payload?.institution_info?.location_name}
                </h4>
              </div>
              <hr className="mt-4 mr-4" />
              <div>
                <h3 className="text-md max-[767px]:text-sm pt-4">
                  EIIN: {data?.payload?.institution_info?.EIIN}
                </h3>
                <h3 className="text-md max-[767px]:text-sm  number-font">
                  স্থাপিতঃ {data?.payload?.institution_info?.established} ইং
                </h3>
                <h3 className="text-md max-[767px]:text-sm  number-font">
                  প্রতিষ্ঠানের কোড:{" "}
                  {data?.payload?.institution_info?.institutionCode}
                </h3>
              </div>
              <hr className="mt-4 mr-4" />
              <h5 className="pt-4">
                গ্রামঃ {data?.payload?.institution_info?.village}
              </h5>
              <h5 className="py-1">
                উপজেলা ও জেলাঃ {data?.payload?.institution_info?.district}
              </h5>
              <h5>{data?.payload?.institution_info?.email}</h5>
              <h5 className="py-1 number-font">
                মোবাইলঃ {data?.payload?.institution_info?.phone}
              </h5>
              <h5>ওয়েবসাইটঃ {data?.payload?.institution_info?.website}</h5>
            </div>

            {/* Iframe Map */}
            <div className="bg-[#FFFFFF] contact-map">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={data?.payload?.institution_info?.map_link}
                title={data?.payload?.institution_info?.institution_name}
              ></iframe>
            </div>
          </div>
        )}

        {/* 
        showing the error message and loading
         */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && !data?.payload && (
          <div className="flex justify-center items-center py-4">
            <ErrorMsg msg="No data found" />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center py-4">
            <ErrorMsg msg={error.message} />
          </div>
        )}
      </div>

      {/* Modal Popup For add new member*/}
      {isCreateModalOpen && (
        <ContactCreateModal
          handleModalClose={handleCreateModalClose}
          type={"institution_info"}
          keyword={"institution_info"}
          heading={{
            institution_name: "প্রতিষ্ঠানের নাম",
            phone: "মোবাইল",
            email: "ইমেইল",
            village: "গ্রাম",
            district: "জেলা",
            postOffice: "ডাকঘর",
            EIIN: "EIIN",
            established: "স্থাপিত সাল",
            institutionCode: "প্রতিষ্ঠানের কোড",
            website: "ওয়েবসাইট",
            upazila: "উপজেলা",
            map_link: "ম্যাপ লোকেশন",
            map_link_placeholder: "Google map embed link here!",
            location_name: "প্রতিষ্ঠানের স্থান",
            logo: "প্রতিষ্ঠানের লগো",
          }}
          link={`/layout/create`}
        />
      )}

      {isUpdateModalOpen && (
        <ContactUpdateModal
          handleModalClose={handleUpdateModalClose}
          type={"institution_info"}
          keyword={"institution_info"}
          heading={{
            institution_name: "প্রতিষ্ঠানের নাম",
            phone: "মোবাইল",
            email: "ইমেইল",
            village: "গ্রাম",
            district: "জেলা",
            postOffice: "ডাকঘর",
            EIIN: "EIIN",
            established: "স্থাপিত সাল",
            institutionCode: "প্রতিষ্ঠানের কোড",
            website: "ওয়েবসাইট",
            upazila: "উপজেলা",
            map_link: "ম্যাপ লোকেশন",
            map_link_placeholder: "Google map embed link here!",
            location_name: "প্রতিষ্ঠানের স্থান",
            logo: "প্রতিষ্ঠানের লগো",
          }}
          id={data?.payload?._id}
        />
      )}
    </React.Fragment>
  );
};

export default Contact;
