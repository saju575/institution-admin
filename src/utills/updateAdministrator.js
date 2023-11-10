import axios from "./axiosInstance";

export const updateAdminstratorInfo = async ({ id, updateData }) => {
  try {
    const url = `/administrator/update-info/${id}`;

    const response = await axios.put(url, updateData);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/* 
  update image
*/
export const updateAdministratorImage = async (data) => {
  try {
    const { id, updatedImage } = data;
    const url = `/administrator/update-image/${id}`;

    const response = await axios.patch(url, updatedImage, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
