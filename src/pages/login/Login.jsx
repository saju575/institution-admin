import { useFormik } from "formik";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../providers/AuthProvider";
import { adminLogin } from "../../utills/adminLogin";
import "./Login.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { setUser, setIsLoading } = useContext(AuthContext);

  /* 
    react query
  */

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => adminLogin(data),
    onSuccess: async (data) => {
      setUser(data.payload.admin);
      setIsLoading(false);

      navigate(from, { replace: true });
    },
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      const data = {
        ...values,
      };
      await mutateAsync(data);
    },
  });

  return (
    <React.Fragment>
      <div
        id="login"
        className="flex flex-col justify-center items-center min-h-screen"
      >
        <div className="">
          {/* Login Form */}
          <div className="w-[350px] sm:w-[500px] bg-[#E8E8E8] py-14 px-4 sm:px-6 md:px-8 lg:px-10">
            <h3 className="text-center text-xl capitalize font-semibold mb-8">
              Login to your account
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
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="px-5 py-4 my-2 outline-none"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 mt-9 sm:mt-1">
                    {formik.errors.password}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full p-2 bg-[#79929C] text-white rounded hover:bg-blue-600 transition duration-300 ${
                    isLoading && "cursor-not-allowed"
                  }`}
                  disabled={isLoading ? true : false}
                >
                  Log In
                </button>

                {isError && error && (
                  <div className="mt-4 text-red-500 text-sm text-center">
                    {error.message}
                  </div>
                )}
                <p className="cursor-pointer underline capitalize text-lg font-medium text-end mt-4">
                  reset your password
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
