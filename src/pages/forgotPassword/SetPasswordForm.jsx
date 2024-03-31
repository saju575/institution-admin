import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../components/spinner/Spinner";
import axios from "../../utills/axiosInstance";
import { forgotPassword } from "../../utills/forgotPassword";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

const SetPasswordForm = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  /* 
    react query
  */

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: ({ url, data }) => forgotPassword(url, data),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const {
    isLoading: isPageLoading,
    isSuccess: isPageSuccess,
    isError: isPageError,
  } = useQuery({
    queryKey: ["reset-password", { id, token }],
    queryFn: async () => {
      try {
        const url = `/admin/reset-password/${id}/verify/${token}`;
        const res = await axios.get(url);
        return res.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      await mutateAsync({
        url: `/admin/reset-password/${id}/verify/${token}`,
        data: { password: values.password },
      });
    },
  });

  return (
    <div
      id="login"
      className="flex flex-col justify-center items-center min-h-screen"
    >
      {isPageLoading && <Spinner />}

      {isPageSuccess && (
        <div className="">
          {/* Login Form */}
          <div className="w-[350px] sm:w-[500px] bg-[#E8E8E8] py-14 px-4 sm:px-6 md:px-8 lg:px-10">
            <h3 className="text-center text-xl capitalize font-semibold mb-8">
              Set New Password
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="login-innerFrom">
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

                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  className="px-5 py-4 my-2 outline-none"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />

                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-500 mt-9 sm:mt-1">
                      {formik.errors.confirmPassword}
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
              </div>
            </form>
          </div>
        </div>
      )}

      {isPageError && <h1>404 Not Found</h1>}
    </div>
  );
};

export default SetPasswordForm;
