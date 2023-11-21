import { useFormik } from "formik";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import { getSingleAdministrator } from "../../utills/getAdministrators";
import {
  updateAdministratorImage,
  updateAdminstratorInfo,
} from "../../utills/updateAdministrator";
import ErrorMsg from "../errorMsg/ErrorMsg";

/* 
form validation schema
*/
const validationSchema = Yup.object({
  name: Yup.string().required("নাম অবশ্যই পূরণ করতে হবে"),
  institution: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  position: Yup.string().required("পদ অবশ্যই পূরণ করতে হবে"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "মোবাইল নম্বর সঠিক নয়")
    .optional(),
});

/* 
  components
*/
const UpdateModal = ({ handleModalClose, id }) => {
  /* 
    fetch the particular id data
  */
  const { data, refetch } = useQuery({
    queryFn: () => getSingleAdministrator(id),
    queryKey: ["single administrator", { id }],
  });

  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
    data mutation
  */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => updateAdminstratorInfo(data),
    onSuccess: async () => {
      queryClient.invalidateQueries();
      refetch();
      handleModalClose();
    },
  });

  /* 
    image mutation
  */
  const { mutateAsync: imageMutated } = useMutation({
    mutationFn: (data) => updateAdministratorImage(data),
    onSuccess: async () => {
      queryClient.invalidateQueries();
      refetch();
    },
  });

  /* 
      form filed with initial value 
    */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.payload?.name || "",
      institution: data?.payload?.institution || "",
      position: data?.payload?.position || "",
      phone: data?.payload?.phone || "",
    },

    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here

      let updateData = {};

      // Append  data to new object
      for (const key in values) {
        if (values[key]) {
          updateData[key] = values[key]; // check for value existence
        }
      }

      await mutateAsync({ id, updateData });
    },
  });

  // destructure formik object
  const { errors, touched, values } = formik;

  // image update handler
  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    const updatedImage = new FormData(); //using form data
    updatedImage.append("image", selectedImage);
    await imageMutated({ id, updatedImage }); // update image
  };

  return (
    <div className="modal-container">
      <div className="modal shadow absolute top-10  bg-[#FFFFFF] p-6  border sm:p-14 w-[350px] sm:w-[600px]">
        <div className="modal-content">
          <span
            className="close cursor-pointer border bg-[#111] px-4 text-end py-1 text-white absolute right-2 top-2"
            onClick={handleModalClose}
          >
            <i className=" py-8 text-2xl ">
              <RxCross2 />
            </i>
          </span>

          <div className="mt-10">
            {/* Image content goes here */}
            <div className="flex flex-col justify-center items-center mb-6">
              <div className="relative  border-2 border-dashed border-slate-300 rounded-lg  w-48 h-48">
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept="image/*" // accept only the image
                  className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  title="Try to upload photos..."
                  onChange={handleImageChange}
                />
                <div className="h-full w-full   gap-y-1">
                  {data?.payload?.image?.url ? (
                    <img
                      alt="placeholder"
                      src={data?.payload?.image?.url}
                      className="object-cover w-48 h-48"
                    />
                  ) : (
                    <img
                      alt="placeholder"
                      src="/assets/profile.jpg"
                      className="object-cover w-48 h-48"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* form content goes here */}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group flex flex-wrap my-2 items-center ">
                <label htmlFor="title" className="pr-4 w-full md:w-2/6">
                  নামঃ
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
                <label htmlFor="title" className="pr-4  w-full md:w-2/6">
                  পদঃ
                </label>
                <input
                  className="outline-none  px-4 py-2 bg-[#F3F3F3] w-full md:w-2/3"
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
                <label htmlFor="date" className="pr-4  w-full md:w-2/6">
                  মোবাইল নম্বরঃ
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

              {/* Global error section */}
              {isError && (
                <div className="mt-3">
                  <ErrorMsg msg={error.message} />
                </div>
              )}

              {/* Button section */}
              <div className="text-center mt-14 text-black">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-12 py-4 ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "আপডেট তথ্য" : "Loading..."}
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
