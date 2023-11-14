import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import SeekingAdmissionCard from "./SeekingAdmissionCard";

const SeekingAdmission = () => {
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
    queryKey: ["admission result"],
    queryFn: ({ pageParam }) =>
      getAllNews({ page: pageParam, limit: 10, type: "admission result" }),
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.currentPage < lastPage.payload.totalPages) {
        return lastPage.payload.currentPage + 1;
      } else {
        return false;
      }
    },
  });

  /* 
    store the all page data in the one array to scroll
      */
  const admission_result_data = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <>
      {/* Section Title */}
      <div className="teachers-title mt-4">
        <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
          ভর্তি নির্বাচিত শিক্ষার্থীর তালিকা
        </h3>
      </div>

      {/* Add More Content Button */}
      <div className=" cursor-pointer text-end my-6 text-white">
        <span
          onClick={handleModalOpen}
          className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
        >
          নতুন সংযোগ{" "}
        </span>
      </div>

      {/* render data */}
      <div id="classRoutine" className="my-4">
        <div className="border  bg-[#DBE8E960]">
          {admission_result_data?.length > 0 && (
            <InfiniteScroll
              dataLength={
                admission_result_data?.length > 0
                  ? admission_result_data.length
                  : 0
              }
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={
                <div className="flex justify-center items-center py-4">
                  <Spinner />
                </div>
              }
              className="thin-scrollbar"
            >
              <table className="border-collapse w-full min-w-[1000px]">
                <thead>
                  <tr className="bg-[#BBCDCD60]">
                    <th className="p-2 text-start min-w-max">প্রকাশের তারিখ</th>
                    <th className="p-2 text-start min-w-max">নোটিশ</th>
                    <th className="p-2 text-start min-w-max">ভিউ [PDF]</th>
                    <th className="p-2 text-start min-w-max">ডাউনলোড[PDF]</th>
                    <th className="p-2 text-start min-w-max">ডাউনলোড[Img]</th>
                    <th className="p-2 text-start min-w-max">সম্পাদনা</th>
                    <th className="p-2 text-start min-w-max">মুছুন</th>
                  </tr>
                </thead>

                <tbody>
                  {admission_result_data.map((row) => (
                    <SeekingAdmissionCard
                      key={row._id}
                      refetch={refetch}
                      notice={row}
                    />
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          )}
        </div>

        {/* 
          showing error messages and loading
          */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && admission_result_data?.length === 0 && (
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

      {isCreateModalOpen && <div className="overlay"></div>}

      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          keyword={"admission result"}
          type={"admission result"}
          heading={{
            title: "নির্বাচিত শিক্ষার্থীর শিরোনাম",
            pdf: "নির্বাচিত শিক্ষার্থীর পিডিএফ",
            img: "নির্বাচিত শিক্ষার্থীর ছবি",
            desc: "বর্ণনা",
          }}
        />
      )}
    </>
  );
};

export default SeekingAdmission;
