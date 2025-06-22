/**
=========================================================
* Viện Dưỡng Lão An Nghỉ MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//custom
import postRequest from "components/API_Post";


// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/verification-cover.jpg";

function Cover() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value === '' && index > 0) {
      const inputElement = inputRefs.current[index - 1]?.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }

    if (value !== '' && index < inputValues.length - 1) {
      const inputElement = inputRefs.current[index + 1]?.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }


  };



  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && inputValues[index] === '' && index > 0) {
      const inputElement = inputRefs.current[index - 1]?.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  };
  useEffect(() => {
    // Focus vào ô đầu tiên khi trang được tải
    const firstInputElement = inputRefs.current[0]?.querySelector('input');
    if (firstInputElement) {
      firstInputElement.focus();
    }
  }, []);



  const handleSendCodeClick = () => {
    // Lấy giá trị từ tất cả các ô input
    const verificationCode = inputValues.join('');
    const username_site = Cookies.get("username_site");
    const role = Cookies.get("role_sub");
    if (role == "Admin") {
      var url_send = "admin";
    } else
      if (role == "Nurse") {
        var url_send = "nurse";
      } else
        if (role == "Doctor") {
          var url_send = "doctor";
        } else
          if (role == "Elderly Manager") {
            var url_send = "elderly_manager";
          } else {
            var url_send = "user";
          }


    setLoading(false);
    postRequest("/api/twoFa/" + url_send + "/verifyLogin", { "username": username_site, "otp": verificationCode }, (response) => {
      if (response.status === "success") {
        setLoading(false);
        // Login successful
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Login successful!",
        });
        localStorage.setItem('token', response.token);
        Cookies.set('username_site', response.username, { expires: 7 });
        Cookies.set('role', response.role);
        localStorage.setItem('role', response.role);
        Cookies.set('token', response.token, { expires: 7 });
        navigate("/dashboards/default");
      } else {
        setLoading(false);
        // Login failed
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong OTP",
        });

      }
    });


  };


  const handlePasteButtonClick = () => {
    // Access the clipboard content
    navigator.clipboard.readText()
      .then((text) => {
        if (text.length == 6) {
          const characters = text.split('');
          // Set the characters into the state
          setInputValues(characters);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The characters in the clipboad must be 6 characters!",
          });
        }
        // Split the pasted text into individual characters

      })
      .catch((err) => {
        console.error('Failed to read clipboard content: ', err);
      });
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'v') {
        // Ctrl + V pressed, call your paste function
        handlePasteButtonClick();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <CoverLayout
      title="Good evening!"
      description="Use these forms to easily login or sign up"
      image={bgImage}
      button={{ color: "warning" }}
    >
      <Card>
        <ArgonBox textAlign="center" p={6}>
          <ArgonBox mb={3} px={1}>
            <ArgonTypography variant="h2" fontWeight="bold">
              2-Step Verification
            </ArgonTypography>
          </ArgonBox>
          <ArgonBox mb={3} px={1}><ArgonButton color="info" size="large" onClick={handlePasteButtonClick}>
            Paste
          </ArgonButton>
          </ArgonBox>

          <ArgonBox mb={2}>
            <Grid container spacing={2}>

              {inputValues.map((value, index) => (
                <Grid item xs key={index}>
                  <ArgonInput
                    size="large"
                    inputProps={{ maxLength: 1 }}
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </Grid>
              ))}

            </Grid>
          </ArgonBox>

          <ArgonBox mb={2}>
            <ArgonButton color="info" size="large"
              onClick={handleSendCodeClick} disabled={loading} fullWidth>
              {loading ? <CircularProgress color="inherit" size={24} /> : "Send Code"}
            </ArgonButton >
          </ArgonBox>

          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Haven&apos;t received it?{" "}
            <ArgonTypography component="a" href="#verification" variant="button">
              Resend a new code
            </ArgonTypography>
            .
          </ArgonTypography>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
