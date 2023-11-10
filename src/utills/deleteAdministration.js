import axios from "./axiosInstance";

/* 
    delete administrator
*/
export const deleteAdministration = async (id) => {
  try {
    const url = `/administrator/${id}`;

    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
