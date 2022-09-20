import axios from "axios";

const baseUrl = axios.create({
  // baseURL: "https://ecommercenodeapi.glitch.me",
  baseURL: "http://localhost:8000",
});

export default baseUrl;
