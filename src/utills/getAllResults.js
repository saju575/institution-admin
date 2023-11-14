import axios from "./axiosInstance";

/* 
    get results data
*/
export const getAllResults = async (queryKey = {}) => {
  const { page, limit, searchQuery, title, classTitle, examType, group, year } =
    queryKey;

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
  if (title) {
    queryParams.title = title;
  }
  if (examType) {
    queryParams.examType = examType;
  }
  if (group) {
    queryParams.group = group;
  }
  if (year) {
    queryParams.year = year;
  }
  if (classTitle) {
    queryParams.classTitle = classTitle;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/students-result/all?${queryString}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
