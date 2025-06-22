import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ExportElderlyManager = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/elderly_manager/export", {
      responseType: "blob", // Specify response type as blob
    });

    // Create a blob from the received data
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element to download the file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ListElderlyManager.xlsx");
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the click to download the file

    // Clean up and remove the link
    link.parentNode.removeChild(link);
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

export default ExportElderlyManager;
