import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { createAdministrator } from "../../utills/createAdministrator";
import ErrorMsg from "../errorMsg/ErrorMsg";
import styles from "./modal.module.css";

/* 
    form validation schema
  */
const validationSchema = Yup.object({
  name: Yup.string().required("নাম অবশ্যই পূরণ করতে হবে"),
  position: Yup.string().required("পদ অবশ্যই পূরণ করতে হবে"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "মোবাইল নম্বর সঠিক নয়")
    .optional(),
  image: Yup.mixed()
    .required("ছবি অবশ্যই আপলোড করতে হবে")
    .test("fileSize", "ফাইল অত্যন্ত বড় (সর্বাধিক 3 MB)", (value) => {
      if (value) {
        return value.size <= 3145728; // 3 MB in bytes (1024 * 1024 * 3)
      }
      return true;
    }),
});

/* 
  components
*/
const CreateModal = ({ handleModalClose, type, institution, keyword }) => {
  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
    mutation query
  */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => createAdministrator(data),
    onSuccess: async () => {
      queryClient.invalidateQueries(keyword); // invalidate
      handleModalClose();
    },
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      name: "",
      position: "",
      phone: "",
      image: null,
    },
    validationSchema,
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

      formData.append("role", type);
      formData.append("institution", institution);

      // create new member
      await mutateAsync(formData);
    },
  });

  // formik object destructures
  const { errors, touched, values } = formik;

  return (
    <div className={`${styles.modal_container}`}>
      <div className="modal shadow absolute top-10  bg-[#FFFFFF]  border p-14 max-w-96 ">
        <div className="modal-content">
          <span
            className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2"
            onClick={handleModalClose}
          >
            <i className=" py-8 text-2xl ">
              <RxCross2 />
            </i>
          </span>

          {/* form content goes here */}
          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="title" className="pr-4 w-32">
                  নামঃ
                </label>
                <input
                  className="outline-none px-4 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="নাম"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.name}
                />
              </div>

              {errors.name && formik.touched && (
                <h3 className="text-red-500">{errors.name}</h3>
              )}

              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="title" className="pr-4 w-32">
                  পদঃ
                </label>
                <input
                  className="outline-none  px-4 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="position"
                  name="position"
                  placeholder="পদ"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.position}
                />
              </div>

              {errors.position && touched.position && (
                <div className="text-red-500">{errors.position}</div>
              )}

              <div className="form-group flex flex-wrap my-2 items-center">
                <label htmlFor="date" className="pr-4 w-32">
                  মোবাইল নম্বরঃ
                </label>
                <input
                  className="outline-none  px-4 py-2 bg-[#F3F3F3]"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="মোবাইল নম্বর(Optional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.phone}
                />
              </div>

              {errors.phone && touched.phone && (
                <div className="text-red-500">{errors.phone}</div>
              )}

              <div className="form-group my-4">
                <label htmlFor="image" className="pr-4 w-32">
                  ছবিঃ
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </div>

              {errors.image && touched.image && (
                <div className="text-red-500">{errors.image}</div>
              )}

              {formik.values.image && (
                <div className="flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(formik.values.image)}
                    alt="Preview"
                    className="mt-2 max-w-full max-h-40"
                  />
                </div>
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
