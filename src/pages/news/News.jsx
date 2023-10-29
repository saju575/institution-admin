import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './News.css';

const News = () => {

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


  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };


  const newsItem = [
    'পবিত্র ঈদ-মিলাদুন্নবী (সা:) উদযাপন উপলক্ষ্যে কর্মসূচি।',
    'প্রতিষ্ঠানে সাত জন নতুন শিক্ষক নিয়োগ সম্পর্কে।',
    'দাখিল পরীক্ষা-২০২৩ এ মেধাবৃত্তি ও সাধারণ।',
  ]

  return (
    <React.Fragment>

      <div id='NewsAdminPanel' className='bg-[#FFFFFF]'>
        <div className="teachers-title">
          <h3 className='bg-[#79929C] text-white font-medium text-md mt-4 py-4 pl-4'>জরুরী নিউজঃ</h3>
        </div>

        {/* Current Important News Area */}
        <h4 className='font-medium text-lg mt-8 underline pl-4'>বর্তমান নিউজঃ</h4>

        <div className='currentNews pl-4'>
          {newsItem.map((item, index) => (
            <li className='list-none mx-2' key={index}>
              <div className='currentNewsList my-2 flex justify-between flex-wrap'>
                <a href='##'>{item}</a>
                <button className='bg-[#CE5A67] text-white px-4 py-1'>মুছুন</button>
              </div>
            </li>

          ))}
        </div>

        {/* Add New Important News Area */}
        <div className="addNewNews flex flex-col pl-4 lg:pl-0">
          <h4 className='font-medium text-lg mt-8 py-4 underline'>নতুন জরুরী নিউজ সংযোগ করুনঃ</h4>

          {/* Text Area to add news */}
          <div>
            <ReactQuill className='h-44' value={text} onChange={handleChange} />
          </div>

          <div className="mt-20 text-black">
            <button type="submit" className='bg-[#c5dfe77a] px-6 py-2 mb-2'>সংযোগ করুন</button>
          </div>

        </div>



        {/* Add PDF Area */}
        <div className='mt-10 flex flex-col pl-4 lg:pl-0'>
          <h4 className='font-medium text-lg py-4 underline'>পিডিএফ সংযোগ করুনঃ</h4>

          {/* form content goes here */}
          <form>

            <div className="form-group flex flex-wrap my-2 items-center ">
              <label htmlFor="title" className='pr-4 w-32'>নিউজের টাইটেলঃ</label>
              <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="নিউজের টাইটেল" />
            </div>


            <div className="form-group my-4">
              <label htmlFor="image" className='pr-4 w-32'>নিউজের পিডিএফঃ</label>
              <input src={selectedImage} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="mt-8 text-black">
              <button type="submit" className='bg-[#c5dfe77a] px-6 py-2 mb-2'>সংযোগ করুন</button>
            </div>

          </form>
        </div>

      </div>
    </React.Fragment>
  );
};

export default News;
