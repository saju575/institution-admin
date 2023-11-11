import axios from "./axiosInstance";

/* 
    delete administrator
*/
export const deleteNews = async (id) => {
  try {
    const url = `/news/delete/${id}`;

    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
