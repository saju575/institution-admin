import React, { useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RxCross2 } from 'react-icons/rx';


const AdmissionExamSyllabus = () => {

  const [data, setData] = useState([
    { id: 1, date: '10 - 1 - 2023', content: 'ভর্তি পরিক্ষার সিলেবাস ২০২৩' },
    { id: 1, date: '10 - 1 - 2023', content: 'ভর্তি পরিক্ষার সিলেবাস ২০২২' },
  ]);

  const handleUpdate = (id) => {

  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
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
    <>
      <div className="my-4">
        <div className="border vertical-scrollMain bg-[#DBE8E960]">
          <table className="border-collapse w-full vertical-scroll">

            <thead>
              <tr className="bg-[#BBCDCD60]">
                <th className="p-2 text-start w-3/12">প্রকাশের তারিখ</th>
                <th className="p-2 text-start w-5/12">নোটিশ</th>
                <th className="p-2 text-start w-2/12">ভিউ [PDF]</th>
                <th className="p-2 text-start w-2/12">ডাউনলোড [PDF]</th>
                <th className="p-2 text-start w-1/12">সম্পাদনা</th>
                <th className="p-2 text-start w-1/12">মুছুন</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b">
                  <div className="flex items-center pt-2">
                    <td className="p-2">
                      <i>
                        <BsFillCalendarDateFill />
                      </i>
                    </td>
                    <td className="py-2">{row.date}</td>
                  </div>
                  <td className="p-2">{row.content}</td>
                  <td className="p-2">
                    <a href={`#view-link-${row.id}`} className="flex items-center">
                      <i className="pr-1">
                        <AiFillEye />
                      </i>
                      View
                    </a>
                  </td>
                  <td className="p-2">
                    <a href={`#download-link-${row.id}`} className="py-2 flex items-center">
                      <i className="pr-1">
                        <PiDownloadSimpleBold />
                      </i>
                      Download
                    </a>
                  </td>
                  <td className="p-2">
                    <button onClick={() => { handleUpdate(row.id); handleModalOpen() }}>
                      <i>
                        <AiOutlineEdit />
                      </i>
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(row.id)}>
                      <i>
                        <AiOutlineDelete />
                      </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=' cursor-pointer text-end mt-4 text-white'>
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
                    <label htmlFor="title" className='pr-4 w-44'>ভর্তি পরিক্ষার টাইটেলঃ</label>
                    <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="ভর্তি পরিক্ষার টাইটেল" />
                  </div>
                  <div className="form-group flex flex-wrap my-2 items-center">
                    <label htmlFor="date" className='pr-4 w-44'>প্রকাশের তারিখঃ</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="তারিখ"
                      className='outline-none px-4 py-2 bg-[#F3F3F3]'
                    />
                  </div>

                  <div className="form-group my-4">
                    <label htmlFor="image" className='pr-4 w-32'>ভর্তি পরিক্ষার পিডিএফঃ</label>
                    <input type="file"
                      id="file"
                      name="file"
                      accept="image/*,.pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      selected={selectedImage}
                      onChange={handleFileChange} />
                  </div>

                  {/* Add Content Button */}
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
    </>
  );
};

export default AdmissionExamSyllabus;
