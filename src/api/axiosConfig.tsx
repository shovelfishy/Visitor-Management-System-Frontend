import axios from "axios";

export default axios.create({
  baseURL: "https://morrisbymalaysia.com:9000/api/v1/",
});
