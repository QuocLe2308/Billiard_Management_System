/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { Checkbox, CircularProgress } from "@mui/material";
import FormField from "layouts/applications/wizard/components/FormField";
import CaptchaComponent from "components/Captcha";
import Cookies from "js-cookie";
import { validateUsername } from "components/Validate/ValidateFunctions";
import { validateNotNullOrSpace } from "components/Validate/ValidateFunctions";
import Swal from "sweetalert2";
import postRequest from "components/API_Post";
import API_BASE_URL from "config/apiConfig";
// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-cover.jpg";

function Cover() {
  let navigate = useNavigate();
  const [key, setKey] = useState(0); // Key state to force re-render

  // Function to reload the CaptchaComponent
  const reloadCaptcha = () => {
    setKey((prevKey) => prevKey + 1); // Update key to force re-render
  };
  useEffect(() => {
    if (Cookies.get("username_site") && Cookies.get("token") && Cookies.get("role")) {
      navigate("/dashboards/landing");
    }
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setIsCaptchaVerified(true);
  };

  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [isStaff, setIsStaff] = useState(false); // Thêm state cho "Are you staff?"
  const [role, setRole] = useState(""); // Vai trò: Admin, Nurse, Doctor, Elderly Manager

  const handleAreYouStaff = () => {
    if (isStaff === false) {
      setRole("Admin");
    }
    setIsStaff(!isStaff);
  };
  const [user, setUsers] = useState({
    username: "",
    password: "",
    captcha: "",
    rememberme: false,
  });
  const [loading, setLoading] = useState(false);

  const [statuspassword, setStatuspassword] = useState(
    "Your password needs to have at least 6 characters!"
  );
  const [statuspasswordcolor, setStatuspasswordcolor] = useState("warning");

  const login = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form nếu cần
    if (!validateForm(user, setInputErrors, setInputSuccess)) {
      setLoading(true);
      var url_send = API_BASE_URL + ":5014/api/Employee/login";
      console.log(user);

      const response = await postRequest(url_send, user);

      if (response.success) {
        setLoading(false);
        localStorage.setItem("token", response.data.token);
        Cookies.set("username_site", response.data.username, { expires: 7 });
        Cookies.set("role_sub", role, { expires: 7 });
        Cookies.set("role", response.data.role);
        localStorage.setItem("role", 1);

        if (response.data.token !== "") {
          Swal.fire({
            icon: "success",
            title: "Nice!",
            text: "Login successful!",
          });
          localStorage.setItem("token", response.data.token);
          Cookies.set("token", response.data.token, { expires: 7 });
          resetValue();
          navigate("/dashboards");
        } else {
          navigate("/authentication/verification/cover");
        }
      } else {
        setLoading(false);
        reloadCaptcha();
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: response.message || "Có lỗi xảy ra. Vui lòng thử lại.",
        });
      }
    }
  };

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
    captcha: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    username: false,
    password: false,
    captcha: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    username: false,
    password: false,
    captcha: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rememberme") {
      setUsers({ ...user, rememberme: !user.rememberme });
    } else {
      setUsers({ ...user, [name]: value });
    }
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  function validateForm(user, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};

    if (!validateUsername(user.username)) {
      newErrors.username = true;
      errorsFound = true;
      newErrorMessage.username = "Username is not valid";
    } else {
      newSuccess.username = true;
    }

    if (!validateNotNullOrSpace(user.password)) {
      newErrors.password = true;
      errorsFound = true;
      newErrorMessage.password = "Password is not valid";
    } else {
      newSuccess.password = true;
    }
    // if (!validateNotNullOrSpace(user.captcha)) {
    //   newErrors.captcha = true;
    //   errorsFound = true;
    //   newErrorMessage.captcha = "Captcha is not valid";
    // } else {
    //   newSuccess.captcha = true;
    // }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setUsers({
      username: "",
      password: "",
      captcha: "",
      rememberme: false,
    });
    setInputErrors({
      username: false,
      password: false,
      captcha: false,
    });
    setInputSuccess({
      username: false,
      password: false,
      captcha: false,
    });
    setErrorMessage({
      username: false,
      password: false,
      captcha: false,
    });
  };

  // Validation part ********/
  return (
    <CoverLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgImage}
    >
      <Card>
        <ArgonBox pt={3} px={3}>
          <ArgonTypography variant="h3" color="dark" fontWeight="bold" mb={1}>
            Welcome back
          </ArgonTypography>
          <ArgonTypography variant="body2" color="text">
            Enter your email and password to sign in
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox p={3}>
          <ArgonBox display="flex" alignItems="center" mb={2}>
            <Switch name="isStaff" checked={isStaff} onChange={handleAreYouStaff} />
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              onClick={handleAreYouStaff}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Are you staff?
            </ArgonTypography>
          </ArgonBox>
          {isStaff && (
            <ArgonBox mb={2}>
              <ArgonTypography variant="body2" color="text">
                Your role:
              </ArgonTypography>
              <ArgonBox display="flex" alignItems="center">
                <Checkbox
                  checked={role === "Admin"}
                  onChange={(e) => setRole(e.target.checked ? "Admin" : "")}
                  color="primary"
                />
                <ArgonTypography variant="body2">Admin</ArgonTypography>
              </ArgonBox>
              <ArgonBox display="flex" alignItems="center">
                <Checkbox
                  checked={role === "Nurse"}
                  onChange={(e) => setRole(e.target.checked ? "Nurse" : "")}
                  color="primary"
                />
                <ArgonTypography variant="body2">Nurse</ArgonTypography>
              </ArgonBox>
              <ArgonBox display="flex" alignItems="center">
                <Checkbox
                  checked={role === "Doctor"}
                  onChange={(e) => setRole(e.target.checked ? "Doctor" : "")}
                  color="primary"
                />
                <ArgonTypography variant="body2">Doctor</ArgonTypography>
              </ArgonBox>
              <ArgonBox display="flex" alignItems="center">
                <Checkbox
                  checked={role === "Elderly Manager"}
                  onChange={(e) => setRole(e.target.checked ? "Elderly Manager" : "")}
                  color="primary"
                />
                <ArgonTypography variant="body2">Elderly Manager</ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          )}
          <ArgonBox>
            <ArgonBox mb={3}>
              <FormField
                success={inputSuccess.username}
                errorMessage={errorMessage.username}
                error={inputErrors.username}
                name="username"
                label="Username"
                placeholder="Username"
                onChange={handleInputChange}
              />
            </ArgonBox>
            <ArgonBox mb={3}>
              <FormField
                errorMessage={errorMessage.password}
                error={inputErrors.password}
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                onChange={handleInputChange}
              />
            </ArgonBox>

            <ArgonBox mb={3}>
              <ArgonTypography
                display="block"
                variant="caption"
                fontWeight="bold"
                color="dark"
                sx={{ mb: 1 }}
              ></ArgonTypography>
            </ArgonBox>
            {/*<ArgonBox mb={2}>*/}
            {/*  <CaptchaComponent key={key} />*/}

            {/*  <FormField*/}
            {/*    success={inputSuccess.captcha}*/}
            {/*    errorMessage={errorMessage.captcha}*/}
            {/*    error={inputErrors.captcha}*/}
            {/*    name="captcha"*/}
            {/*    label="Captcha"*/}
            {/*    placeholder="Captcha"*/}
            {/*    onChange={handleInputChange}*/}
            {/*  />*/}
            {/*</ArgonBox>*/}
            <ArgonBox display="flex" alignItems="center">
              <Switch name="rememberme" checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox>

            <ArgonBox mt={4}>
              <ArgonButton color="info" size="large" onClick={login} disabled={loading} fullWidth>
                {loading ? <CircularProgress color="inherit" size={24} /> : "Login"}
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox pb={4} px={1} textAlign="center">
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up/cover"
              variant="button"
              fontWeight="regular"
              color="info"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pb={4} px={1} textAlign="center">
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            <ArgonTypography
              component={Link}
              to="/authentication/reset-password/cover"
              variant="button"
              fontWeight="regular"
              color="info"
            >
              Reset Password
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
