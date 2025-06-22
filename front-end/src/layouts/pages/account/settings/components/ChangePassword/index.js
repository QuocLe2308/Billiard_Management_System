/**
=========================================================
* Argon Dashboard 2 PRO  MUI - v3.0.0
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

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import CircularProgress from "@mui/material/CircularProgress";
// Settings page components



//custom
import Swal_show from "components/Swal";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import postRequest from "components/API_Custom";
import Swal from "sweetalert2";
import { validatePassword } from "components/Validate/ValidateFunctions";
import FormField from "components/Validate/FormField";
function ChangePassword() {
  const [user, setUsers] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  });
  const { oldPassword, newPassword1, newPassword2 } = user;
  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });
  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    oldPassword: false,
    newPassword1: false,
    newPassword2: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    oldPassword: false,
    newPassword1: false,
    newPassword2: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...user, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };


  function validateForm(values, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};
    console.log("the usser ne", user)

    if (!validatePassword(values.oldPassword)) {
      newErrors.oldPassword = true;
      errorsFound = true;
      newErrorMessage.oldPassword = "Password should between 8 to 20 characters and contain at least 1 upper, 1 lowwer, 1 digit, 1 special character"
    } else {
      newSuccess.oldPassword = true;
    }
    if (!validatePassword(values.newPassword1)) {
      newErrors.newPassword1 = true;
      errorsFound = true;
      newErrorMessage.newPassword1 = "Password should between 8 to 20 characters and contain at least 1 upper, 1 lowwer, 1 digit, 1 special character"
    } else {
      newSuccess.newPassword1 = true;
    }
    if (values.newPassword2 != "") {
      if (values.newPassword1 != values.newPassword2) {
        newErrors.newPassword2 = true;
        errorsFound = true;
        newErrorMessage.newPassword2 = "The confirm password does not match!"
      } else {
        newSuccess.newPassword2 = true;
      }
    } else {
      newErrors.newPassword2 = true;
      errorsFound = true;
      newErrorMessage.newPassword2 = "The confirm password is null!. Please enter the confirm password!"
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    console.log(inputErrors)
    return errorsFound;
  }

  const resetValue = () => {
    setUsers({
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    });
    setInputErrors({
      oldPassword: false,
      newPassword1: false,
      newPassword2: false,
    });
    setInputSuccess({
      oldPassword: false,
      newPassword1: false,
      newPassword2: false,
    });
    setErrorMessage({
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    });
  };

  // Validation part ********/
  const onSubmit = async () => {

    if (!validateForm(user, setInputErrors, setInputSuccess)) {
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
      const response = await api.post("/api/" + url_send + "/change_password", {
        oldPassword: oldPassword,
        newPassword: newPassword1,
        confirmPassword: newPassword2,
      });
      console.log(response)
      if (response.data.status === "success") {
        //Cookies.set('token', response.data.token, { expires: 7 });
        Swal_show('success', 'Success');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Change password failed: " + response.data.message,
        });
      }
    }
  };
  const passwordRequirements = [
    "From 8 to 20 characters",
    "Contain at least one uppercase letter and one lowercase letter",
    "Contain at least one number",
    "Contain at least one special character(!,@,#,$,...)",
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <ArgonBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <ArgonTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </ArgonTypography>
      </ArgonBox>
    );
  });

  const [loading, setLoading] = useState(false);

  const changeForm = () => { };
  return (
    <Card id="change-password">
      <ArgonBox p={3}>
        <ArgonTypography variant="h5">Change Password</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3} onChange={changeForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              success={inputSuccess.oldPassword}
              errorMessage={errorMessage.oldPassword}
              error={inputErrors.oldPassword}
              label="current password"
              placeholder="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
              name="oldPassword"

              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              success={inputSuccess.newPassword1}
              errorMessage={errorMessage.newPassword1}
              error={inputErrors.newPassword1}

              label="new password"
              placeholder="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
              name="newPassword1"

              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              success={inputSuccess.newPassword2}
              errorMessage={errorMessage.newPassword2}
              error={inputErrors.newPassword2}

              label="confirm new password"
              placeholder="Confirm Password"
              inputProps={{ type: "password", autoComplete: "" }}
              name="newPassword2"

              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <ArgonBox mt={6} mb={1}>
          <ArgonTypography variant="h5">Password requirements</ArgonTypography>
        </ArgonBox>
        <ArgonBox mb={1}>
          <ArgonTypography variant="body2" color="text">
            Please follow this guide for a strong password:
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
        >
          <ArgonBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </ArgonBox>
          <ArgonBox ml="auto">
            <ArgonButton
              variant="gradient"
              color="dark"
              size="small"
              onClick={onSubmit}
              // onClick={changePassword_click}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress color="inherit" size={24} /> : "Change Password"}
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}
export default ChangePassword;