import React, { useEffect, useState } from "react";
import axios from "axios";
import ArgonButton from "components/ArgonButton";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { Icon, IconButton } from "@mui/material";
import getRequest from "components/API_Get";

const CaptchaComponent = () => {
  const [captchaImgSrc, setCaptchaImgSrc] = useState("");
  // const api = axios.create({
  //   baseURL: "http://localhost:8080", // Đổi lại đường dẫn phù hợp với backend của bạn
  //   withCredentials: true, // Sử dụng cookie trong yêu cầu
  // });

  // Function to fetch the captcha image
  const fetchCaptchaImage = async () => {
    getRequest("/api/captcha", (response) => {
      if (response.status === "success") {
        // Update the state with the captcha image source
        setCaptchaImgSrc(response.captcha);
      } else {
        console.error("Error fetching captcha image");
      }
    });
  };

  // Function to fetch the captcha image
  const check = async () => {

    getRequest("/captchashow", (response) => {
      if (response.status === "success") {
        // Update the state with the captcha image source
        alert(response.codecaptcha);
        console.log(response.codecaptcha);
      } else {
        console.error("Error fetching captcha image");
      }
    });
  };
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const startRotation = () => {
    setIsRotating(true);
    fetchCaptchaImage();
    const interval = setInterval(() => {
      setRotationAngle((prevAngle) => {
        if (prevAngle <= -360) {
          clearInterval(interval);
          setIsRotating(false);
          return 0;
        }
        return prevAngle - 5;
      });
    }, 0.5);
  };

  const stopRotation = () => {
    setIsRotating(false);
  };

  useEffect(() => {
    fetchCaptchaImage();
  }, []);

  return (
    <div>
      {/* Display the captcha image */}
      {captchaImgSrc && (
        <img
          style={{ width: "150px", marginRight: "auto" }}
          src={captchaImgSrc}
          alt="CAPTCHA Image"
          onClick={fetchCaptchaImage}
        />
      )}

      {/* Button to fetch a new captcha image */}

      <Icon
        onClick={isRotating ? stopRotation : startRotation}
        fontSize="large"
        style={{
          cursor: "pointer",
          transform: `rotate(${rotationAngle}deg)`
        }}
      >
        replayCircleFilled
      </Icon>
    </div>
  );
};

export default CaptchaComponent;
