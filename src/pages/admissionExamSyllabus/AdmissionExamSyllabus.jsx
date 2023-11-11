import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import AdmissionExamSyllabusCard from "./AdmissionExamSyllabusCard";

const AdmissionExamSyllabus = () => {
  //modal state for  admission syallbus
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
    queryKey: ["admission syllabus"],
    queryFn: ({ pageParam }) =>
      getAllNews({ page: pageParam, limit: 10, type: "admission syllabus" }),
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
  const admission_syllabus_data = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <>
      {/* Section Title */}
      <div className="teachers-title mt-4">
        <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
          ভর্তি পরিক্ষার সিলেবাস
        </h3>
      </div>

      {/* add more content */}
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
        <div className="border vertical-scrollMain bg-[#DBE8E960]">
          {admission_syllabus_data?.length > 0 && (
            <InfiniteScroll
              dataLength={
                admission_syllabus_data?.length > 0
                  ? admission_syllabus_data.length
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
                  {admission_syllabus_data.map((row) => (
                    <AdmissionExamSyllabusCard
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

        {/* 
          showing error messages and loading
          */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && admission_syllabus_data?.length === 0 && (
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
          keyword={"admission syllabus"}
          type={"admission syllabus"}
          heading={{
            title: "ভর্তি পরীক্ষার সিলেবাস শিরোনাম",
            pdf: "ভর্তি পরীক্ষার সিলেবাস পিডিএফ",
            img: "ভর্তি পরীক্ষার সিলেবাস ছবি",
            desc: "বর্ণনা",
          }}
        />
      )}
    </>
  );
};

export default AdmissionExamSyllabus;
