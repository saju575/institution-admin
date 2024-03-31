import axios from "./axiosInstance";

/* 
  create  products
*/
export const changePassword = async (data) => {
  try {
    const url = `/admin/change-password`;

    const response = await axios.put(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
