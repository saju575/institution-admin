import axios from "./axiosInstance";

/* 
    get layoutdata
*/
export const getNews = async (id) => {
  const url = `/news/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
