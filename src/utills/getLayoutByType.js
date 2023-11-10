import axios from "./axiosInstance";

/* 
    get layoutdata
*/
export const getLayoutByType = async (type) => {
  const url = `/layout/?type=${type}`;
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
