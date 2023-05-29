import axios from "axios";

export default axios.create({
  // create baseURL if process.env.REACT_APP_BACKEND_URL is set
  ...(process.env.REACT_APP_BACKEND_URL && {
    baseURL: process.env.REACT_APP_BACKEND_URL,
  }),
  headers: {
    "Content-Type": "application/json",
  },
});
