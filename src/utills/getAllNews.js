import axios from "./axiosInstance";

/* 
    get layoutdata
*/
export const getAllNews = async (queryKey = {}) => {
  const { page, limit, searchQuery, type, priority } = queryKey;

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
  if (type) {
    queryParams.type = type;
  }
  if (priority) {
    queryParams.priority = priority;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/news?${queryString}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
