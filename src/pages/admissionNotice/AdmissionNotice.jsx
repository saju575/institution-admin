import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import AdmissionNoticeCard from "./AdmissionNoticeCard";

const AdmissionNotice = () => {
  //modal state for selected student admission
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  /* 
    get  all the  data
  */
  const {
    data,
    refetch,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    staleTime: Infinity,
    queryKey: ["admission circular"],
    queryFn: ({ pageParam }) =>
      getAllNews({ page: pageParam, limit: 10, type: "admission circular" }),
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.currentPage < lastPage.payload.totalPages) {
        return lastPage.payload.currentPage + 1;
      } else {
        return false;
      }
    },
  });

  /* 
      store the all page data in the one array to scroll infinitely
    */
  const admission_circular_data = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <>
      <div id="classRoutine" className="my-4">
        {/* Section Title */}
        <div className="teachers-title mt-4">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
            ভর্তি বিজ্ঞপ্তি
          </h3>
        </div>

        {/* add button */}
        <div className=" cursor-pointer text-end my-6 text-white">
          <span
            onClick={handleModalOpen}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
          >
            নতুন সংযোগ{" "}
          </span>
        </div>

        {/* render data */}
        <div className="border vertical-scrollMain bg-[#DBE8E960]">
          {admission_circular_data?.length > 0 && (
            <InfiniteScroll
              dataLength={
                admission_circular_data?.length > 0
                  ? admission_circular_data.length
                  : 0
              }
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={
                <div className="flex justify-center items-center py-4">
                  <Spinner />
                </div>
              }
            >
              <table className="border-collapse w-full vertical-scroll">
                <thead>
                  <tr className="bg-[#BBCDCD60]">
                    <th className="p-2 text-start w-3/12">প্রকাশের তারিখ</th>
                    <th className="p-2 text-start w-5/12">নোটিশ</th>
                    <th className="p-2 text-start w-2/12">ভিউ</th>
                    <th className="p-2 text-start w-2/12">ডাউনলোড[PDF]</th>
                    <th className="p-2 text-start w-2/12">ডাউনলোড[Img]</th>
                    <th className="p-2 text-start w-1/12">সম্পাদনা</th>
                    <th className="p-2 text-start w-1/12">মুছুন</th>
                  </tr>
                </thead>

                <tbody>
                  {admission_circular_data.map((row) => (
                    <AdmissionNoticeCard
                      key={row._id}
                      notice={row}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          )}
        </div>

        {/* showing error messages and loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && admission_circular_data?.length === 0 && (
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

      {/* Modal Popup */}

      {/* Add More Content Button */}
      {isCreateModalOpen && <div className="overlay"></div>}

      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          keyword={"admission circular"}
          type={"admission circular"}
          heading={{
            title: "ভর্তি বিজ্ঞপ্তি শিরোনাম",
            pdf: "ভর্তি বিজ্ঞপ্তি পিডিএফ",
            img: "ভর্তি বিজ্ঞপ্তি ছবি",
            desc: "ভর্তি বিজ্ঞপ্তি বর্ণনা",
          }}
        />
      )}
    </>
  );
};

export default AdmissionNotice;
