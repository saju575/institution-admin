import React from 'react'
import './Teachers.css'

const Teachers = () => {
  const teachersData = [
    {
      name: 'মোঃ সোলাইমান হোসেন',
      designation: 'সহকারী অধ্যাপক',
      phone: '04161-354156',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ খলিলুর রহমান',
      designation: 'সাধারণ শিক্ষক',
      phone: '04161-354156',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ আব্দুর রহমান',
      designation: 'সাধারণ শিক্ষক',
      phone: '04161-354156',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ আলম আব্বাশী',
      designation: 'সাধারণ শিক্ষক',
      phone: '04161-354156',
      image: '/assets/profile.jpg',
    },
  ]

  const handleUpdate = (index) => {
    // Implement the update logic for the item at the given index
    console.log('Update clicked for index:', index);
  };

  const handleRemove = (index) => {
    // Implement the remove logic for the item at the given index
    console.log('Remove clicked for index:', index);
  };

  return (
    <React.Fragment>
      <div id="teachers">
        <div className="teachers-title mt-5">
          <h3 className='bg-[#79929C] text-white font-medium text-md p-4'>আমাদের শিক্ষক</h3>
        </div>
        <div className='teachers-card grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
          {teachersData.map((teacher, index) => (
            <div key={index} className="teachers-card p-4 bg-[#FFFFFF] shadow my-3 flex flex-col items-center">
              <div className='teachers-card-img my-4'>
                <picture>
                  <img src={teacher.image} alt="profile" />
                </picture>
              </div>
              <div className="teachers-card-identity">
                <h4 className='font-medium text-md'>{teacher.name}</h4>
                <h5>{teacher.designation}</h5>
                <h5>মোবাইলঃ {teacher.phone}</h5>
                <h6>দানারহাট আনছারিয়া ফাজিল মাদ্রাসা, ঠাকুরগাঁও</h6>
                <div className='flex justify-between mt-3'>
                  <button className='bg-[#244c63ad] text-white px-4 py-1' onClick={() => handleRemove(index)}>Remove</button>
                  <button className='bg-[#244c63ad] text-white px-4 py-1' onClick={() => handleUpdate(index)}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mb-4 cursor-pointer text-end mt-4 text-white'>
          <a href="##" className='bg-[#244c63ad] px-4 my-2 w-44 py-2 border'>নতুন সংযোগ </a>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Teachers