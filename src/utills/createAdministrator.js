import axios from "./axiosInstance";

/* 
  create  administrator
*/
export const createAdministrator = async (data) => {
  try {
    const url = `/administrator/`;

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
