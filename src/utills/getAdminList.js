import axios from "./axiosInstance";

/* 
    get news data
*/
export const getAdminList = async (queryKey = {}) => {
  const { page, limit, searchQuery, role } = queryKey;

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

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/admin/all?${queryString}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
