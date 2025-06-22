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
import Divider from "@mui/material/Divider";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonBadge from "components/ArgonBadge";
import ArgonInput from "components/ArgonInput";


// Viện Dưỡng Lão An Nghỉ MUI contexts
import { useArgonController } from "context";


import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';



import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useRef, useEffect } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Switch from "@mui/material/Switch";

//custom
import postRequest from "components/API_Post";
import getRequest from "components/API_Get";
import Swal_show from "components/Swal";


function Authentication(data_user) {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setInputValues
    handleSendCodeClick();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [content_modal, setContent_modal] = useState('none');
  const [title_modal, setTitle_modal] = useState('Title');
  const [image_2fa, setImage_2fa] = useState('');
  const [text_show, settext_show] = useState('');
  const [haveon, sethaveon] = useState(false);

  const [onoff2fa, setonoff2fa] = useState(haveon);



  const handleSetonoff2fa = () => {
    if (haveon == false) {
      handleOpen()
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to turn off Two-factor authentication?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          off2fa();
          setonoff2fa(!onoff2fa);
          sethaveon(!haveon);
        }
      });

    }
  };


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
    loadpage();
  }, []);


  const off2fa = () => {
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
    getRequest("/api/twoFa/" + url_send + "/off2fa", (responseData) => {
      if (responseData.status === "success") {

        if (responseData.secretKey) {
          loadpage();
        }
      } else {
        // Login failed
        Swal_show('error', 'Something went wrong');
      }
    });
  }


  const loadpage = () => {
    setInputValues(['', '', '', '', '', '']);
    handleClose();
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
    getRequest("/api/" + url_send + "/info", (response) => {
      if (response.status === "success") {
        if (response.data.secretKey == "true") {
          sethaveon(true);
          setonoff2fa(true);
        }
      } else {
        Swal_show('error', response.message);
      }
    });
    const firstInputElement = inputRefs.current[0]?.querySelector('input');
    if (firstInputElement) {
      firstInputElement.focus();
    }
  };

  const handleSendCodeClickSetup = () => {
    const verificationCode = inputValues.join('');
    setLoading(true);
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
    postRequest("/api/twoFa/" + url_send + "/2faVerify", { "OTP": verificationCode, "SecretKey": text_show }, (response) => {
      if (response.status === "success") {
        setLoading(false);
        Swal_show('success', 'Success!', 'You have successfully setup 2fa');
        loadpage();
      } else {
        setLoading(false);
        Swal_show('error', 'Wrong OTP');
      }
    });
  };



  const handleSendCodeClick = () => {
    const verificationCode = inputValues.join('');
    setLoading(true);
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
    getRequest("/api/twoFa/" + url_send + "/create", (response) => {

      if (response.status === "success") {
        setLoading(false);
        setImage_2fa(response.image);
        settext_show(response.secretKey);
      } else {
        setLoading(false);
        Swal_show('error', response.message);
      }

    });
    // getRequest("/auth/twoFa", (response) => {
    //   
    // });
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

    <Card id="2fa" sx={{ overflow: "visible" }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Two-factor authentication Setup</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar alt="Image" src={image_2fa} sx={{ width: 200, height: 200 }} />
          Your SecretKey is <b><h2>{text_show}</h2></b> Please save or scan the code, and get the code entered below
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
            <ArgonButton color="info" size="smail"
              onClick={handleSendCodeClickSetup} disabled={loading} container spacing={2} fullWidth>
              {loading ? <CircularProgress color="inherit" size={24} /> : "Setup 2fa"}
            </ArgonButton >
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <ArgonTypography variant="h5">Two-factor authentication</ArgonTypography>

        {haveon ? (<ArgonBadge variant="contained" color="success" badgeContent="enabled" container />) : (
          <ArgonBadge variant="contained" color="error" badgeContent="disabled" container />
        )}




      </ArgonBox>
      <ArgonBox p={3}>
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <ArgonTypography variant="body2" color="text">
            Authenticator app
          </ArgonTypography>
          <ArgonBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <ArgonBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>

              <Switch checked={onoff2fa} onChange={handleSetonoff2fa} />
            </ArgonBox>
            {/*
            <ArgonButton onClick={handleOpen} variant="outlined" color={darkMode ? "white" : "dark"} size="small">
              Set Up
            </ArgonButton>
        */}
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

export default Authentication;
