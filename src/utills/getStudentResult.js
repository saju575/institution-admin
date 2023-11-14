import axios from "./axiosInstance";

/* 
  create  news
*/
export const getStudentResult = async (data) => {
  try {
    const url = `/students-result/see-result`;

    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
