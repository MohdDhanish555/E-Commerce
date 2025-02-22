import axios from "axios";

const http = axios.create({
  baseURL: "https://fakestoreapi.in/api",
});

export default http;
