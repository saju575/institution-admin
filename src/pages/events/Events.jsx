import React, { useState } from 'react'
import './Events.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Events = () => {

  const eventsData = [
    {
      id: 1,
      title: 'শিক্ষা উৎসব প্রতিযোগিতা',
      date: '১২ ডিসেম্বর ২০২২',
      imageSrc: '/assets/events.jpg',
    },
    {
      id: 2,
      title: 'শিক্ষা কার্যশালা প্রতিযোগিতা',
      date: '১৫ ডিসেম্বর ২০২২',
      imageSrc: '/assets/events.jpg',
    },
    {
      id: 3,
      title: 'স্কুল ক্যাম্পাস ইভেন্ট',
      date: '১৫ ডিসেম্বর ২০২২',
      imageSrc: '/assets/events.jpg',
    },
    {
      id: 4,
      title: 'শিক্ষা পরিক্ষা সফলতা',
      date: '১৫ ডিসেম্বর ২০২২',
      imageSrc: '/assets/events.jpg',
    },
  ];

  const handleUpdate = (index) => {

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

  // Seleceted Date 
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (

    <React.Fragment>
      {isModalOpen && (
        <div className="overlay"></div>
      )}

      <div className="mb-4 relative ml-4 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {eventsData.map(event => (
          <div key={event.id} className='events-inner mt-2 shadow bg-[#FAFAFA]'>
            <picture>
              <img src={event.imageSrc} alt="events" />
            </picture>
            <h3 className='p-4 text-md font-medium'>{event.title}</h3>
            <p className='number-font font-normal py-2 px-4'>{event.date}</p>
            <div className='py-4 text-end pr-2'>
              <a href="##" className='px-4 text-sm py-1 underline text-white font-medium bg-[#B4B4B3]'>বিস্তারিত</a>
            </div>
            <div className='flex mt-3 justify-end flex-wrap'>
              <button className='bg-[#EBE4D1] mr-2 text-black px-6 mb-2 py-1' onClick={() => handleUpdate()}>আপডেট</button>
              <button className='bg-[#CE5A67] mr-2 text-white px-6 mb-2 py-1' onClick={() => handleRemove()}>মুছুন</button>
            </div>
          </div>

        ))}
      </div>
      <div className='mb-4 cursor-pointer text-end mt-4 text-white'>
        <a href="##" onClick={handleModalOpen} className='bg-[#244c63ad] px-4 my-2 w-44 py-2 border'>নতুন সংযোগ </a>
      </div>



      {isModalOpen && (
        <div className="modal-container">
          <div className="modal shadow absolute top-10  bg-[#FFFFFF]  border p-14 max-w-96 ">
            <div className="modal-content">
              <span className="close cursor-pointer px-4 border bg-[#111] text-end py-1 text-white absolute right-2 top-2" onClick={handleModalClose}><a href="##">X</a></span>
              {/* form content goes here */}
              <div className='mt-10'>
                <form>
                  <div className="form-group flex flex-wrap my-2 items-center ">
                    <label htmlFor="title" className='pr-4 w-32'>ইভেন্টের নামঃ</label>
                    <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="ইভেন্টের নাম" />
                  </div>
                  <div className="form-group flex flex-wrap my-2 items-center ">

                    <label htmlFor="title" className='pr-4 w-32'>ইভেন্টের সম্পর্কেঃ</label>
                    <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="ইভেন্টের সম্পর্কে" />
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
                    <label htmlFor="image" className='pr-4 w-32'>ইমেজ URL</label>
                    <input src={selectedImage} type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

                  </div>
                  <div className="text-center mt-14 text-black">
                    <button type="submit" className='bg-[#c5dfe77a] px-12 py-4'>সংযোগ যোগ করুন</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>

  )
}

export default Events