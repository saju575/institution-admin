import { useFormik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import ErrorMsg from "../../../components/errorMsg/ErrorMsg";
import { getSingleResult } from "../../../utills/getSingleResult";
import { updateResult } from "../../../utills/updateResult";
//   group: Yup.string().optional(),

const validationSchema = Yup.object().shape({
  title: Yup.string().required("শিরোনাম প্রয়োজন"),
  classTitle: Yup.string().required("ক্লাসের নাম নির্বাচন করুন"),
  examType: Yup.string().required("পরীক্ষার ধরণ নির্বাচন করুন"),
  section: Yup.string().required("শাখা নির্বাচন করুন"),

  year: Yup.number().required("বছর নির্বাচন করুন"),

  xlxFile: Yup.mixed()
    .nullable()
    .test("fileFormat", "কেবল XLSX ফাইল অনুমোদিত", (value) => {
      if (value && value.type) {
        const acceptedFormats = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];
        return acceptedFormats.includes(value.type);
      }
      return true; // Allow validation to pass for null values (no file selected)
    }),

  group: Yup.string(),
});

const UpdateModal = ({ handleModalClose, id, heading, keyword }) => {
  /* 
    fetch the particular id data
  */
  const { data, refetch } = useQuery({
    queryFn: () => getSingleResult(id),
    queryKey: ["single result", { id }],
  });

  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
      mutation query
    */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => updateResult(data),
    onSuccess: async () => {
      refetch();
      queryClient.invalidateQueries(keyword); // invalidate
      handleModalClose();
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.payload?.title || "",
      classTitle: data?.payload?.classTitle || "",
      examType: data?.payload?.examType || "",
      section: data?.payload?.section || "",
      group: data?.payload?.group === "None" ? "" : data?.payload?.group || "",
      year: data?.payload?.year || "",
      xlxFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here

      const updatedData = new FormData();

      // Append  data to formData
      for (const key in values) {
        if (values[key]) {
          // check value existence
          updatedData.append(key, values[key]);
        }
      }
      if (!values.group) {
        updatedData.append("group", "None");
      }

      const data = { id, updatedData };
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
          errors.group = "গ্রুপ নির্বাচন করুন";
        } else if (!["বিজ্ঞান", "কলা", "বাণিজ্য"].includes(values.group)) {
          errors.group = "বৈধ গ্রুপ নির্বাচন করুন";
        }
      } else {
        // If classTitle is not in the specified list, set group to an empty string
        values.group = "";
      }
      return errors;
    },
  });
  //   console.log(formik.errors);
  return (
    <div className="modal-container">
      <div className="modal shadow absolute top-10  bg-[#FFFFFF]  border p-14  ">
        <div className="modal-content md:w-[400px]">
          <span
            className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2"
            onClick={handleModalClose}
          >
            <i className="py-8 text-2xl ">
              <RxCross2 />
            </i>
          </span>

          {/* form content goes here */}
          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              {/* title */}
              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="title" className="block">
                  {heading.title}
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder={heading.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />

                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500">{formik.errors.title}</div>
                )}
              </div>

              {/* class name */}
              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="classTitle" className="block">
                  {heading.class}
                </label>
                <select
                  id="classTitle"
                  name="classTitle"
                  className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                  placeholder={heading.class}
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
                  {heading.term}
                </label>
                <select
                  id="examType"
                  name="examType"
                  className="bg-[#F3F3F3] mt-1 bg- p-2 block w-full border outline-none shadow-sm  focus:border-indigo-500 sm:text-sm"
                  placeholder="Select examType"
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

              {/* file */}
              <div className="mb-4 flex flex-col gap-1 my-3">
                <label htmlFor="xlxFile" className="pr-4">
                  এক্সেল ফাইল(Optional)
                </label>
                <input
                  className="bg-[#F3F3F3] mt-1 p-2 block w-full border outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="file"
                  id="xlxFile"
                  name="xlxFile"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("xlxFile", file);
                    }
                  }}
                />

                {formik.touched.xlxFile && formik.errors.xlxFile && (
                  <div className="text-red-500">{formik.errors.xlxFile}</div>
                )}
              </div>

              {/* Global error message */}
              {isError && (
                <div className="mt-3">
                  <ErrorMsg msg={error.message} />
                </div>
              )}

              {/* submit btn */}
              <div className="text-center mt-14 text-black">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-12 py-4 ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "সংযোগ করুন" : "Loadding..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
