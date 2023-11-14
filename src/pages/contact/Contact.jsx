import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const schoolData = [
    {
      name: "দানারহাট আনছারিয়া ফাজিল মাদ্রাসা",
      location: "ডাকঘরঃ ঠাকুরগাঁও, জেলাঃ ঠাকুরগাঁও",
      eiin: "EIIN: 165878",
      established: "স্থাপিতঃ ১৯৫২ ইং",
      code: "প্রতিষ্ঠানের কোড: 4587655",
      village: "গ্রামঃ দানারহাট, ঠাকুরগাঁও",
      district: "উপজেলা ও জেলাঃ ঠাকুরগাঁও",
      email: "ইমেইলঃ danarhut@gmail.com",
      mobile: "মোবাইলঃ ০১৭১৫৬৭২১৭১",
      website: "ওয়েবসাইটঃ dhafm.edu.bd",
    },
    // Add more data objects as needed
  ];

  // Selected Image from Desktop
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <React.Fragment>
      <div id="contactAdminPanel" className="">
        {/* Section title */}
        <div className="teachers-title ">
          <h3 className="bg-[#79929C] text-white font-medium text-md p-4 mb-3">
            যোগাযোগ
          </h3>
        </div>

        {/* Current Contact Area */}
        <div className="contact-inner grid grid-cols-1 sm:grid-cols-2 gap-4  items-center">
          {schoolData.map((school, index) => (
            <div
              key={index}
              className="pl-2 py-5 rounded flex justify-center flex-col"
            >
              <picture className="flex justify-center sm:justify-start">
                <img src="/assets/logo.png" alt="" />
              </picture>
              <div>
                <h2 className="max-[767px]:text-lg md:text-xl font-semibold mt-4">
                  {school.name}
                </h2>
                <h4 className="max-[767px]:text-sm md:text-md">
                  {school.location}
                </h4>
              </div>
              <hr className="mt-4 mr-4" />
              <div>
                <h3 className="text-md max-[767px]:text-sm pt-4">
                  {school.eiin}
                </h3>
                <h3 className="text-md max-[767px]:text-sm  number-font">
                  {school.established}
                </h3>
                <h3 className="text-md max-[767px]:text-sm  number-font">
                  {school.code}
                </h3>
              </div>
              <hr className="mt-4 mr-4" />
              <h5 className="pt-4">{school.village}</h5>
              <h5 className="py-1">{school.district}</h5>
              <h5>{school.email}</h5>
              <h5 className="py-1 number-font">{school.mobile}</h5>
              <h5>{school.website}</h5>
            </div>
          ))}

          {/* Iframe Map */}
          <div className="bg-[#FFFFFF] contact-map">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64454.92001022029!2d88.47133635267274!3d25.90487231882091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4c78eebb3154f%3A0x9f7f1e031fd1fb1a!2sDanarhat%20Madrasah%20Playground!5e0!3m2!1sen!2sbd!4v1697629193272!5m2!1sen!2sbd"
              title="Danarhut Ansariya Fazil Madrasah, Thakurgaon"
            ></iframe>
          </div>
        </div>

        {/*  Update Contact Area */}
        <div className="updateAdminContactArea flex ml-4 lg:ml-0">
          <div className="mt-10">
            {/* Title */}
            <h3 className="underline font-semibold text-lg mt-4 py-4 ">
              নাম ও যোগাযোগ আপডেট করুনঃ
            </h3>

            <form>
              {/* Update Part Goes from here. */}
              {/* Name */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  প্রতিষ্ঠানের নামঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="প্রতিষ্ঠানের নাম"
                />
              </div>

              {/* Location */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  প্রতিষ্ঠানের স্থানঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="প্রতিষ্ঠানের স্থান"
                />
              </div>

              {/* logo */}
              <div className="form-group my-4">
                <label htmlFor="image" className="w-44 pr-4 pl-2 lg:pl-0">
                  প্রতিষ্ঠানের লগোঃ
                </label>
                <input
                  src={selectedImage}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <hr className="my-10" />

              {/* EIIN */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  EIIN:
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="EIIN"
                />
              </div>

              {/* স্থাপিত */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  স্থাপিত সালঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="স্থাপিত"
                />
              </div>

              {/* প্রতিষ্ঠানের কোড */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  প্রতিষ্ঠানের কোডঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="প্রতিষ্ঠানের কোড"
                />
              </div>

              <hr className="my-10" />

              {/* গ্রামঃ */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  গ্রামঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="গ্রাম"
                />
              </div>

              {/* উপজেলা ও জেলাঃ */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  উপজেলা ও জেলাঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="উপজেলা ও জেলা"
                />
              </div>

              {/* ইমেইলঃ */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  ইমেইলঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="ইমেইল"
                />
              </div>

              {/* মোবাইলঃ */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  মোবাইলঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="মোবাইল"
                />
              </div>

              {/* ওয়েবসাইটঃ */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  ওয়েবসাইটঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="ওয়েবসাইট"
                />
              </div>

              <hr className="my-10" />

              {/* Map Link */}
              <div className="form-group flex my-2 items-center ">
                <label htmlFor="title" className="pr-4 pl-2 lg:pl-0 w-44">
                  ম্যাপ লোকেশনঃ
                </label>
                <input
                  className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Google map embed link here!"
                />
              </div>

              <div className="mt-8 text-center mb-2 text-black">
                <button type="submit" className="bg-[#c5dfe77a] px-12 py-4">
                  পরিবর্তন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
