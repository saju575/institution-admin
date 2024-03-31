import axios from "./axiosInstance";

/* 
  create  administrator
*/
export const createAdmin = async (data) => {
  try {
    const url = `/admin/process-register`;

    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
