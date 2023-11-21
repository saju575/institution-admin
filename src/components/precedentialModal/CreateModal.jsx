import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { createAdministrator } from "../../utills/createAdministrator";
import ErrorMsg from "../errorMsg/ErrorMsg";

/* 
    form validation schema
  */
const validationSchema = Yup.object({
  name: Yup.string().required("নাম অবশ্যই পূরণ করতে হবে"),
  position: Yup.string().required("পদ অবশ্যই পূরণ করতে হবে"),
  institution: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
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
  desc: Yup.string().optional(),
});

const CreateModal = ({
  handleModalClose,
  heading,
  position,
  type,
  keyword,
}) => {
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
      institution: "",
      position: position,
      phone: "",
      desc: "",
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

      // create new member
      await mutateAsync(formData);
    },
  });

  // formik object destructures
  const { errors, touched, values } = formik;
  return (
    <div className={`modal-container`}>
      <div className="modal shadow absolute top-10  bg-[#FFFFFF] p-6  border sm:p-14 w-[350px] sm:w-[600px] ">
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
                <label htmlFor="name" className="pr-4 w-full md:w-2/6">
                  নাম
                </label>
                <input
                  className="outline-none px-4 py-2 bg-[#F3F3F3] w-full md:w-2/3"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="নাম"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.name}
                />
              </div>

              {errors.name && formik.touched.name && (
                <h3 className="text-red-500">{errors.name}</h3>
              )}

              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="institution" className="pr-4 w-full md:w-2/6">
                  প্রতিষ্ঠানের নাম
                </label>
                <input
                  className="outline-none px-4 py-2 bg-[#F3F3F3] w-full md:w-2/3"
                  type="text"
                  id="institution"
                  name="institution"
                  placeholder="প্রতিষ্ঠানের নাম"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.institution}
                />
              </div>

              {errors.institution && formik.touched.institution && (
                <h3 className="text-red-500">{errors.institution}</h3>
              )}

              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="position" className="pr-4 w-full md:w-2/6">
                  পদ
                </label>
                <input
                  className="outline-none  px-4 py-2 bg-[#F3F3F3] w-full md:w-2/3 text-[#535353]"
                  readOnly
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
                <label htmlFor="phone" className="pr-4 w-full md:w-2/6">
                  মোবাইল নম্বর (Optional)
                </label>
                <input
                  className="outline-none  px-4 py-2 bg-[#F3F3F3] w-full md:w-2/3"
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

              <div className="form-group flex flex-wrap my-2 items-center">
                <label htmlFor="image" className="pr-4 w-full md:w-2/6">
                  ছবি
                </label>
                <input
                  className="w-full md:w-2/3"
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

              {/* message */}
              <div className="form-group flex flex-col my-2">
                <label htmlFor="desc" className="w-full ">
                  {heading.messageTitle} (Optional)
                </label>
                <div className="w-full">
                  <ReactQuill
                    className="h-64 mb-9 w-full"
                    id="desc"
                    name="desc"
                    value={formik.values.desc}
                    onChange={(value) => formik.setFieldValue("desc", value)}
                    placeholder={heading.messageTitle}
                  />
                </div>
              </div>
              {errors.desc && touched.desc && (
                <div className="text-red-500 mt-8">{errors.desc}</div>
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
                  {!isLoading ? "সংযোগ করুন" : "Loading..."}
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
