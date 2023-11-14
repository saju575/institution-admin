import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import "./Notice.css";
import NoticeCard from "./NoticeCard";
const Notice = () => {
  // Modal popup For add general notice
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  /* 
    get all notice
  */
  const {
    data,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["allNews"],
    staleTime: Infinity,
    queryFn: ({ pageParam = 1 }) => getAllNews({ limit: 45, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.currentPage < lastPage.payload.totalPages) {
        return lastPage.payload.currentPage + 1;
      } else {
        return false;
      }
    },
  });

  /* 
      resize the data
    */
  const notices = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);
  return (
    <React.Fragment>
      {/* Section Title */}
      <div className="teachers-title ">
        <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
          নোটিশ
        </h3>
      </div>

      {/* Add More Content Button */}
      <div className="mb-4 cursor-pointer text-end my-6 mr-2 text-white">
        <span
          onClick={handleModalOpen}
          className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
        >
          নতুন সংযোগ{" "}
        </span>
      </div>

      {/* 
        render data
      */}
      <div
        id="scrollableterget"
        className="py-5 pl-0 lg:pl-10 bg-[#FFFFFF] mt-4 shadow-lg"
        // style={{ height: "100vh", overflowY: "auto" }}
      >
        {notices?.length > 0 && (
          <InfiniteScroll
            dataLength={notices?.length > 0 ? notices.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex justify-center items-center py-4">
                <Spinner />
              </div>
            }
            scrollableTarget="scrollableterget"
          >
            {notices.map((notice, index) => (
              <NoticeCard key={index} notice={notice} refetch={refetch} />
            ))}
          </InfiniteScroll>
        )}

        {/* 
        showing the error message and loading
         */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && notices?.length === 0 && (
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
          keyword={"allNews"}
          type={"general notice"}
          heading={{
            title: "নোটিশ শিরোনাম",
            pdf: "নোটিশ পিডিএফ",
            img: "নোটিশ ছবি",
            desc: "বর্ণনা",
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Notice;
