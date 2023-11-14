import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Play = () => {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  const play = [
    "আমাদের প্রতিষ্ঠানে নিম্নলিখিত ক্রিয়াসমূহ নির্ধারণ করেঃ 1. শিক্ষা সরঞ্জামের পরিকল্পনা এবং পর্যালোচনা সরঞ্জাম প্রদান করা. 2. সমৃদ্ধ পাঠ্যক্রম ব্যবস্থাপনা করা যা ছাত্র-ছাত্রীদের উন্নতি এবং বৃদ্ধির সাথে সাথে সাক্ষরতা এবং শিক্ষা দেয়. 3. পুনঃপ্রশিক্ষণ কোর্সের মাধ্যমে সেরা শিক্ষকদের নিয়োগ এবং উন্নত পাঠক্রমের উন্নত স্তরের শিক্ষকদের উন্নত প্রশিক্ষণ প্রদান করা. 4. উপযুক্ত শিক্ষার পরিপ্রেক্ষ্য প্রদানের মাধ্যমে ছাত্র-ছাত্রীদের জীবনে শিক্ষার মাধ্যমে সক্ষম নাগরিক গঠনে সাহায্য করা. 5. শিক্ষার বাইরে আরও-শিক্ষানুষাসনিক উপক্রিয়াগুলি সম্পাদন করা, যেমন কর্মশীলতা উন্নত করার প্রশিক্ষণ কোর্স, শিক্ষাক্ষেত্রে সেবা প্রদান, সম্প্রদায় সেবা প্রকল্প, আইসিটি সম্প্রদায়ের উন্নতি এবং সমৃদ্ধির জন্য কর্মশীলতা প্রদানের সমর্থন দেয়. 6. সমাজে সেবা প্রদানে সম্প্রদায়ের প্রশাসন ও সম্প্রদায় বিকাশের লক্ষ্যে সেবা প্রকল্প এবং সমর্থন প্রদান করা. 7. প্রতিষ্ঠানের উন্নতি, সফলতা এবং শিক্ষা প্রদানের জন্য নীতি এবং পরিপ্রেক্ষ্য প্রদান করা. 8. সম্প্রदায় প্রতিষ্ঠানের দায়িত্বের সাথে সম্প্রদায়ের সদস্যদের জীবনে সুবর্ণ যোগদান ও উন্নতি লক্ষ্যে বিকাশ করা. 9. প্রতিষ্ঠানের পরিপ্রেক্ষ্য এবং উন্নতির সাথে সম্প্রদায় কর্মীদের যোগদান ও তাদের সাথে মানসিক সমৃদ্ধি ও উন্নতি সাধারণ লক্ষ্যে উন্নত করা. এই ক্রিয়াগুলি মাধ্যমে আমরা আমাদের প্রতিষ্ঠানের উন্নতি, শিক্ষা, এবং সমাজে সেবা প্রদানে অবদান রাখতে সক্ষম হয়।",
  ];

  return (
    <React.Fragment>
      <div id="aboutUs" className="bg-[#FFFFFF80] ">
        <div className="aboutUS-title">
          <h3 className="bg-[#79929C] text-white font-medium text-md  py-4 pl-4">
            ক্রিয়া
          </h3>
          {play.map((text, index) => (
            <li className="py-2 list-none mx-2" key={index}>
              <div className="currentNewsList my-2 flex justify-between flex-wrap">
                <p>{text}</p>
                <button className="bg-[#CE5A67] text-white px-4 mt-2 py-1">
                  মুছুন
                </button>
              </div>
            </li>
          ))}

          <div className="my-4 flex flex-col mt-8 lg:ml-0 ml-2">
            <h4 className="font-semibold text-lg underline">নতুন সংযোগ করুন</h4>

            {/* Text Area to add news */}
            <div className=" my-10 ">
              <ReactQuill
                className="h-44"
                value={text}
                onChange={handleChange}
              />
            </div>

            <div className="mt-14 lg:mt-4 text-blac ml-2">
              <button type="submit" className="bg-[#c5dfe77a] px-6 py-2 mb-2">
                আপডেট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Play;
