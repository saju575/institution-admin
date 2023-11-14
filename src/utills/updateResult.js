import axios from "./axiosInstance";

/* update result */
export const updateResult = async ({ id, updatedData }) => {
  try {
    const url = `/students-result/${id}`;

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
