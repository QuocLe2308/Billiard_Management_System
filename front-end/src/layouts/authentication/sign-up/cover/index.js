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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import postRequest from "components/API_Post";


import FormField from "components/Validate/FormField";
import { validateInput } from "components/Validate/ValidateFunctions";
import { validateNotNullOrSpace } from "components/Validate/ValidateFunctions";
import { validPhoneNumber } from "components/Validate/ValidateFunctions";
import { validEmail } from "components/Validate/ValidateFunctions";
import { validFullName } from "components/Validate/ValidateFunctions";
import { CircularProgress, Switch } from "@mui/material";
import CaptchaComponent from "components/Captcha";
import { validateUsername } from "components/Validate/ValidateFunctions";
import { validatePassword } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";
import { validateVerificationCode } from "components/Validate/ValidateFunctions";


// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  let navigate = useNavigate();

  const [user, setUsers] = useState({
    fullname: "",
    email: "",
    code: "",
    username: "",
    password: "",
    term: false,
    domicile: "",

  });

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showInput, setShowInput] = useState(true);

  const { fullname, email, code, username, password, phone, domicile } = user;

  const [loading, setLoading] = useState(false);

  const [statuspassword, setStatuspassword] = useState(
    "Your password needs to have at least 6 characters!"
  );
  const [statuspasswordcolor, setStatuspasswordcolor] = useState("warning");

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    username: false,
    password: false,
    fullname: false,
    email: false,
    phone: false,
    domicile: false,
    code: false
  });

  const [inputSuccess, setInputSuccess] = useState({
    username: false,
    password: false,
    fullname: false,
    email: false,
    phone: false,
    domicile: false,
    code: false
  });
  const [errorMessage, setErrorMessage] = useState({
    username: false,
    password: false,
    fullname: false,
    email: false,
    phone: false,
    domicile: false,
    code: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setUsers({ ...user, [name]: checked });
    } else {
      setUsers({ ...user, [name]: value });
    }
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  //validate input form
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

    if (!validatePassword(user.password)) {
      newErrors.password = true;
      errorsFound = true;
      newErrorMessage.password = "more than 8 characters (at least 1 lowercase, 1 uppercase, 1 special character and 1 digit)";
    } else {
      newSuccess.password = true;
    }

    if (!validFullName(user.fullname)) {
      newErrors.fullname = true;
      errorsFound = true;
      newErrorMessage.fullname = "Fullname is not valid";
    } else {
      newSuccess.fullname = true;
    }

    if (!validEmail(user.email)) {
      newErrors.email = true;
      errorsFound = true;
      newErrorMessage.email = "Email is not valid";
    } else {
      newSuccess.email = true;
    }

    if (!validFullName(user.domicile)) {
      newErrors.domicile = true;
      errorsFound = true;
      newErrorMessage.domicile = "Domicile is not valid";
    } else {
      newSuccess.domicile = true;
    }

    if (!validPhoneNumber(user.phone)) {
      newErrors.phone = true;
      errorsFound = true;
      newErrorMessage.phone = "phone number is not invalid (phone number must be start with +84, 84, 0)";
    } else {
      newSuccess.phone = true;
    }


    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setUsers({
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      domicile: "",

    });
    setInputErrors({
      username: false,
      password: false,
      fullname: false,
      email: false,
      phone: false,
      domicile: false,

    });
    setInputSuccess({
      username: false,
      password: false,
      fullname: false,
      email: false,
      phone: false,
      domicile: false,

    });
    setErrorMessage({
      username: false,
      password: false,
      fullname: false,
      email: false,
      phone: false,
      domicile: false,

    });
  };

  // Validation part ********/

  //////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!showCodeInput && showInput) {
        // Stage 1: Send email to initiate the password reset
        postRequest(
          "/api/user/register_send",
          {
            fullname,
            email,
            username,
            phone,
            domicile,
            password,
          },
          (response) => {
            setLoading(false);
            if (response.status === "success") {
              Swal.fire({
                icon: "success",
                title: "Nice!",
                text: "Check your email for a code.",
              });
              setShowCodeInput(true)
              setShowInput(false)
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.message,
              });
            }
          }
        );
      } else if (showCodeInput && !showInput) {
        // Stage 2: Verify code and show password input fields
        if (validateVerificationCode(user.code)) {
          setLoading(true);
          postRequest(
            "/api/user/register_confirm",
            {
              fullName: fullname,
              email,
              otp: code,
              username,
              phone,
              domicileAddress: domicile,
              password,
            },
            (response) => {
              setLoading(false);
              if (response.status === "success") {
                Swal.fire({
                  icon: "success",
                  title: "Code verified!",
                  text: "Register success.",
                });
                resetValue();
                navigate("/");
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response.message,
                });
              }
            }
          );
        } else if (user.code.length < 1) {
          setLoading(false);
          setInputErrors({ ...inputErrors, code: true });
          setErrorMessage({ ...errorMessage, code: "Please enter the verification code" });
        } else {
          setLoading(false);
          setInputErrors({ ...inputErrors, code: true });
          setErrorMessage({ ...errorMessage, code: "Please enter the valid verification code" });
        }
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateSignup = async (e) => {

    if (!validateForm(user, setInputErrors, setInputSuccess)) {
      if (!user.term) {
        // If term checkbox is not checked, show an error or prevent form submission
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please agree to the Terms and Conditions.",
        });
        return;
      }
      setLoading(false);
      onSubmit();
    }

  };

  return (
    <CoverLayout
      title="Welcome!"
      description="Use these forms to easily login or sign up"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          {showInput && (
            <ArgonBox>
              <ArgonBox mb={3}>
                <FormField
                  success={inputSuccess.fullname}
                  errorMessage={errorMessage.fullname}
                  error={inputErrors.fullname}
                  name="fullname"
                  label="fullname"
                  placeholder="FullName"
                  onChange={handleInputChange}
                />
              </ArgonBox>

              <ArgonBox mb={3}>
                <FormField
                  success={inputSuccess.username}
                  errorMessage={errorMessage.username}
                  error={inputErrors.username}
                  name="username"
                  label="username"
                  placeholder="Username"
                  type="text"
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
                <FormField
                  success={inputSuccess.email}
                  errorMessage={errorMessage.email}
                  error={inputErrors.email}
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </ArgonBox>

              <ArgonBox mb={3}>
                <FormField
                  success={inputSuccess.phone}
                  errorMessage={errorMessage.phone}
                  error={inputErrors.phone}
                  name="phone"
                  label="Phone"
                  placeholder="Phone"
                  type="text"
                  onChange={handleInputChange}
                />
              </ArgonBox>

              <ArgonBox mb={3}>
                <FormField
                  success={inputSuccess.domicile}
                  errorMessage={errorMessage.domicile}
                  error={inputErrors.domicile}
                  name="domicile"
                  label="Domicile"
                  placeholder="Domicile"
                  type="text"
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

            </ArgonBox>



          )}
          {showCodeInput && (
            <ArgonBox mb={3}>
              <FormField
                success={inputSuccess.code}
                errorMessage={errorMessage.code}
                error={inputErrors.code}
                placeholder="Enter code"
                name="code"
                id="code"
                onChange={handleInputChange}
              >

              </FormField>
            </ArgonBox>
          )}
          <ArgonBox display="flex" alignItems="center">
            <Checkbox defaultChecked={user.term}
              onChange={(e) => setUsers({ ...user, term: e.target.checked })}

            />

            <ArgonTypography
              variant="button"
              fontWeight="regular"
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </ArgonTypography>
            <ArgonTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              textGradient
            >
              Terms and Conditions
            </ArgonTypography>
          </ArgonBox>

          <ArgonBox mt={4} mb={1}>
            {loading ? (
              <ArgonButton variant="gradient" color="dark" fullWidth>
                <CircularProgress color="inherit" size={20} />
              </ArgonButton>
            ) : (
              <ArgonButton variant="gradient" color="dark" fullWidth onClick={validateSignup}>
                Sign up
              </ArgonButton>
            )}


          </ArgonBox>
          <ArgonBox mt={2}>
            <ArgonTypography variant="button" color="text" fontWeight="regular">
              Already have an account?&nbsp;
              <ArgonTypography
                component={Link}
                to="/authentication/sign-in/cover"
                variant="button"
                color="dark"
                fontWeight="bold"
                textGradient
              >
                Sign in
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>

        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
