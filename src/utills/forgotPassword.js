import axios from "./axiosInstance";

/* 
  create  administrator
*/
export const forgotPassword = async (url, data) => {
  try {
    let response;
    if (data) {
      response = await axios.post(url, data);
    } else {
      response = await axios.post(url);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
