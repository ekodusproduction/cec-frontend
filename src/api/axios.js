import axios from "axios";

export default axios.create({
  baseURL: "http://139.59.83.187/",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
    // You can add any common headers here
  },
});
