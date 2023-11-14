import axios from "./axiosInstance";

/* 
    delete news
*/
export const deleteItem = async (url) => {
  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
