import axios from "./axiosInstance";

/* 
  create  news
*/
export const createLayoutitem = async ({ url, data }) => {
  try {
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/* create institution informtion */

export const createInstitutionInfo = async ({ url, data }) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
