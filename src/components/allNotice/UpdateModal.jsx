import { useFormik } from "formik";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { deleteItem } from "../../utills/deleteItem";
import { getNews } from "../../utills/getNews";
import { updateNewsImageOrPdf, updateNewsInfo } from "../../utills/updateNews";
import ErrorMsg from "../errorMsg/ErrorMsg";
import SuccessMsg from "../successMsg/SuccessMsg";

/* validation form field */
const validationInfoSchema = Yup.object({
  title: Yup.string().required("শিরোনাম অবশ্যই পূরণ করতে হবে"),
  priority: Yup.string()
    .required("Priority is required")
    .oneOf(["general", "urgent"]),

  desc: Yup.string().optional(),
});

/* validation image schema */
const imageValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("ছবি প্রয়োজন")
    .test("fileSize", "ছবি ফাইলের আকার অবশ্যই 9 MB এর কম হতে হবে", (value) => {
      if (!value) return true; // No file is also valid
      return value.size <= 9000000; // 9MB in bytes
    })
    .test("fileType", "শুধুমাত্র ছবি অনুমোদিত", (value) => {
      if (!value) return true; // No file is also valid
      return value && value.type.startsWith("image/");
    }),
});

/* validation pdf schema */
const pdfValidationSchema = Yup.object().shape({
  pdf: Yup.mixed()
    .required("PDF প্রয়োজন")
    .test("fileSize", "PDF ফাইলের আকার অবশ্যই 9 MB এর কম হতে হবে", (value) => {
      if (!value) return true; // No file is also valid
      return value.size <= 9000000; // 9MB in bytes
    })
    .test("fileType", "শুধুমাত্র পিডিএফ ফাইল অনুমোদিত", (value) => {
      if (!value) return true; // No file is also valid
      return value && value.type === "application/pdf";
    }),
});

