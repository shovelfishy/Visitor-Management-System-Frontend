import axios from "axios";

export default axios.create({
  baseURL: "https://api.edwardliew.xyz/api/v1/",
  // baseURL: "http://localhost:9000/api/v1/",
});
