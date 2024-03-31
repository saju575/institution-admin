import { useFormik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useMutation } from "react-query";
import * as Yup from "yup";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import { createAdmin } from "../../utills/createAdmin";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("নাম প্রয়োজন"),
  email: Yup.string().email("সঠিক ইমেইল ঠিকানা নয়").required("ইমেইল প্রয়োজন"),

  password: Yup.string()
    .min(6, "পাসওয়ার্ড অবশ্যই 6 অক্ষরের বেশি হতে হবে")
    .required("পাসওয়ার্ড প্রয়োজন"),
});

const CreateAdminModal = ({ handleModalClose }) => {
  /* 
      mutation query
    */
  const { mutateAsync, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: (data) => createAdmin(data),
    onSuccess: async () => {
      //   handleModalClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      values["role"] = "admin";

      await mutateAsync(values);
    },
  });

  return (
    <div className="modal-container">
      <div className="modal shadow w-[350px] sm:w-[500px] absolute top-10  bg-[#FFFFFF]  border p-14  ">
        <div className="modal-content ">
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
              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="name" className="pr-4">
                  নাম
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="নাম"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />

                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>

              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="email" className="pr-4">
                  ইমেইল
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="password" className="pr-4">
                  পাসওয়ার্ড
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="পাসওয়ার্ড"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
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
                  {!isLoading ? "অ্যাডমিন তৈরি করুন" : "Loading..."}
                </button>
              </div>
            </form>
            {isSuccess && (
              <div className="mt-5">
                <SuccessMsg
                  msg={`Go to your ${formik.values.email} to activate account`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
