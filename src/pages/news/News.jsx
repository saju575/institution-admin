import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import "./News.css";
import NewsCard from "./NewsCard";

const News = () => {
  // Modal popup For add routine
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  /* 
    get all the data
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
    queryKey: ["urgent news"],
    staleTime: Infinity,
    queryFn: ({ pageParam }) =>
      getAllNews({ page: pageParam, limit: 10, priority: "urgent" }),
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
  const urgentNews = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <React.Fragment>
      <div id="NewsAdminPanel" className="bg-[#FFFFFF]">
        <div className="teachers-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md  py-4 pl-4">
            জরুরী নিউজঃ
          </h3>
        </div>

        {/* add new */}
        <div className="cursor-pointer text-end my-6 text-white">
          <span
            onClick={handleModalOpen}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
          >
            নতুন সংযোগ
          </span>
        </div>

        {/* Current Important News Area */}
        <h4 className="font-medium text-lg mt-8 underline pl-4">
          বর্তমান নিউজঃ
        </h4>
        {urgentNews?.length > 0 && (
          <InfiniteScroll
            dataLength={urgentNews?.length > 0 ? urgentNews.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex justify-center items-center py-4">
                <Spinner />
              </div>
            }
            className="currentNews pl-4"
          >
            {urgentNews.map((item, index) => (
              <NewsCard key={index} item={item} refetch={refetch} />
            ))}
          </InfiniteScroll>
        )}

        {/* 
          showing error messages and loading
        */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}
        {!isLoading && urgentNews?.length === 0 && (
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
          keyword={"urgent news"}
          type={"general notice"}
          heading={{
            title: "জরুরী নিউজের শিরোনাম",
            pdf: "জরুরী নিউজের পিডিএফ",
            img: "জরুরী নিউজের ছবি",
            desc: "জরুরী নিউজের বর্ণনা",
          }}
          setPriority={"urgent"}
        />
      )}
    </React.Fragment>
  );
};

export default News;
