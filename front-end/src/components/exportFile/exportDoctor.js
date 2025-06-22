import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ExportFileDoctor = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/doctor/export", {
      responseType: "blob", // Xác định kiểu dữ liệu phản hồi là blob
    });

    // Tạo một blob từ dữ liệu nhận được
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Tạo một đường dẫn URL từ blob
    const url = window.URL.createObjectURL(blob);

    // // Tạo một thẻ a để tải xuống file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ListDoctor.xlsx");
    // document.body.appendChild(link);
    link.click();

    // Xóa đường dẫn URL sau khi đã sử dụng
    window.URL.revokeObjectURL(url);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Export successful!",
    });
  } catch (error) {
    console.error("Error exporting file:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An error occurred while exporting the file.",
    });
  }
};

export default ExportFileDoctor;
