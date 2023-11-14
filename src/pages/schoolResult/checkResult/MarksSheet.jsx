import { calculateGrade } from "../../../utills/calculateGrade";
import styles from "./marksSheet.module.css";
const MarksSheet = ({ result, handleResult }) => {
  const { classTitle, examType, section, group, year, results } = result;

  return (
    <div className="flex">
      <div className="container mx-auto px-4 pb-4">
        <div
          id="logoArea"
          class={`py-5 px-4 sm:block md:flex lg:flex items-center justify-between bg-[#FFFFFF] ${styles.logoArea}`}
        >
          <div className="flex items-center">
            <picture className="pr-5 max-[767px]:pr-0">
              <img
                src="/assets/logo.png"
                alt="logo"
                className="w-16 h-16 md:w-24 md:h-24"
              />
            </picture>
            <div>
              <h2 className="max-[767px]:text-xl md:text-2xl font-semibold mt-2">
                দানারহাট আনছারিয়া ফাজিল মাদ্রাসা
              </h2>
              <h4 className="max-[767px]:text-sm md:text-lg">
                ডাকঘরঃ ঠাকুরগাঁও, জেলাঃ ঠাকুরগাঁও
              </h4>
            </div>
          </div>
          <div className="text-end">
            <h3 className="text-lg max-[767px]:text-sm max-[767px]:pt-4">
              EIIN: 165878
            </h3>
            <h3 className="text-lg max-[767px]:text-sm">
              স্থাপিতঃ <span className="number-font"> ১৯৫২ ইং </span>
            </h3>
            <h3 className="text-lg max-[767px]:text-sm">
              প্রতিষ্ঠানের কোড: 4587655
            </h3>
          </div>
        </div>

        {/* <!-- Title --> */}
        <div class={`${styles.marksheetTitle}`}>
          <h1 className="my-8 text-xl p-4 text-center font-semibold">
            মার্কশীট
          </h1>
        </div>

        {/* <!-- Students Details --> */}
        <div class={`${styles.studentDetailsTable}`}>
          {/* <!-- title --> */}
          <h4 className="underline font-semibold text-lg my-2">
            স্টুডেন্ট ইনফোরমেশন
          </h4>
          <table className="table-auto w-full">
            <tr className="bg-white">
              <td className="font-semibold pr-4 w-2/12">নামঃ</td>
              <td>{results.name}</td>
            </tr>
            <tr className="mb-2 bg-white">
              <td className="font-semibold pr-4">রোলঃ</td>
              <td className="number-font">{results.roll}</td>
            </tr>
            <tr className="mb-2 bg-white">
              <td className="font-semibold pr-4">পরীক্ষাঃ</td>
              <td>{examType}</td>
            </tr>
            <tr className="mb-2 bg-white">
              <td className="font-semibold pr-4">শ্রেনীঃ</td>
              <td>{classTitle}</td>
            </tr>

            {section !== "None" && (
              <tr className="mb-2 bg-white">
                <td className="font-semibold pr-4">শাখা</td>
                <td>{section}</td>
              </tr>
            )}

            {group !== "None" && (
              <tr className="mb-2 bg-white">
                <td className="font-semibold pr-4">বিভাগ</td>
                <td>{group}</td>
              </tr>
            )}

            <tr className="mb-2 bg-white">
              <td className="font-semibold pr-4">বছর</td>
              <td>{year}</td>
            </tr>

            {results.GPA && (
              <tr className="mb-2 bg-white">
                <td className="font-semibold pr-4">GPA</td>
                <td>{results.GPA}</td>
              </tr>
            )}
          </table>
        </div>

        {/* <!-- Marksheet Part --> */}
        <div class={`${styles.marksheetMainPart} mt-10`}>
          <h4 className="underline font-semibold text-lg my-2">মার্কশীট</h4>
          <table className="w-full bg-white">
            {/* <!-- title --> */}

            {/* <!-- Head --> */}
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left">
                  ক্রমিক নম্বর
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left">সাবজেক্ট</th>
                <th className="px-6 py-3 bg-gray-100 text-left">মার্ক</th>
                <th className="px-6 py-3 bg-gray-100 text-left">গ্রেড</th>
              </tr>
            </thead>

            {/* <!-- Body --> */}

            <tbody>
              {Object.keys(results.subjects).map(
                (subject, index) =>
                  // Skip rendering if the key is "_id"
                  subject !== "_id" && (
                    <tr key={index}>
                      <td className="px-6 py-4 w-2/12">{index + 1}</td>
                      <td className="px-6 py-4">{subject}</td>
                      <td className="px-6 py-4">{results.subjects[subject]}</td>
                      <td className="px-6 py-4">
                        {calculateGrade(results.subjects[subject])}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        {/* submit btn */}
        <div className="text-center mt-8 text-black">
          <button
            onClick={() => handleResult(false)}
            type="button"
            className={`bg-[#c5dfe77a] px-12 py-4 ${"cursor-pointer"}`}
          >
            অন্য ফলাফল দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksSheet;
