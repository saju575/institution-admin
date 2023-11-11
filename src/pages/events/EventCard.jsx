import React from "react";

const EventCard = ({ event, refetch }) => {
  return (
    <>
      <div className="events-inner mt-2 shadow bg-[#FAFAFA]">
        <picture>
          <img src={event.imageSrc} alt="events" />
        </picture>
        <h3 className="p-4 text-md font-medium">{event.title}</h3>
        <p className="number-font font-normal py-2 px-4">{event.date}</p>
        <div className="py-4 text-end pr-2">
          <a
            href="##"
            className="px-4 text-sm py-1 underline text-white font-medium bg-[#B4B4B3]"
          >
            বিস্তারিত
          </a>
        </div>
        <div className="flex mt-3 justify-end flex-wrap">
          <button className="bg-[#EBE4D1] mr-2 text-black px-6 mb-2 py-1">
            আপডেট
          </button>
          <button className="bg-[#CE5A67] mr-2 text-white px-6 mb-2 py-1">
            মুছুন
          </button>
        </div>
      </div>
    </>
  );
};

export default EventCard;
