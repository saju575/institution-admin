import axios from "./axiosInstance";

/* 
    get layout with type data
*/
export const getLayoutData = async (url) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
