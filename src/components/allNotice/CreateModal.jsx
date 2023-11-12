import { useFormik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { createNews } from "../../utills/createNews";
import ErrorMsg from "../errorMsg/ErrorMsg";

/* validation form field */
const validationSchema = Yup.object({
  title: Yup.string().required("শিরোনাম অবশ্যই পূরণ করতে হবে"),
  priority: Yup.string()
    .required("Priority is required")
    .oneOf(["general", "urgent"]),
  pdf: Yup.mixed()
    .test("fileSize", "PDF ফাইলের আকার অবশ্যই 9 MB এর কম হতে হবে", (value) => {
      if (!value) return true; // If no file is provided, skip the size check
      return value.size <= 9 * 1024 * 1024; // 9 MB in bytes
    })
    .optional(),
  image: Yup.mixed()
    .test("fileSize", "ছবির ফাইলের আকার অবশ্যই 9 MB এর কম হতে হবে", (value) => {
      if (!value) return true; // If no file is provided, skip the size check
      return value.size <= 9 * 1024 * 1024; // 9 MB in bytes
    })
    .optional(),
  desc: Yup.string().optional(),
});

/* components */
const CreateModal = ({
  handleModalClose,
  type,
  heading,
  keyword,
  setPriority,
}) => {
  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
      mutation query
    */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => createNews(data),
    onSuccess: async () => {
      queryClient.invalidateQueries(); // invalidate
      handleModalClose();
    },
  });
  /* formik state for form field */
  const formik = useFormik({
    initialValues: {
      title: "",
      priority: setPriority || "general",
      pdf: undefined,
      image: undefined,
      desc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      const formData = new FormData();

      // Append  data to formData
      for (const key in values) {
        if (values[key]) {
          // check value existence
          formData.append(key, values[key]);
        }
      }

      // add additional data to formData
      formData.append("type", type);

      await mutateAsync(formData);
    },
  });

  /* return component */
  return (
    <div className="modal-container">
      <div className="modal shadow absolute top-10  bg-[#FFFFFF] p-6  border sm:p-14 w-[350px] sm:w-[600px]">
        <div className="modal-content">
          <span
            className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2"
            onClick={handleModalClose}
          >
            <span>
              <i className="py-8 text-2xl ">
                <RxCross2 />
              </i>
            </span>
          </span>
          {/* form content goes here */}
          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="title" className="pr-4 w-44">
                  {heading.title}:
                </label>
                <input
                  className="outline-none px-4 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="title"
                  name="title"
                  placeholder={heading.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </div>

              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500">{formik.errors.title}</div>
              )}

              <div className="form-group flex flex-wrap my-2 items-center">
                <label htmlFor="priority" className="pr-4 w-44">
                  Priority:
                </label>
                <select
                  className="border outline-none px-4 py-1  bg-[#F3F3F3]"
                  id="priority"
                  name="priority"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.priority}
                >
                  <option value="general">সাধারণ</option>
                  <option value="urgent">জরুরী</option>
                </select>
              </div>

              {formik.touched.priority && formik.errors.priority && (
                <div className="text-red-500">{formik.errors.priority}</div>
              )}

              <div className="form-group my-4">
                <label htmlFor="pdf" className="pr-4 w-32">
                  {heading.pdf}(ঐচ্ছিক):
                </label>
                <input
                  type="file"
                  id="pdf"
                  name="pdf"
                  accept=".pdf"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("pdf", file);
                    }
                  }}
                />
              </div>

              {formik.touched.pdf && formik.errors.pdf && (
                <div className="text-red-500">{formik.errors.pdf}</div>
              )}

              <div className="form-group my-4">
                <label htmlFor="image" className="pr-4 w-32">
                  {heading.img}(ঐচ্ছিক):
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("image", file);
                    }
                  }}
                />
              </div>

              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500">{formik.errors.image}</div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="desc">{heading.desc}(ঐচ্ছিক):</label>
                <ReactQuill
                  className="h-44 mb-9"
                  id="desc"
                  value={formik.values.desc}
                  onChange={(value) => formik.setFieldValue("desc", value)}
                />
              </div>

              {formik.touched.desc && formik.errors.desc && (
                <div className="text-red-500">{formik.errors.desc}</div>
              )}

              {isError && (
                <div className="mt-3">
                  <ErrorMsg msg={error.message} />
                </div>
              )}
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

export default CreateModal;
