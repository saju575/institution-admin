import axios from "axios";

/* 
    create an instance of axios
*/
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default instance;
