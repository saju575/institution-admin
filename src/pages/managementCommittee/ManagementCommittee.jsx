import React from 'react'

const ManagementCommittee = () => {

  const managerData = [

    {
      name: 'মোঃ খলিলুর রহমান',
      designation: 'সাধারণ শিক্ষক',
      image: '/assets/profile.jpg',
      phone: '04161-354156',
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
    <div>
      <div id="teachers">
        <div className="teachers-title mt-5">
          <h3 className='bg-[#79929C] text-white font-medium text-md p-4'>পরিচালনা কমিটি</h3>
        </div>
        <div className='teachers-card grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
          {managerData.map((teacher, index) => (
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
    </div>
  )
}

export default ManagementCommittee