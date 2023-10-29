import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AimAndObjective = () => {

  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };


  const AimAndObjective = [
    "আমাদের শিক্ষা প্রতিষ্ঠানের লক্ষ্য হলো শিক্ষার মাধ্যমে শিক্ষার্থীদের জ্ঞান এবং আদর্শ প্রশাসন তৈরি করা, যাতে তারা সমৃদ্ধ, সৃজনশীল, সম্পর্কশীল এবং সমাজে দায়িত্বশীল নাগরিক হতে পারে। আমাদের স্কুল একটি গতিশীল এবং ব্যাপক শিক্ষা প্রতিষ্ঠান, যা একটি আদর্শ উপস্থিতিতে অবস্থিত আছে একটি আদর্শ উপনগরে। এটি একটি শান্তিপূর্ণ পরিবেশ প্রদান করে, যেখানে বিভিন্ন সংস্কৃতির ছাত্র-ছাত্রী শিক্ষার পথে অগ্রগতি করতে পারে। আমাদের শিক্ষক দল প্রতিশ্রুতিশীল এবং উচ্চ যোগ্যতাসম্পন্ন, যারা বিজ্ঞান থেকে শিল্প প্রস্থান পর্যন্ত বিভিন্ন শাখা সম্পর্কে সম্পূর্ণ জ্ঞান দেওয়ার চেষ্টা করে। আমরা আমাদের ছাত্র-ছাত্রীদেরকে নৈতিক মৌল্য, সম্মান, সমরাস এবং সঠিক মানবিক মূল্যের প্রতি প্রশাসন করতে শেখাই। আমরা শিক্ষা প্রদানের মাধ্যমে তাদের জ্ঞান, দক্ষতা এবং সম্পর্কবিপ্লবে প্রস্তুত করে তোলার চেষ্টা করি, যা তাদেরকে প্রযুক্তিগত ও নৈতিক দিকে সমৃদ্ধ ব্যক্তিত্ব হিসেবে পরিণত করতে সাহায্য করে।"
  ]


  return (
    <React.Fragment>
      <div id="aboutUs" className='bg-[#FFFFFF80] '>
        <div className="aboutUS-title">
          <h3 className='bg-[#79929C] text-white font-medium text-md mt-4 py-4 pl-4'>প্রতিষ্ঠানের লক্ষ্য ও উদ্দেশ্য</h3>
          {AimAndObjective.map((text, index) => (
            <li className='py-2 list-none mx-2' key={index}>
              <div className='currentNewsList my-2 flex justify-between flex-wrap'>
                <p>{text}</p>
                <button className='bg-[#CE5A67] text-white px-4 mt-2 py-1'>মুছুন</button>
              </div>
            </li>
          ))}

          <div className='my-4 flex flex-col mt-8'>
            <h4 className='font-semibold text-lg underline'>নতুন সংযোগ করুন</h4>

            {/* Text Area to add news */}
            <div className=' my-10 '>
              <ReactQuill className='h-44' value={text} onChange={handleChange} />
            </div>

            <div className="mt-4 text-black">
            <button type="submit" className='bg-[#c5dfe77a] px-6 py-2 mb-2'>আপডেট করুন</button>
          </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AimAndObjective