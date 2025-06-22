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
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up the request:", error.message);
  }

  Swal_show("error", "Something went wrong");
};

const deleteRequest = async (url, params = {}) => {
  try {
    const response = await api.delete(url, { params }); // Thêm params nếu có
    return { success: true }; // Trả về dữ liệu và trạng thái thành công
  } catch (error) {
    const errorResponse = handleApiError(error); // Xử lý lỗi
    return { success: false }; // Trả về trạng thái thất bại
  }
};

export default deleteRequest;
