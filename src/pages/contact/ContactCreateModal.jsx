import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import { createInstitutionInfo } from "../../utills/createLayoutItem";

/* 
    form validation schema
  */

const validationSchema = Yup.object({
  institution_name: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  location_name: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  institutionCode: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  EIIN: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  established: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  village: Yup.string(),
  district: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  upazila: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  email: Yup.string()
    .email("বৈধ ইমেইল ঠিকানা প্রদান করুন")
    .required("অবশ্যই পূরণ করতে হবে"),
  phone: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  website: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  map_link: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  postOffice: Yup.string().required("অবশ্যই পূরণ করতে হবে"),
  logo: Yup.mixed()
    .test("fileSize", "ছবির আকার ১ মেগাবাইটের কম হতে হবে", (value) => {
      if (value && value !== null) {
        return value.size <= 1048576; // 1 MB
      }
      return true; // allow empty or null
    })
    .test("fileType", "শুধুমাত্র ছবি আপলোড করুন", (value) => {
      if (value && value !== null) {
        return value.type.startsWith("image/");
      }
      return true; // allow empty or null
    })
    .optional(),
});

const ContactCreateModal = ({
  handleModalClose,
  type,
  keyword,
  heading,
  link,
}) => {
  /* 
    client query
  */
  const queryClient = useQueryClient();

  /* 
    mutation query
  */
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (value) => createInstitutionInfo(value),
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
      institution_name: "",
      location_name: "",
      institutionCode: "",
      EIIN: "",
      established: "",
      village: "",
      district: "",
      upazila: "",
      email: "",
      phone: "",
      website: "",
      map_link: "",
      postOffice: "",
      logo: undefined,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission logic here
      const data = new FormData();

      // Append  data to formData
      for (const key in values) {
        if (values[key]) {
          // check value existence
          data.append(key, values[key]);
        }
      }

      // add additional data to formData
      data.append("type", type);
      await mutateAsync({ url: link, data });
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
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              {/* name */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor="institution_name" className="sm:w-3/12">
                  {heading.institution_name}{" "}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="institution_name"
                    name="institution_name"
                    placeholder={heading.institution_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.institution_name}
                  />
                </div>
              </div>

              <div className="flex sm:justify-end">
                {formik.touched.institution_name &&
                  formik.errors.institution_name && (
                    <div className="text-red-500 sm:pl-2 sm:w-3/4">
                      {formik.errors.institution_name}
                    </div>
                  )}
              </div>

              {/* Location */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"location_name"} className="sm:w-3/12">
                  {heading.location_name}{" "}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="location_name"
                    name="location_name"
                    placeholder={heading.location_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location_name}
                  />
                </div>
              </div>

              <div className="flex sm:justify-end">
                {formik.touched.location_name &&
                  formik.errors.location_name && (
                    <div className="text-red-500 sm:pl-2 sm:w-3/4">
                      {formik.errors.location_name}
                    </div>
                  )}
              </div>

              {/* insttitution Code */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"institutionCode"} className="sm:w-3/12">
                  {heading.institutionCode}{" "}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="institutionCode"
                    name="institutionCode"
                    placeholder={heading.institutionCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.institutionCode}
                  />
                </div>
              </div>

              <div className="flex sm:justify-end">
                {formik.touched.institutionCode &&
                  formik.errors.institutionCode && (
                    <div className="text-red-500 sm:pl-2 sm:w-3/4">
                      {formik.errors.institutionCode}
                    </div>
                  )}
              </div>

              {/* EIIN  */}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"EIIN"} className="sm:w-3/12">
                  {heading.EIIN} <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="EIIN"
                    name="EIIN"
                    placeholder={heading.EIIN}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.EIIN}
                  />
                </div>
              </div>

              <div className="flex sm:justify-end">
                {formik.touched.EIIN && formik.errors.EIIN && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.EIIN}
                  </div>
                )}
              </div>
              {/* establish */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"established"} className="sm:w-3/12">
                  {heading.established} <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="established"
                    name="established"
                    placeholder={heading.established}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.established}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.established && formik.errors.established && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.established}
                  </div>
                )}
              </div>
              <hr className="my-10" />

              {/* village */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"village"} className="sm:w-3/12">
                  {heading.village} (Optional)
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="village"
                    name="village"
                    placeholder={heading.village}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.village}
                  />
                </div>
              </div>

              <div className="flex sm:justify-end">
                {formik.touched.village && formik.errors.village && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.village}
                  </div>
                )}
              </div>

              {/* district */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"district"} className="sm:w-3/12">
                  {heading.district} <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="district"
                    name="district"
                    placeholder={heading.district}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.district}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.district && formik.errors.district && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.district}
                  </div>
                )}
              </div>
              {/* upzila */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"upazila"} className="sm:w-3/12">
                  {heading.upazila} <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="upazila"
                    name="upazila"
                    placeholder={heading.upazila}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.upazila}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.upazila && formik.errors.upazila && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.upazila}
                  </div>
                )}
              </div>

              {/* post office */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"postOffice"} className="sm:w-3/12">
                  {heading.postOffice} <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="postOffice"
                    name="postOffice"
                    placeholder={heading.postOffice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postOffice}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.postOffice && formik.errors.postOffice && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.postOffice}
                  </div>
                )}
              </div>

              {/* email */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"email"} className="sm:w-3/12">
                  {heading.email}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="email"
                    name="email"
                    placeholder={heading.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              {/* phone */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"phone"} className="sm:w-3/12">
                  {heading.phone}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder={heading.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              {/* website link */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"website"} className="sm:w-3/12">
                  {heading.website}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="website"
                    name="website"
                    placeholder={heading.website}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.website}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.website && formik.errors.website && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.website}
                  </div>
                )}
              </div>
              <hr className="my-10" />

              {/* map link */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"map_link"} className="sm:w-3/12">
                  {heading.map_link}
                  <span className="text-red-600"> *</span>
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="text"
                    id="map_link"
                    name="map_link"
                    placeholder={heading.map_link_placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.map_link}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.map_link && formik.errors.map_link && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.map_link}
                  </div>
                )}
              </div>
              <hr className="my-8" />

              {/* logo */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label htmlFor={"logo"} className="sm:w-3/12">
                  {heading.logo} (Optional)
                </label>
                <div className="sm:w-3/4">
                  <input
                    className="outline-none border w-full px-4 mr-2 py-2 bg-[#F3F3F3]"
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    placeholder={heading.logo}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "logo",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex sm:justify-end">
                {formik.touched.logo && formik.errors.logo && (
                  <div className="text-red-500 sm:pl-2 sm:w-3/4">
                    {formik.errors.logo}
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

export default ContactCreateModal;
