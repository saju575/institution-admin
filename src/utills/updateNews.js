import axios from "./axiosInstance";

/* update news info */
export const updateNewsInfo = async ({ id, updatedData }) => {
  try {
    const url = `/news/update-info/${id}`;

    const response = await axios.put(url, updatedData);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/* update image or pdf */
export const updateNewsImageOrPdf = async ({ id, updatedData }) => {
  try {
    const url = `/news/update-file/${id}`;

    const response = await axios.put(url, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
