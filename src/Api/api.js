import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const axiosInstance = axios.create({
  baseURL: "http://192.168.8.218:8080/api/",
  headers,
});
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return {
      ...config,
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
const getFunc = (url, config = {}) => axiosInstance.get(url, config);
const postFunc = (url, data, config = {}) =>
  axiosInstance.post(url, data, config);
const putFunc = (url, data, config = {}) =>
  axiosInstance.put(url, data, config);
const deleteFunc = (url, config = {}) => axiosInstance.delete(url, config);

export default {
  get: getFunc,
  post: postFunc,
  put: putFunc,
  delete: deleteFunc,
};
