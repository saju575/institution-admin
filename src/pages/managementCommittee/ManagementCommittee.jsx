import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import CreateModal from "../../components/administrator/CreateModal";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAdministrators } from "../../utills/getAdministrators";
import Card from "./Card";

const ManagementCommittee = () => {
  // Modal popup For add new members
  const [isModalOpen, setModalOpen] = useState(false);

  // open modal handler
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  //close modal handler
  const handleModalClose = () => {
    setModalOpen(false);
  };

  /* 
    get all data with infinities query parameters 
    -> paginate
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
    queryKey: ["commite"],
    queryFn: ({ pageParam = 1 }) =>
      getAdministrators({
        limit: 50,
        page: pageParam,
        role: "others",
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
      resize the data
    */
  const commiteData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.administrators];
  }, []);

  return (
    <div>
      <div id="teachers">
        <div className="teachers-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4">
            পরিচালনা কমিটি
          </h3>
        </div>

        {/* Add More Content Button */}
        <div className="mb-4 cursor-pointer text-end mt-4 text-white">
          <span
            onClick={handleModalOpen}
            className="bg-[#244c63ad] px-4 my-2 w-44 py-2 border"
          >
            নতুন সংযোগ
          </span>
        </div>

        {/* 
          render the data
        */}
        {commiteData?.length > 0 && (
          <InfiniteScroll
            dataLength={commiteData?.length > 0 ? commiteData.length : 0}
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
            {commiteData.map((commite, index) => (
              <Card key={index} commite={commite} refetch={refetch} />
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
        {!isLoading && commiteData?.length === 0 && (
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
      {isModalOpen && (
        <CreateModal
          handleModalClose={handleModalClose}
          type={"others"}
          institution={"দানারহাট আনছারিয়া ফাজিল মাদ্রাসা, ঠাকুরগাঁও"}
          keyword={"commite"}
        />
      )}
    </div>
  );
};

export default ManagementCommittee;
