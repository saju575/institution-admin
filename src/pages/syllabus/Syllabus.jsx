import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import SyllabusCard from "./SyllabusCard";

const Syllabus = () => {
  // modal state for add syllabus
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  /* 
    get the all syllabus data
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
    queryKey: ["syllabus"],
    queryFn: ({ pageParam }) =>
      getAllNews({ page: pageParam, limit: 60, type: "syllabus" }),
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
  const syllabus = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <React.Fragment>
      {/* Section Title */}
      <div className="teachers-title">
        <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
          সিলেবাস
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
      <div className="my-4">
        <div className="border  bg-[#DBE8E960]">
          {syllabus?.length > 0 && (
            <InfiniteScroll
              dataLength={syllabus?.length > 0 ? syllabus.length : 0}
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
                    <th className="p-2 text-start min-w-max">প্রকাশের তারিখ</th>
                    <th className="p-2 text-start min-w-max">নোটিশ</th>
                    <th className="p-2 text-start min-w-max">ভিউ</th>
                    <th className="p-2 text-start min-w-max">ডাউনলোড[PDF]</th>
                    <th className="p-2 text-start min-w-max">ডাউনলোড[Img]</th>
                    <th className="p-2 text-start min-w-max">সম্পাদনা</th>
                    <th className="p-2 text-start min-w-max">মুছুন</th>
                  </tr>
                </thead>

                <tbody>
                  {syllabus.map((row) => (
                    <SyllabusCard
                      key={row._id}
                      syllabus={row}
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
        {!isLoading && syllabus?.length === 0 && (
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

      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          keyword={"syllabus"}
          type={"syllabus"}
          heading={{
            title: "সিলেবাস শিরোনাম",
            pdf: "সিলেবাস পিডিএফ",
            img: "সিলেবাস ছবি",
            desc: "বর্ণনা",
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Syllabus;
