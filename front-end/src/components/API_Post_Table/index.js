import axios from "axios";
import Swal_show from "components/Swal";
import API_BASE_URL from "config/apiConfig";

const api = axios.create({
  baseURL: API_BASE_URL + ":5016", // Đổi lại đường dẫn phù hợp với backend của bạn
  withCredentials: true, // Sử dụng cookie trong yêu cầu
});

// Thêm interceptor để gửi token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào tiêu đề
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Chuyển tiếp lỗi
  }
);

// Hàm xử lý lỗi
const handleApiError = (error) => {
  console.error("API Error:", error);

  let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại."; // Mặc định là thông báo lỗi chung
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
    errorMessage = error.response.data.message || errorMessage; // Lấy thông báo lỗi từ phản hồi
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up the request:", error.message);
  }
  Swal_show("error", errorMessage);
  return { success: false, message: errorMessage }; // Trả về thông tin lỗi
};

// Hàm gửi yêu cầu POST
const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data); // Sử dụng URL tương đối
    return { success: true, data: response.data }; // Trả về dữ liệu và trạng thái thành công
  } catch (error) {
    const errorResponse = handleApiError(error); // Xử lý lỗi
    return { success: false, ...errorResponse }; // Trả về trạng thái thất bại
  }
};

export default postRequest;