/* components */
const UpdateModal = ({ handleModalClose, id, heading }) => {
  /* Initial state with 5 objects
    -> That contains the 3 form global error and global success state
    -> that comes from server
  */

  const [statusArray, setStatusArray] = useState([
    { isError: false, isSuccess: false },
    { isError: false, isSuccess: false },
    { isError: false, isSuccess: false },
    { isError: false, isSuccess: false },
    { isError: false, isSuccess: false },
  ]);

  // Function to update the state for a particular object
  const updateStatus = (index, isError, isSuccess) => {
    setStatusArray((prevStatusArray) => {
      // Create a new array based on the previous state
      const newArray = [...prevStatusArray];
      // Update the specific object
      newArray[index] = { isError, isSuccess };
      // Return the new array to update the state
      return newArray;
    });
  };

  /* 
    fetch the particular id data
  */
  const {
    data: news,
    refetch,
    isSuccess: isNewsSuccess,
  } = useQuery({
    queryFn: () => getNews(id),
    queryKey: ["single news", { id }],
  });
  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
    data mutation
  */
  const {
    mutateAsync: infoMutation,
    isLoading: isInfoLoading,
    isError: isInfoError,
    error: infoError,
    isSuccess: isInfoSuccess,
  } = useMutation({
    mutationFn: (data) => updateNewsInfo(data),
    onSuccess: async () => {
      updateStatus(0, false, true);

      queryClient.invalidateQueries();
      refetch();
      //   handleModalClose();
    },
    onError: async () => {
      updateStatus(0, true, false);
    },
  });

  /*  pdf mutation */
  const {
    mutateAsync: pdfMutation,
    isLoading: isPdfLoading,
    isSuccess: isPdfSuccess,
    error: pdfError,
    isError: isPdfError,
  } = useMutation({
    mutationFn: (data) => updateNewsImageOrPdf(data),
    onSuccess: async () => {
      updateStatus(1, false, true);
      queryClient.invalidateQueries();
      refetch();
    },
    onError: async () => {
      updateStatus(1, true, false);
    },
  });

  /* image mutation */
  const {
    mutateAsync: imageMutation,
    isLoading: isImgLoading,
    isSuccess: isImgSuccess,
    isError: isImageError,
    error: imageError,
  } = useMutation({
    mutationFn: (data) => updateNewsImageOrPdf(data),
    onSuccess: async () => {
      updateStatus(2, false, true);

      queryClient.invalidateQueries();
      refetch();
    },
    onError: async () => {
      updateStatus(2, true, false);
    },
  });

  /* pdf delete */
  const {
    mutateAsync: pdfDeleteMutation,
    isLoading: isPdfDeleteLoading,
    isSuccess: isPdfDeleteSuccess,
    isError: isPdfDeleteError,
    error: pdfDeleteError,
  } = useMutation({
    mutationFn: (data) =>
      deleteItem(`/news/deleteFile/${data.id}/${data.type}`),
    onSuccess: async () => {
      updateStatus(3, false, true);

      queryClient.invalidateQueries();
      refetch();
    },
    onError: async () => {
      updateStatus(3, true, false);
    },
  });

  /* image delete */
  const {
    mutateAsync: imageDeleteMutation,
    isLoading: isImageDeleteLoading,
    isSuccess: isImageDeleteSuccess,
    isError: isImageDeleteError,
    error: imageDeleteError,
  } = useMutation({
    mutationFn: (data) =>
      deleteItem(`/news/deleteFile/${data.id}/${data.type}`),
    onSuccess: async () => {
      updateStatus(4, false, true);

      queryClient.invalidateQueries();
      refetch();
    },
    onError: async () => {
      updateStatus(4, true, false);
    },
  });
  /* change status */

  /* formik state for update info form field */
  const infoFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: news?.payload?.title || "",
      priority: news?.payload?.priority || "general",

      desc: news?.payload?.desc || "",
    },
    validationSchema: validationInfoSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      updateStatus(0, false, false);
      let updatedData = {};

      // Append  data to new object
      for (const key in values) {
        if (values[key]) {
          updatedData[key] = values[key]; // check for value existence
        }
      }

      await infoMutation({ id, updatedData });
    },
  });

  /* formik state for update img form field */
  const imgFormik = useFormik({
    initialValues: {
      image: undefined,
    },
    validationSchema: imageValidationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      updateStatus(2, false, false);
      updateStatus(4, false, false);

      // create form data
      const updatedData = new FormData();
      updatedData.append("image", values["image"]);

      await imageMutation({ id, updatedData });
    },
  });

  /* formik state for update pdf form field */
  const pdfFormik = useFormik({
    initialValues: {
      pdf: undefined,
    },
    validationSchema: pdfValidationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      updateStatus(1, false, false);
      updateStatus(3, false, false);

      //create form data
      const updatedData = new FormData();
      updatedData.append("pdf", values["pdf"]);

      await pdfMutation({ id, updatedData });
    },
  });

  /* delete image handler */
  const deleteImageHandler = async () => {
    updateStatus(2, false, false);
    updateStatus(4, false, false);
    const data = { id, type: "image" };
    await imageDeleteMutation(data);
  };

  /* delete pdf handler */
  const deletePdfHandler = async () => {
    updateStatus(1, false, false);
    updateStatus(3, false, false);
    const data = { id, type: "pdf" };
    await pdfDeleteMutation(data);
  };

  /* return component */
  return (
    <div className="modal-container">
      <div className="modal shadow absolute top-10  bg-[#FFFFFF] p-6  border sm:p-14 w-[350px] sm:w-[600px] ">
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
            {/* info update form */}
            <form onSubmit={infoFormik.handleSubmit}>
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
                  onChange={infoFormik.handleChange}
                  onBlur={infoFormik.handleBlur}
                  value={infoFormik.values.title}
                  onFocus={() => updateStatus(0, false, false)}
                />
              </div>

              {infoFormik.touched.title && infoFormik.errors.title && (
                <div className="text-red-500">{infoFormik.errors.title}</div>
              )}

              <div className="form-group flex flex-wrap my-2 items-center">
                <label htmlFor="priority" className="pr-4 w-44">
                  Priority:
                </label>
                <select
                  className="border outline-none px-4 py-1  bg-[#F3F3F3]"
                  id="priority"
                  name="priority"
                  onChange={infoFormik.handleChange}
                  onBlur={infoFormik.handleBlur}
                  value={infoFormik.values.priority}
                  onFocus={() => updateStatus(0, false, false)}
                >
                  <option value="general">সাধারণ</option>
                  <option value="urgent">জরুরী</option>
                </select>
              </div>

              {infoFormik.touched.priority && infoFormik.errors.priority && (
                <div className="text-red-500">{infoFormik.errors.priority}</div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="desc">{heading.desc}(ঐচ্ছিক):</label>
                <ReactQuill
                  className="h-44 mb-9"
                  id="desc"
                  value={infoFormik.values.desc}
                  onChange={(value) => {
                    infoFormik.setFieldValue("desc", value);
                    updateStatus(0, false, false);
                  }}
                />
              </div>

              <div className="mt-14">
                {infoFormik.touched.desc && infoFormik.errors.desc && (
                  <div className="text-red-500">{infoFormik.errors.desc}</div>
                )}

                {/* error message */}
                {isInfoError && statusArray[0].isError && (
                  <div className="mt-3">
                    <ErrorMsg msg={infoError.message} />
                  </div>
                )}

                {/* success mssage */}
                {isInfoSuccess && statusArray[0].isSuccess && (
                  <div className="mt-3">
                    <SuccessMsg msg="Info update successfully" />
                  </div>
                )}

                {/* submit btn */}
                <div className="text-center mt-6 text-black">
                  <button
                    type="submit"
                    className={`bg-[#c5dfe77a] px-12 py-4 ${
                      isInfoLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isInfoLoading}
                  >
                    {!isInfoLoading ? "আপডেট করুন" : "Loadding..."}
                  </button>
                </div>
              </div>
            </form>

            {/* pdf update form */}
            <form onSubmit={pdfFormik.handleSubmit}>
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
                      pdfFormik.setFieldValue("pdf", file);
                    }
                  }}
                  onFocus={() => {
                    updateStatus(1, false, false);
                    updateStatus(3, false, false);
                  }}
                />
              </div>

              {pdfFormik.touched.pdf && pdfFormik.errors.pdf && (
                <div className="text-red-500">{pdfFormik.errors.pdf}</div>
              )}

              {/* show error */}
              {isPdfError && statusArray[1].isError && (
                <div className="mt-3">
                  <ErrorMsg msg={pdfError.message} />
                </div>
              )}

              {/* show success message */}
              {isPdfSuccess && statusArray[1].isSuccess && (
                <div className="mt-3">
                  <SuccessMsg msg="Pdf updated successfully" />
                </div>
              )}

              {/* show delete error */}
              {isPdfDeleteError && statusArray[3].isError && (
                <div className="mt-3">
                  <ErrorMsg msg={pdfDeleteError.message} />
                </div>
              )}

              {/* show delete success message */}
              {isPdfDeleteSuccess && statusArray[3].isSuccess && (
                <div className="mt-3">
                  <SuccessMsg msg="Pdf deleted successfully" />
                </div>
              )}

              {/* submit btn */}
              <div className="text-center mt-6 text-black flex justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-6 py-4 ${
                    isPdfLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isPdfLoading}
                >
                  {!isPdfLoading ? "আপডেট করুন" : "Loadding..."}
                </button>

                {isNewsSuccess && news?.payload?.pdf?.url && (
                  <span
                    className={`bg-[#c5dfe77a] px-7 py-4 ml-2 ${
                      isPdfDeleteLoading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={isPdfDeleteLoading}
                    onClick={deletePdfHandler}
                  >
                    {!isPdfDeleteLoading ? "PDF মুছুন" : "Loadding..."}
                  </span>
                )}
              </div>
            </form>

            {/* image update form */}

            <form onSubmit={imgFormik.handleSubmit}>
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
                      imgFormik.setFieldValue("image", file);
                    }
                  }}
                  onFocus={() => {
                    updateStatus(2, false, false);
                    updateStatus(4, false, false);
                  }}
                />
              </div>

              {imgFormik.touched.image && imgFormik.errors.image && (
                <div className="text-red-500">{imgFormik.errors.image}</div>
              )}

              {/* show error */}
              {isImageError && statusArray[2].isError && (
                <div className="mt-3">
                  <ErrorMsg msg={imageError.message} />
                </div>
              )}

              {/* show success message */}
              {isImgSuccess && statusArray[2].isSuccess && (
                <div className="mt-3">
                  <SuccessMsg msg="Image updated successfully" />
                </div>
              )}

              {/* show delete error */}
              {isImageDeleteError && statusArray[4].isError && (
                <div className="mt-3">
                  <ErrorMsg msg={imageDeleteError.message} />
                </div>
              )}

              {/* show delete success message */}
              {isImageDeleteSuccess && statusArray[4].isSuccess && (
                <div className="mt-3">
                  <SuccessMsg msg="Image deleted successfully" />
                </div>
              )}

              {/* submit btn */}
              <div className="text-center mt-6 text-black flex justify-center items-center">
                <button
                  type="submit"
                  className={`bg-[#c5dfe77a] px-6 py-4 ${
                    isImgLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={isImgLoading}
                >
                  {!isImgLoading ? "আপডেট করুন" : "Loadding..."}
                </button>

                {isNewsSuccess && news?.payload?.image?.url && (
                  <span
                    className={`bg-[#c5dfe77a] px-7 py-4 ml-2 ${
                      isImageDeleteLoading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={isImageDeleteLoading}
                    onClick={deleteImageHandler}
                  >
                    {!isImageDeleteLoading ? "IMAGE মুছুন" : "Loadding..."}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
