import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ErrorMsg from "../../../components/errorMsg/ErrorMsg";
import Spinner from "../../../components/spinner/Spinner";
import { getAllResults } from "../../../utills/getAllResults";
import UploadModal from "./UploadModal";
import UploadResultCard from "./UploadResultCard";

const UploadResult = () => {
  //modal state for waiting admission
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
    queryKey: ["students results"],
    queryFn: ({ pageParam }) =>
      getAllResults({
        page: pageParam,
        limit: 60,
      }),
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
  const results = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.results];
  }, []);

  return (
    <>
      <div>
        <h2 className="text-lg sm:text-xl text-white bg-[#244c63ad] py-4 pl-4">
          রেজাল্ট ফাইল আপলোড করুন (.xlsx)
        </h2>

        {/* add btn */}
        <div className="cursor-pointer text-end mt-4 text-white">
          <span
            onClick={handleModalOpen}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
          >
            নতুন সংযোগ{" "}
          </span>
        </div>

        {/* CSV File Area */}
        <div id="classRoutine" className="my-4">
          <div className="border bg-[#DBE8E960]">
            {results?.length > 0 && (
              <InfiniteScroll
                dataLength={results?.length > 0 ? results.length : 0}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={
                  <div className="flex justify-center items-center py-4">
                    <Spinner />
                  </div>
                }
                scrollableTarget="scrollableterget"
                className="thin-scrollbar"
              >
                <table className="border-collapse w-full min-w-[1000px]">
                  <thead>
                    <tr className="bg-[#BBCDCD60]">
                      <th className="p-2 text-start min-w-max">
                        প্রকাশের তারিখ
                      </th>
                      <th className="p-2 text-start min-w-max">নোটিশ</th>
                      <th className="p-2 text-start min-w-max">টার্ম</th>
                      <th className="p-2 text-start min-w-max">শ্রেণি</th>
                      <th className="p-2 text-start min-w-max">শাখা</th>
                      <th className="p-2 text-start min-w-max">বিভাগ</th>
                      <th className="p-2 text-start min-w-max">বছর</th>
                      <th className="p-2 min-w-max">সম্পাদনা</th>
                      <th className="p-2 text-start min-w-max">মুছুন</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.map((row) => (
                      <UploadResultCard
                        key={row._id}
                        result={row}
                        refetch={refetch}
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
          {!isLoading && results?.length === 0 && (
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
      </div>

      {/* Modal Popup */}

      {/* Upload Modal popup*/}
      {isCreateModalOpen && (
        <UploadModal
          handleModalClose={handleModalClose}
          keyword={"students results"}
          heading={{ title: "রেজাল্ট শিরোনাম", term: "টার্ম", class: "ক্লাস" }}
        />
      )}
    </>
  );
};

export default UploadResult;
