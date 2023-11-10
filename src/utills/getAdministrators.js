import axios from "./axiosInstance";

/* 
    get layoutdata
*/
export const getAdministrators = async (queryKey = {}) => {
  const { page, limit = 2, searchQuery, role, position, gender } = queryKey;

  // Create an object to hold the query parameters that are present
  const queryParams = {};

  // Add query parameters to the object if they are not undefined
  if (searchQuery) {
    queryParams.searchQuery = searchQuery;
  }
  if (page) {
    queryParams.page = page;
  }
  if (limit) {
    queryParams.limit = limit;
  }
  if (role) {
    queryParams.role = role;
  }
  if (position) {
    queryParams.position = position;
  }
  if (gender) {
    queryParams.gender = gender;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/administrator/all?${queryString}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/* 
  get single administrator
*/
export const getSingleAdministrator = async (id) => {
  try {
    const url = `/administrator/${id}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
