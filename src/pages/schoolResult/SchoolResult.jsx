import React, { useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';

const SchoolResult = () => {

  const [data, setData] = useState([
    { id: 1, date: '10 - 1 - 2023', term: 'Half Yearly Examination', class: 'দশম', content: 'দশম শ্রেণির রেজাল্ট ২০২৩' },
  ]);

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <>
      <div className='bg-white px-4 py-2 my-4'>

        <h2 className='text-xl bg-[#244c63ad] py-4 text-center'>সিএসভি ফাইল আপলোড করুন</h2>
        {/* CSV File Area */}
        <div id="classRoutine" className="my-4">
          <div className="border vertical-scrollMain bg-[#DBE8E960]">
            <table className="border-collapse w-full vertical-scroll">

              <thead>
                <tr className="bg-[#BBCDCD60]">
                  <th className="p-2 text-start w-3/12">প্রকাশের তারিখ</th>
                  <th className="p-2 text-start w-4/12">নোটিশ</th>
                  <th className="p-2 text-start w-3/12">টার্ম</th>
                  <th className="p-2 text-start w-2/12">শ্রেণি</th>
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
            <a href="##" className='bg-[#244c63ad] px-4 my-2 w-44 py-2 border'>নতুন সংযোগ </a>
          </div>
        </div>
      </div>

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
              Term:
            </label>
            <select
              id="dropdown1"
              name="dropdown1"
              className="mt-1 p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm" placeholder='Select Term'
            >
              <option value="option1">Choose Option</option>
              <option value="option1">Half Yearly Examination</option>
              <option value="option2">Final Examination</option>
              <option value="option3">Pre-Test Examination</option>
              <option value="option3">Test Examination</option>
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
