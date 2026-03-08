import axios from "axios";

const API = axios.create({
  baseURL: "https://leave-management-system-9rbd.onrender.com/api"
});

export default API;