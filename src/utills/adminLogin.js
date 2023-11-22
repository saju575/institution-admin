import axios from "./axiosInstance";

/* 
  create  products
*/
export const adminLogin = async (data) => {
  try {
    const url = `/admin/login`;

    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
