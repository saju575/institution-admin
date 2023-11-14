const CheckResult = () => {
  return (
    <div className="mt-4">
      <h2 className="text-lg sm:text-xl text-white bg-[#244c63ad] py-4 pl-4">
        স্কুল রেজাল্ট
      </h2>

      {/* form */}
      <div className="max-w-md mx-auto p-4 bg-white my-8 shadow-lg">
        <form>
          <div className="mb-4">
            <label
              htmlFor="simpleInput"
              className="block text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="dropdown1"
              className="block text-sm font-medium text-gray-600"
            >
              Class:
            </label>
            <select
              id="dropdown1"
              name="dropdown1"
              className="mt-1 p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
              placeholder="Select Term"
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
            <label
              htmlFor="dropdown1"
              className="block text-sm font-medium text-gray-600"
            >
              Term:
            </label>
            <select
              id="dropdown1"
              name="dropdown1"
              className="mt-1 p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
              placeholder="Select Term"
            >
              <option value="option1">Choose Option</option>
              <option value="option2">Half Yearly Examination</option>
              <option value="option3">Final Examination</option>
              <option value="option4">Pre-Test Examination</option>
              <option value="option5">Test Examination</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="yearDropdown"
              className="block text-sm font-medium text-gray-600"
            >
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
    </div>
  );
};

export default CheckResult;
