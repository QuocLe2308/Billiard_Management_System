import axios from "axios";
import Swal_show from "components/Swal";
import API_BASE_URL from "config/apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL + ":5016", // Đổi lại đường dẫn phù hợp với backend của bạn
  withCredentials: true, // Sử dụng cookie trong yêu cầu
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
    // Handle specific HTTP status codes if needed
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error setting up the request:", error.message);
  }

  // Handle other errors or show a generic error message
  Swal_show("error", "Something went wrong");
};

const putRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return { success: true, data: response.data };
  } catch (error) {
    const errorResponse = handleApiError(error); // Xử lý lỗi
    return { success: false, ...errorResponse }; // Trả về trạng thái thất bại
  }
};

export default putRequest;
