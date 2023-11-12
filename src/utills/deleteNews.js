import axios from "./axiosInstance";

/* 
    delete news
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

/* 
    delete news image or pdf
*/
export const deleteNewsFile = async ({ id, type }) => {
  try {
    const url = `/news/deleteFile/${id}/${type}`;

    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
