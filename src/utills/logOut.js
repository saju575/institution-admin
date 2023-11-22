import axios from "./axiosInstance";

/* 
  create  products
*/
export const adminLogout = async (data) => {
  try {
    const url = `/admin/logout`;

    const response = await axios.post(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
