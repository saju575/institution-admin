import React, { useState } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const WaitingAdmission = () => {

  const [data, setData] = useState([
    { id: 1, date: '10 - 1 - 2023', content: 'ভর্তি অপেক্ষমান শিক্ষার্থীর তালিকা এক' },
    { id: 1, date: '10 - 1 - 2023', content: 'ভর্তি অপেক্ষমান শিক্ষার্থীর তালিকা দুই' },

  ]);

  const handleUpdate = (id) => {
    
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };


  return (
    <div id="classRoutine" className="my-4">
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
                  <button onClick={() => handleUpdate(row.id)}>
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
        <a href="##" className='bg-[#244c63ad] px-4 my-2 w-44 py-2 border'>নতুন সংযোগ </a>
      </div>
    </div>
  );
};

export default WaitingAdmission;
