import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";

import * as Yup from "yup";
import ErrorMsg from "../../../components/errorMsg/ErrorMsg";
import { getStudentResult } from "../../../utills/getStudentResult";
import MarksSheet from "./MarksSheet";

const validationSchema = Yup.object().shape({
  roll: Yup.string().required("রোল প্রয়োজন"),
  classTitle: Yup.string().required("ক্লাসের নাম নির্বাচন করুন"),
  examType: Yup.string().required("পরীক্ষার ধরণ নির্বাচন করুন"),
  section: Yup.string().required("শাখা নির্বাচন করুন"),

  year: Yup.number().required("বছর নির্বাচন করুন"),

  group: Yup.string(),
});

const CheckResult = () => {
  const [isShowResult, setIsShowResult] = useState(false);

  /* handleShowResult */
  const handleShowResult = (value) => {
    setIsShowResult(() => value);
  };
  /* 
      mutation query
    */
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    data: result,
  } = useMutation({
    mutationFn: (data) => getStudentResult(data),
    onSuccess: async () => {
      setIsShowResult(true);
    },
  });

  /* form input value */
  const formik = useFormik({
    initialValues: {
      roll: "",
      classTitle: "",
      examType: "",
      section: "",
      group: "",
      year: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      const data = {};

      // Append  data to formData
      for (const key in values) {
        if (values[key]) {
          // check value existence
          data[key] = values[key];
        }
      }

      if (!values.group) {
        data["group"] = "None";
      }

      await mutateAsync(data);
    },
    validate: (values) => {
      const errors = {};
      if (
        ["নবম", "দশম", "আলিম ১ম", "আলিম ২য়", "ফাজিল"].includes(
          values.classTitle
        )
      ) {
        if (!values.group) {
          errors.group = "বিভাগ নির্বাচন করুন";
        } else if (!["বিজ্ঞান", "কলা", "বাণিজ্য"].includes(values.group)) {
          errors.group = "বৈধ বিভাগ নির্বাচন করুন";
        }
      } else {
        // If classTitle is not in the specified list, set group to an empty string
        values.group = "";
      }
      return errors;
    },
  });

  return (
    <div>
      <h2 className="text-lg sm:text-xl text-white bg-[#244c63ad] py-4 pl-4">
        স্কুল রেজাল্ট
      </h2>

      {/* form */}
      {!isShowResult && (
        <div className="flex justify-center">
          <div className="w-[330px] sm:w-[500px]  p-4 bg-white my-8 shadow-lg">
            <form onSubmit={formik.handleSubmit}>
              {/* title */}
              <div className="form-group flex flex-col gap-1 my-3">
                <label
                  htmlFor="roll"
                  className="block text-sm font-medium text-gray-600"
                >
                  ছাত্র রোল
                </label>
                <input
                  type="text"
                  id="roll"
                  name="roll"
                  className="mt-1 p-2 block w-full border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                  placeholder="ছাত্র রোল"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.roll}
                />

                {formik.touched.roll && formik.errors.roll && (
                  <div className="text-red-500">{formik.errors.roll}</div>
                )}
              </div>

              {/* class name */}
              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="classTitle" className="block">
                  ক্লাস
                </label>
                <select
                  id="classTitle"
                  name="classTitle"
                  className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                  placeholder="ক্লাস"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.classTitle}
                >
                  <option value="">ক্লাসের নাম নির্বাচন করুন</option>
                  <option value="প্রথম">প্রথম</option>
                  <option value="দ্বিতীয়">দ্বিতীয়</option>
                  <option value="তৃতীয়">তৃতীয়</option>
                  <option value="চতুর্থ">চতুর্থ</option>
                  <option value="পঞ্চম">পঞ্চম</option>
                  <option value="ষষ্ঠ">ষষ্ঠ</option>
                  <option value="সপ্তম">সপ্তম</option>
                  <option value="অষ্টম">অষ্টম</option>
                  <option value="নবম">নবম</option>
                  <option value="দশম">দশম</option>
                  {/* Madrasah part */}
                  <option value="আলিম ১ম">আলিম ১ম</option>
                  <option value="আলিম ২য়">আলিম ২য়</option>
                  <option value="ফাজিল">ফাজিল</option>
                </select>

                {formik.touched.classTitle && formik.errors.classTitle && (
                  <div className="text-red-500">{formik.errors.classTitle}</div>
                )}
              </div>

              {/* exam type */}
              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="examType" className="block">
                  পরীক্ষার ধরন
                </label>
                <select
                  id="examType"
                  name="examType"
                  className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                  placeholder="পরীক্ষার ধরন"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.examType}
                >
                  <option value={""}>পরীক্ষার ধরন নির্বাচন করুন</option>
                  <option value={"Half Yearly Examination"}>
                    Half Yearly Examination
                  </option>
                  <option value={"Final Examination"}>Final Examination</option>
                  <option value={"Pre-Test Examination"}>
                    Pre-Test Examination
                  </option>
                  <option value={"Test Examination"}>Test Examination</option>
                </select>

                {formik.touched.examType && formik.errors.examType && (
                  <div className="text-red-500">{formik.errors.examType}</div>
                )}
              </div>

              {/* section */}

              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="section" className="block ">
                  {"শাখা"}
                </label>
                <select
                  id="section"
                  name="section"
                  className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                  placeholder="Select section"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.section}
                >
                  <option value={""}>শাখা নির্বাচন করুন</option>
                  <option value={"A"}>A</option>
                  <option value={"B"}>B</option>
                  <option value={"C"}>C</option>
                  <option value={"D"}>D</option>
                  <option value={"E"}>E</option>
                  <option value={"F"}>F</option>
                  <option value={"None"}>None</option>
                </select>

                {formik.touched.section && formik.errors.section && (
                  <div className="text-red-500">{formik.errors.section}</div>
                )}
              </div>

              {/* group */}
              {["নবম", "দশম", "আলিম ১ম", "আলিম ২য়", "ফাজিল"].includes(
                formik.values.classTitle
              ) && (
                <div className="mb-4 flex flex-col gap-1 my-3">
                  <label htmlFor="group" className="block ">
                    {"বিভাগ"}
                  </label>
                  <select
                    id="group"
                    name="group"
                    className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                    placeholder="Select group"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.group}
                  >
                    <option value={""}>বিভাগ নির্বাচন করুন</option>
                    <option value={"বিজ্ঞান"}>বিজ্ঞান</option>
                    <option value={"কলা"}>কলা</option>
                    <option value={"বাণিজ্য"}>বাণিজ্য</option>
                  </select>

                  {formik.touched.group && formik.errors.group && (
                    <div className="text-red-500">{formik.errors.group}</div>
                  )}
                </div>
              )}

              {/* year */}
              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="year" className="block ">
                  বছর (2018-2035)
                </label>
                <select
                  id="year"
                  name="year"
                  className="bg-[#F3F3F3] mt-1 p-2 block w-full border outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                >
                  <option value={""}>বছর নির্বাচন করুন</option>
                  {Array.from({ length: 17 }, (_, index) => {
                    const year = 2018 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>

                {formik.touched.year && formik.errors.year && (
                  <div className="text-red-500">{formik.errors.year}</div>
                )}
              </div>

              {/* Global error message */}
              {isError && (
                <div className="mt-3">
                  <ErrorMsg msg={error.message} />
                </div>
              )}

              {/* submit btn */}
              <div className="text-center mt-8 text-black">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-12 py-4 ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "ফলাফল দেখুন" : "Loadding..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MarksSheet */}
      {isShowResult && result && (
        <MarksSheet result={result.payload} handleResult={handleShowResult} />
      )}
    </div>
  );
};

export default CheckResult;
