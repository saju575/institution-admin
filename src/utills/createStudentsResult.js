import axios from "./axiosInstance";

/* 
  create  news
*/
export const createStudentsResult = async (data) => {
  try {
    const url = `/students-result/result`;

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
