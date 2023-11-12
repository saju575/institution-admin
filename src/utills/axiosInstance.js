import axios from "axios";

/* 
    create an instance of axios
*/
const instance = axios.create({
  baseURL: "https://institution-api.onrender.com/api/v1",
});

export default instance;
