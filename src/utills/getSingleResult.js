import axios from "./axiosInstance";

/* 
    get layoutdata
*/
export const getSingleResult = async (id) => {
  const url = `/students-result/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
