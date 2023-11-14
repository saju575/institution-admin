import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/administrator/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAdministrators } from "../../utills/getAdministrators";
import Card from "./Card";

const Workers = () => {
  // Modal popup For add Events
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  /* 
    get all staff data
  */
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    staleTime: Infinity,
    queryKey: ["staff"],
    queryFn: ({ pageParam = 1 }) =>
      getAdministrators({ limit: 50, page: pageParam, role: "staff" }),
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
  const staffsData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.administrators];
  }, []);

  return (
    <React.Fragment>
      <div id="teachers">
        <div className="teachers-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4">
            কর্মকর্তা
          </h3>
        </div>

        {/* Add Content Button */}
        <div className="mb-4 cursor-pointer text-end mt-4 text-white">
          <a
            href="##"
            onClick={handleModalOpen}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
          >
            নতুন সংযোগ{" "}
          </a>
        </div>

        {staffsData?.length > 0 && (
          <InfiniteScroll
            dataLength={staffsData?.length > 0 ? staffsData.length : 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex justify-center items-center py-4">
                <Spinner />
              </div>
            }
            scrollableTarget="scrollableterget"
            className="teachers-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3"
          >
            {staffsData.map((worker, index) => (
              <Card key={index} worker={worker} refetch={refetch} />
            ))}
          </InfiniteScroll>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}

        {!isLoading && staffsData?.length === 0 && (
          <div className="flex justify-center items-center py-4">
            <ErrorMsg msg="No data found" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center items-center py-4">
            <ErrorMsg msg={error.messge} />
          </div>
        )}
      </div>

      {isModalOpen && <div className="overlay"></div>}

      {/* Modal Popup For add new member*/}
      {isModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          type={"staff"}
          institution={"দানারহাট আনছারিয়া ফাজিল মাদ্রাসা, ঠাকুরগাঁও"}
          keyword={"staff"}
        />
      )}
    </React.Fragment>
  );
};

export default Workers;
