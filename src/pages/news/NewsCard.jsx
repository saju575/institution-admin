import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ item, refetch }) => {
  return (
    <>
      <li className="list-none mx-2">
        <div className="currentNewsList my-2 flex justify-between flex-wrap">
          <Link to={`/notice/${item._id}`}>{item.title}</Link>
          <div className="">
            <button className="bg-[#CE5A67] text-white px-4 py-1 mr-2">
              পরিবর্তন
            </button>
            <button className="bg-[#CE5A67] text-white px-4 py-1">মুছুন</button>
          </div>
        </div>
      </li>
    </>
  );
};

export default NewsCard;
