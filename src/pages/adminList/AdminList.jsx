import React, { useState } from "react";
import { AiOutlineUndo } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { getAdminList } from "../../utills/getAdminList";
import AdminListTable from "./AdminListTable";
import CreateAdminModal from "./CreateAdminModal";

const AdminList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /* 
    get the all syllabus data
  */
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    staleTime: Infinity,
    queryKey: ["admin-list"],
    queryFn: ({ pageParam }) =>
      getAdminList({ page: pageParam, limit: 20, role: "admin" }),
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.currentPage < lastPage.payload.totalPages) {
        return lastPage.payload.currentPage + 1;
      } else {
        return false;
      }
    },
  });

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(() => true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(() => false);
  };

  /* 
    store the all page data in the one array to scroll infinitely
  */
  const adminList = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.payload.admins];
  }, []);

  return (
    <div>
      <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
        অ্যাডমিন তালিকা
      </h3>

      {/* add and update btn */}
      {adminList?.length > 0 && adminList?.length <= 4 && (
        <div className="flex justify-end gap-4 px-2 pt-2 mb-6">
          {
            <span
              onClick={handleCreateModalOpen}
              className="bg-[#244c63ad] px-4 text-white cursor-pointer  py-2 border"
            >
              নতুন অ্যাডমিন সংযোগ
            </span>
          }
        </div>
      )}

      {adminList?.length > 0 && (
        <div className="mb-4">
          <AiOutlineUndo
            className="text-2xl cursor-pointer"
            onClick={refetch}
          />
        </div>
      )}

      {/* render data */}
      <div className="border  bg-[#DBE8E960]">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <ErrorMsg msg={error.message} />
        ) : adminList?.length === 0 ? (
          <ErrorMsg msg="No data found" />
        ) : (
          <InfiniteScroll
            dataLength={adminList.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Spinner />}
            className="thin-scrollbar"
          >
            <AdminListTable data={adminList} />
          </InfiniteScroll>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateAdminModal handleModalClose={handleCreateModalClose} />
      )}
    </div>
  );
};

export default AdminList;
