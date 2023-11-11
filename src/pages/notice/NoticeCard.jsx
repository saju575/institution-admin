import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utills/formatDate";

const NoticeCard = ({ notice, refetch }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#F1EFEF] flex flex-wrap justify-between m-2  items-center">
        <div className="flex flex-wrap">
          <div className="notice-date flex items-center justify-center py-2 flex-col text-center text-white bg-[#79929C]">
            <h5 className="border-b number-font">
              {formatDate(notice.updatedAt).date}
            </h5>
            <h5 className="number-font">{formatDate(notice.updatedAt).year}</h5>
          </div>
          <div className="items-center flex px-4 py-2 notice-desc">
            <h4
              className="cursor-pointer"
              onClick={() => navigate(`/notice/${notice._id}`)}
            >
              {notice.title}
            </h4>
          </div>
        </div>
        <div className="flex mt-3 justify-end flex-wrap">
          <button className="bg-[#EBE4D1] mr-2 text-black px-4 my-1 py-2">
            আপডেট
          </button>
          <button className="bg-[#CE5A67] mr-2 text-white px-4 my-1 py-2">
            মুছুন
          </button>
        </div>
      </div>
    </>
  );
};

export default NoticeCard;
