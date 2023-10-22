import React from 'react'
import './Notice.css'

const Notice = () => {
  const notices = [
    {
      date: '৩, নভেম্বর',
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


  return (
    <React.Fragment>
      <div className='py-5 bg-[#FFFFFF] mt-4 shadow-lg'>
          {notices.map((notice, index) => (
            <div className='bg-[#F1EFEF] flex m-2 cursor-pointer items-center' key={index}>
              <div className='notice-date flex items-center justify-center py-2 flex-col text-center text-white bg-[#79929C]'>
                <h5 className='border-b number-font'>{notice.date}</h5>
                <h5 className='number-font'>{notice.year}</h5>
              </div>
              <div className='items-center flex px-4 py-2 notice-desc'>
                <h4>{notice.description}</h4>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  )
}

export default Notice