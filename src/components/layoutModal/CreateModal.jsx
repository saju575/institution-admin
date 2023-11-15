import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { createLayoutitem } from "../../utills/createLayoutItem";
import ErrorMsg from "../errorMsg/ErrorMsg";

/* 
    form validation schema
  */
const validationSchema = Yup.object({
  desc: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
});

/* 
  components
*/
const CreateModal = ({ handleModalClose, type, keyword, heading, link }) => {
  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
    mutation query
  */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (value) => createLayoutitem(value),
    onSuccess: async () => {
      queryClient.invalidateQueries(keyword); // invalidate query
      handleModalClose();
    },
  });

  /* 
    form filed with initial value 
  */
  const formik = useFormik({
    initialValues: {
      desc: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here

      const val = {
        url: link,
        data: {
          type,
          desc: values.desc,
        },
      };

      await mutateAsync(val);
    },
  });

  return (
    <div className={`modal-container`}>
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

          {/* form content goes here */}
          <div className="mt-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="desc">{heading.title}:</label>
                <ReactQuill
                  className="h-64 mb-9"
                  id="desc"
                  name="desc"
                  value={formik.values.desc}
                  onChange={(value) => formik.setFieldValue("desc", value)}
                />

                {formik.touched.desc && formik.errors.desc && (
                  <div className="text-red-500 mt-9 sm:mt-1">
                    {formik.errors.desc}
                  </div>
                )}
              </div>

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
