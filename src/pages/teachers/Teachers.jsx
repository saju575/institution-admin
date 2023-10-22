import React from 'react'
import './Teachers.css'

const Teachers = () => {
  const teachersData = [
    {
      name: 'মোঃ সোলাইমান হোসেন',
      designation: 'সহকারী অধ্যাপক',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ খলিলুর রহমান',
      designation: 'সাধারণ শিক্ষক',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ আব্দুর রহমান',
      designation: 'সাধারণ শিক্ষক',
      image: '/assets/profile.jpg',
    },
    {
      name: 'মোঃ আলম আব্বাশী',
      designation: 'সাধারণ শিক্ষক',
      image: '/assets/profile.jpg',
    },
  ]

  return (
    <React.Fragment>
      <div id="teachers">
        <div className="teachers-title mt-5">
          <h3 className='bg-[#79929C] text-white font-medium text-md p-4'>আমাদের শিক্ষক</h3>
        </div>
        <div className='teachers-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
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
                <h6>দানারহাট আনছারিয়া ফাজিল মাদ্রাসা, ঠাকুরগাঁও</h6>
              </div>
            </div>
          ))}
        </div>
         
      </div>
    </React.Fragment>
  )
}

export default Teachers