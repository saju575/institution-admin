import React from 'react'
import './DetailEvents.css'

const DetailEvents = () => {

  const eventsDataDetails = [
    {
      id: 1,
      title: 'শিক্ষা উৎসব প্রতিযোগিতা',
      date: '১২ ডিসেম্বর ২০২২',
      imageSrc: '/assets/events.jpg',
      description: 'এটি একটি শিক্ষা মেলা যেখানে শিক্ষার্থীরা প্রতিযোগিতায় অংশ নেয়। প্রতিযোগিতা বিভিন্ন শিক্ষা ক্ষেত্রে হয়, যেমন নৃত্য, গান, ভাষণ, শিক্ষা প্রদর্শনী, ইংরেজি বই পাঠ, গণিত প্রতিযোগিতা ইত্যাদি। প্রতিযোগিতায় পার্টিসিপেট করতে শিক্ষার্থীদের মধ্যে উৎসাহ ও প্রতিশ্রুতি বৃদ্ধি দেয়া হয়। প্রতিযোগিতায় জয়ী হওয়া শিক্ষার্থীদের বিশেষ পুরস্কার দেয়া হয় যা তাদের প্রয়োজনীয় সাহায্য ও সাহায্য করতে সাহায্য করে। এই প্রতিযোগিতা শিক্ষা মেলা সাজানোর জন্য আয়োজিত হয় যা শিক্ষার্থীদের সামাজিক ও শৈক্ষিক দক্ষতা বৃদ্ধি করে। এই উৎসবে অংশ নেওয়া শিক্ষার্থীদের মধ্যে স্নেহ, সম্মান এবং পরস্পরের সহানুভূতি বৃদ্ধি দেয়া হয়। শিক্ষা উৎসব প্রতিবছর আয়োজিত হয় এবং এটি শিক্ষা মেলার একটি গুরুত্বপূর্ণ অংশ হয়ে উঠেছে। এই প্রতিযোগিতায় অংশ নেওয়া শিক্ষার্থীরা তাদের দক্ষতা ও শিক্ষার জোর প্রদর্শন করতে পারে এবং তাদের সাফল্য উদ্দিপন্ন করতে পারে। এই প্রতিযোগিতায় অংশ নেওয়া শিক্ষার্থীদের মাঝে মেলবন্ধন ও সহযোগিতা বৃদ্ধি দেয়া হয়।. শিক্ষা উৎসব প্রতিবছর শিক্ষার্থীদের মধ্যে উৎসাহ, আগ্রহ, ও প্রতিস্থাপন প্রদর্শন করে এবং তাদের প্রতিভা বৃদ্ধি দেয়।'
    },
  ];


  return (
    <React.Fragment>
      <div id="detailEvents" className='mt-4'>
        <div className="detailEvents-title">
          <h3 className='bg-[#79929C] text-white font-medium text-md p-4'>ইভেন্টস</h3>
        </div>
        {eventsDataDetails.map(event => (
          <div key={event.id} className='bg-[#FFFFFF]'>
            <picture>
              <img src={event.imageSrc} alt='' />
            </picture>
            <h3 className='p-4 text-md font-medium'>{event.title}</h3>
            <p className='number-font font-normal py-2 px-4'>{event.date}</p>
            <p className='text-md number-font font-normal py-2 px-4 shadow'>{event.description}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default DetailEvents