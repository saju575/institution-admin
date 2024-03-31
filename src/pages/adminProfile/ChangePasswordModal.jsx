import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useMutation } from "react-query";
import * as Yup from "yup";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import { changePassword } from "../../utills/changePassword";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("সঠিক ইমেইল ঠিকানা নয়").required("ইমেইল প্রয়োজন"),

  oldPassword: Yup.string()
    .min(6, "পাসওয়ার্ড অবশ্যই 6 অক্ষরের বেশি হতে হবে")
    .required("পুরানো পাসওয়ার্ড প্রয়োজন"),

  newPassword: Yup.string()
    .min(6, "পাসওয়ার্ড অবশ্যই 6 অক্ষরের বেশি হতে হবে")
    .required("নতুন পাসওয়ার্ড প্রয়োজন"),
});

const ChangePasswordModal = ({ handleModalClose, email }) => {
  /* 
      mutation query
    */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: async () => {
      handleModalClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      email: email,
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
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
                <label htmlFor="email" className="pr-4">
                  ইমেইল
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ইমেইল"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  readOnly
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="oldPassword" className="pr-4">
                  পুরানো পাসওয়ার্ড
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="পুরানো পাসওয়ার্ড"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.oldPassword}
                />

                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <div className="text-red-500">
                    {formik.errors.oldPassword}
                  </div>
                )}
              </div>

              <div className="form-group flex flex-col gap-1 my-3">
                <label htmlFor="newPassword" className="pr-4">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  className="outline-none px-4 w-full py-2 bg-[#F3F3F3]"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="পুরানো পাসওয়ার্ড"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />

                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-500">
                    {formik.errors.newPassword}
                  </div>
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
                  {!isLoading ? "পাসওয়ার্ড পরিবর্তন করুন" : "Loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
