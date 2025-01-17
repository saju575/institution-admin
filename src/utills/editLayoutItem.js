import axios from "./axiosInstance";

/* 
  create  news
*/
export const editLayoutitem = async ({ url, data }) => {
  try {
    const response = await axios.put(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/* edit institution info */
export const editInstitutionInfo = async ({ url, data }) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
