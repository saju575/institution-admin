import React, { useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SchoolResult = () => {

  const [data, setData] = useState([
    {
      id: 1,
      date: '10 - 1 - 2023',
      term: 'Half Yearly Examination',
      class: 'দশম',
      content: 'দশম শ্রেণির রেজাল্ট ২০২৩'
    },
  ]);

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
    <>
      <div className='bg-white px-4 mt-4'>

        <h2 className='text-xl text-white bg-[#244c63ad] py-4 text-center'>সিএসভি ফাইল আপলোড করুন</h2>
        
        {/* CSV File Area */}
        <div id="classRoutine" className="my-4">
          <div className="border vertical-scrollMain bg-[#DBE8E960]">
            <table className="border-collapse w-full vertical-scroll">

              <thead>
                <tr className="bg-[#BBCDCD60]">
                  <th className="p-2 text-start w-2/12">প্রকাশের তারিখ</th>
                  <th className="p-2 text-start w-4/12">নোটিশ</th>
                  <th className="p-2 text-start w-3/12">টার্ম</th>
                  <th className="p-2 text-start w-1/12">শ্রেণি</th>
                  <th className="p-2 w-2/12">সম্পাদনা</th>
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
                    <td className="p-2">{row.term}</td>
                    <td className="p-2">
                      {row.class}
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={handleModalOpen}>
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
      </div>


    {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal shadow absolute top-10  bg-[#FFFFFF]  border p-14  ">
            <div className="modal-content">
              <span className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2" onClick={handleModalClose}><a href="##"><i className=' py-8 text-2xl '><RxCross2 /></i></a></span>
              {/* form content goes here */}
              <div className='mt-10'>
                <form>
                  <div className="form-group flex flex-wrap my-2 items-center ">
                    <label htmlFor="title" className='pr-4 w-32'> ফাইল এর নামঃ</label>
                    <input className='outline-none px-4 py-2 bg-[#F3F3F3]' type="text" id="title" name="title" placeholder="সিএসভি ফাইল এর নাম" />
                  </div>

                  <div className="mb-4 flex flex-wrap items-center">
                    <label htmlFor="dropdown1" className="block  w-32">
                      টার্ম:
                    </label>
                    <select
                      id="dropdown1"
                      name="dropdown1"
                      className="bg-[#F3F3F3] mt-1 bg- p-2 block w-2/4 border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm" placeholder='Select Term'
                    >
                      <option value="option1">Choose Option</option>
                      <option value="option1">Half Yearly Examination</option>
                      <option value="option2">Final Examination</option>
                      <option value="option3">Pre-Test Examination</option>
                      <option value="option3">Test Examination</option>
                    </select>
                  </div>

                  <div className="mb-4 flex flex-wrap ">
                    <label htmlFor="dropdown1" className="block w-32">
                      Class:
                    </label>
                    <select
                      id="dropdown1"
                      name="dropdown1"
                      className="bg-[#F3F3F3] mt-1 bg- p-2 block w-2/4 border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm" placeholder='Select Term'
                    >
                      <option value="option1">Choose Option</option>
                      <option value="option2">প্রথম</option>
                      <option value="option3">দিতীয়</option>
                      <option value="option4">চতুর্থ</option>
                      <option value="option5">পঞ্চম</option>
                      <option value="option6">ষষ্ঠ</option>
                      <option value="option7">সপ্তম</option>
                      <option value="option8">অষ্টম</option>
                      <option value="option9">নবম</option>
                      <option value="option10">দশম</option>
                      {/* Madrasah part */}
                      <option value="option11">আলিম ১ম</option>
                      <option value="option12">আলিম ২য়</option>
                      <option value="option12">ফাজিল</option>

                    </select>
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
                    <label htmlFor="image" className='pr-4 w-32'>সিএসভি ফাইল</label>
                    <input src={selectedImage} type="file" id="image" name="image" accept="image/*,.pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"onChange={handleImageChange} />

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
      {isModalOpen && (
        <div className="overlay"></div>
      )}


      {/* Student Result Area */}
      <div className="max-w-md mx-auto p-4 bg-white my-8 shadow-lg">
        <form>
          <div className="mb-4">
            <label htmlFor="simpleInput" className="block text-sm font-medium text-gray-600">
              Student ID:
            </label>
            <input
              type="text"
              id="simpleInput"
              name="simpleInput"
              className="mt-1 p-2 block w-full border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
              placeholder="Enter your ID here"
            />
          </div>


          <div className="mb-4">
            <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">
              Class:
            </label>
            <select
              id="dropdown1"
              name="dropdown1"
              className="mt-1 p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm" placeholder='Select Term'
            >
              <option value="option1">Choose Option</option>
              <option value="option2">প্রথম</option>
              <option value="option3">দিতীয়</option>
              <option value="option4">চতুর্থ</option>
              <option value="option5">পঞ্চম</option>
              <option value="option6">ষষ্ঠ</option>
              <option value="option7">সপ্তম</option>
              <option value="option8">অষ্টম</option>
              <option value="option9">নবম</option>
              <option value="option10">দশম</option>
              {/* Madrasah part */}
              <option value="option11">আলিম ১ম</option>
              <option value="option12">আলিম ২য়</option>
              <option value="option12">ফাজিল</option>

            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dropdown1" className="block text-sm font-medium text-gray-600">
              Term:
            </label>
            <select
              id="dropdown1"
              name="dropdown1"
              className="mt-1 p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm" placeholder='Select Term'
            >
              <option value="option1">Choose Option</option>
              <option value="option2">Half Yearly Examination</option>
              <option value="option3">Final Examination</option>
              <option value="option4">Pre-Test Examination</option>
              <option value="option5">Test Examination</option>
            </select>
          </div>


          <div className="mb-4">
            <label htmlFor="yearDropdown" className="block text-sm font-medium text-gray-600">
              Session (2008-2024)
            </label>
            <select
              id="yearDropdown"
              name="yearDropdown"
              className="mt-1 p-2 block w-full border outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {Array.from({ length: 17 }, (_, index) => {
                const year = 2008 + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-1 border border-transparent font-medium text-white  bg-[#79929C] hover:bg-[#B5C8C8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

    </>

  );
};

export default SchoolResult;
