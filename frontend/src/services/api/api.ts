import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    // withCredentials: true is important because we're using HTTP-only cookies.It tells the browser to include cookies with requests.
    withCredentials: true,
});
 

export default api;