import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import SuccessMsg from "../../components/successMsg/SuccessMsg";
import { forgotPassword } from "../../utills/forgotPassword";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address required"),
});

const ForgotPassword = () => {
  /* 
    react query
  */

  const { mutateAsync, isLoading, isError, isSuccess, error } = useMutation({
    mutationFn: ({ url, data }) => forgotPassword(url, data),
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      await mutateAsync({ url: `/admin/forgot-password`, data: { ...values } });
    },
  });
  return (
    <div
      id="login"
      className="flex flex-col justify-center items-center min-h-screen"
    >
      <div className="">
        {/* Login Form */}
        <div className="w-[350px] sm:w-[500px] bg-[#E8E8E8] py-14 px-4 sm:px-6 md:px-8 lg:px-10">
          <h3 className="text-center text-xl capitalize font-semibold mb-8">
            Forget Password
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="login-innerFrom">
              <input
                type="email"
                name="email"
                id="email"
                className="px-5 py-4 my-2 outline-none"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 mt-9 sm:mt-1">
                  {formik.errors.email}
                </div>
              )}

              {/* submit btn */}
              <div className="text-center mt-6 text-black">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-12 py-4 ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "Submit" : "Loading..."}
                </button>
              </div>

              {isError && error && (
                <div className="mt-4 text-red-500 text-sm text-center">
                  {error.message}
                </div>
              )}

              {isSuccess && (
                <div className="mt-5">
                  <SuccessMsg
                    msg={`Go to your ${formik.values.email} to reset password`}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
