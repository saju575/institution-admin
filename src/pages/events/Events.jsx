import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/allNotice/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAllNews } from "../../utills/getAllNews";
import EventCard from "./EventCard";
import "./Events.css";

const Events = () => {
  //modal state for events
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  /* 
    get all events notice
  */
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["allEventsNews"],
    staleTime: Infinity,
    queryFn: ({ pageParam = 1 }) =>
      getAllNews({ limit: 10, page: pageParam, type: "event" }),
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
  const eventsNotices = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.news];
  }, []);

  return (
    <React.Fragment>
      <div className="detailEvents-title">
        <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-2">
          ইভেন্টস
        </h3>
      </div>

      {/* Add Content Button */}
      <div className="mb-4 cursor-pointer text-end my-6 text-white">
        <span
          href="##"
          onClick={handleModalOpen}
          className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
        >
          নতুন সংযোগ{" "}
        </span>
      </div>

      {/* render data */}
      {eventsNotices?.length > 0 && (
        <InfiniteScroll
          dataLength={eventsNotices?.length > 0 ? eventsNotices.length : 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="flex justify-center items-center py-4">
              <Spinner />
            </div>
          }
          className="mb-4 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {" "}
          {eventsNotices.map((event) => (
            <EventCard key={event._id} event={event} refetch={refetch} />
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
      {!isLoading && eventsNotices?.length === 0 && (
        <div className="flex justify-center items-center py-4">
          <ErrorMsg msg="No data found" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center py-4">
          <ErrorMsg msg={error.message} />
        </div>
      )}

      {/* Modal Popup */}

      {isCreateModalOpen && <div className="overlay"></div>}

      {isCreateModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          keyword={"allEventsNews"}
          type={"event"}
          heading={{
            title: "ইভেন্টের নাম",
            pdf: "ইভেন্ট সম্পর্কে পিডিএফ",
            img: "ইভেন্ট সম্পর্কে ছবি",
            desc: "ইভেন্ট সম্পর্কে বর্ণনা",
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Events;
