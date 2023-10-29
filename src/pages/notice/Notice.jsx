import React, { useState } from 'react'
import './Notice.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCross2 } from 'react-icons/rx';
const Notice = () => {
  const notices = [
    {
      date: '৭, নভেম্বর',
      description: 'পবিত্র ঈদ-মিলাদুন্নবী (সা:) উদযাপন উপলক্ষ্যে কর্মসূচি',
      year: '২০২৩',
    },
    {
      date: '২৭, অক্টোবর',
      description: 'প্রতিষ্ঠানে সাত জন নতুন শিক্ষক নিয়োগ সম্পর্কে ।',
      year: '২০২৩',
    },
    {
      date: '১০, সেপ্টেম্বর',
      description: 'প্রাথমিক শিক্ষা পরীক্ষার সময়সূচি ঘোষণা',
      year: '২০২৩',
    },
    {
      date: '২৫, জুন',
      description: 'উচ্চশিক্ষা ক্লাসের পড়াশোনা সময়সূচি প্রকাশ',
      year: '২০২৩',
    },
    {
      date: '১৫, মে',
      description: 'শিক্ষা প্রতিষ্ঠানে ছুটির দিনের ঘোষণা',
      year: '২০২৩',
    },
  ];

  const handleUpdate = (index) => {
    console.log('Update clicked for index:', index);
  };

  const handleRemove = (index) => {
    console.log('Remove clicked for index:', index);
  };


  // Modal popup For add Events
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Selected Image from Desktop
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Seleceted Date 
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <React.Fragment>
      {/* Section Title */}
      <div className="teachers-title mt-4">
        <h3 className='bg-[#79929C] text-white font-medium text-md p-4 mb-3'>নোটিশ</h3>
      </div>

      <div className='py-5 pl-0 lg:pl-10 bg-[#FFFFFF] mt-4 shadow-lg'>
        {notices.map((notice, index) => (
          <>
            <div className='bg-[#F1EFEF] flex flex-wrap justify-between m-2 cursor-pointer items-center' key={index}>
              <div className='flex flex-wrap'>
                <div className='notice-date flex items-center justify-center py-2 flex-col text-center text-white bg-[#79929C]'>
                  <h5 className='border-b number-font'>{notice.date}</h5>
                  <h5 className='number-font'>{notice.year}</h5>
                </div>
                <div className='items-center flex px-4 py-2 notice-desc'>
                  <h4>{notice.description}</h4>
                </div>
              </div>
              <div className='flex mt-3 justify-end flex-wrap'>
                <button className='bg-[#EBE4D1] mr-2 text-black px-4 my-1 py-2' onClick={() => { handleUpdate(index); handleModalOpen() }}>আপডেট</button>
                <button className='bg-[#CE5A67] mr-2 text-white px-4 my-1 py-2' onClick={() => handleRemove(index)}>মুছুন</button>
              </div>
            </div>
          </>
        ))}

        {/* Add More Content Button */}
        <div className='mb-4 cursor-pointer text-end mt-14 mr-2 text-white'>
          <a href="##" onClick={handleModalOpen} className='bg-[#244c63ad] px-4 my-2 w-44 py-2 border'>নতুন সংযোগ </a>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal shadow absolute top-10  bg-[#FFFFFF]  border p-14 max-w-96 ">
            <div className="modal-content">
              <span className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2" onClick={handleModalClose}><a href="##"><i className=' py-8 text-2xl '><RxCross2 /></i></a></span>

              {/* form content goes here */}
              <div className='mt-10'>
                <form>
                  <div className="form-group flex flex-wrap my-2 items-center ">
                    <label htmlFor="title" className='pr-4 w-32'>নোটিশ টাইটেলঃ</label>
                    <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="নোটিশ টাইটেল" />
                  </div>

                  <div className="form-group flex flex-wrap my-2 items-center">
                    <label htmlFor="date" className='pr-4 w-32'>তারিখঃ</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="তারিখ"
                      className='outline-none px-4 py-2 bg-[#F3F3F3]'
                    />
                  </div>

                  <div className="form-group my-4">
                    <label htmlFor="image" className='pr-4 w-32'>নোটিশ পিডিএফ</label>
                    <input type="file"
                      id="file"
                      name="file"
                      accept=".pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      selected={selectedImage}
                      onChange={handleFileChange} />
                  </div>

                  <div className="text-center mt-14 text-black">
                    <button type="submit" className='bg-[#c5dfe77a] px-12 py-4'>সংযোগ করুন</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="overlay"></div>
      )}

    </React.Fragment>
  )
}

export default Notice