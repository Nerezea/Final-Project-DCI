import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5050/api",
  headers: {
    token: localStorage.getItem("token"),
  },
});

api.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.reload();
  }

  if (error.response?.data?.message)
    return Promise.reject(error.response.data.message);
  return Promise.reject(error);
});

export default api;



