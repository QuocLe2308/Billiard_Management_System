import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import postRequest from "components/API_Post";

// Validate Function
import { validatePassword } from "components/Validate/ValidateFunctions";
import FormField from "components/Validate/FormField";
import { validateVerificationCode } from "components/Validate/ValidateFunctions";
import { Checkbox, CircularProgress, Switch } from "@mui/material";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reset-cover.jpg";

function Cover() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password1Error, setPassword1Error] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const [user, setUsers] = useState({
    email: "",
    code: "",
    password1: "",
    password2: "",
  });

  const [showEmailInput, setshowEmailInput] = useState(true);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordInput, setPasswordInput] = useState(false);

  const [isStaff, setIsStaff] = useState(false); // Thêm state cho "Are you staff?"
  const [role, setRole] = useState(""); // Vai trò: Admin, Nurse, Doctor, Elderly Manager

  const handleAreYouStaff = () => {
    if (isStaff == false) {
      setRole("Admin");
    } else {
      setRole("User");
    }
    setIsStaff(!isStaff);
  };

  const { email, code, password1, password2 } = user;

  const onInputChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
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
    if (!showCodeInput && !showPasswordInput && showEmailInput) {
      // Stage 1: Send email to initiate the password reset
      postRequest(
        "/api/" + url_send + "/forgot_password_send",
        {
          email,
        },
        (response) => {
          setLoading(false);
          if (response.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Nice!",
              text: "Password reset initiated! Check your email for a code.",
            });
            setShowCodeInput(true);
            setPasswordInput(true);
            setshowEmailInput(false);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          }
        }
      );
    } else {
      setLoading(true);
      postRequest(
        "api/" + url_send + "/forgot_password_confirm",
        {
          email,
          otp: code,
          password: password1,
          re_password: password2,
        },
        (response) => {
          if (!password1) {
            setPassword1Error("Please enter a password.");
            setLoading(false);
            return;
          }

          if (!password2) {
            setPassword2Error("Please confirm your password.");
            setLoading(false);
            return;
          }

          // Check the match between two passwords
          if (password1 !== password2) {
            setPassword2Error("Passwords do not match.");
            setLoading(false);
            return;
          }

          // Clear error message if there is no error
          setPassword1Error("");
          setPassword2Error("");

          if (response.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Code verified!",
              text: "Your password was changed successfully",
            });
            navigate("/dashboards");
          } else {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.message,
            });
          }
        }
      );
    }
  };
  return (
    <CoverLayout
      title="Reset Password"
      description="You will receive an e-mail in maximum 60 seconds"
      image={bgImage}
      imgPosition="top"
      button={{ color: "info" }}
    >
      <Card>
        <ArgonBox p={3}>
          <ArgonBox display="flex" alignItems="center">
            <ArgonBox
              width="3rem"
              height="3rem"
              bgColor="info"
              shadow="md"
              display="grid"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
            >
              <ArgonBox
                component="i"
                color="white"
                fontSize="1.25rem"
                className="ni ni-circle-08"
              />
            </ArgonBox>

            <ArgonBox ml={2} lineHeight={1}>
              <ArgonTypography variant="h5" color="dark">
                Can&apos;t log in?
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular">
                Restore access to your account
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox p={3}>
          <ArgonBox component="form" role="form">
            {showEmailInput && (
              <ArgonBox mb={2}>
                <ArgonTypography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  color="dark"
                  sx={{ ml: 0.5, mb: 1 }}
                >
                  We will send a recovery link to
                </ArgonTypography>
                <ArgonInput
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
              </ArgonBox>

            )}
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
            {showCodeInput && (
              <ArgonBox mb={2}>
                <ArgonInput
                  type="number"
                  id="code"
                  placeholder="Enter Code"
                  name="code"
                  value={code}
                  onChange={(e) => onInputChange(e)}
                />
              </ArgonBox>
            )}
            {showPasswordInput && (
              <div>
                {" "}
                {/* Hoặc sử dụng <React.Fragment> */}
                <ArgonBox mb={2}>
                  <ArgonInput
                    type="password"
                    placeholder="Password"
                    name="password1"
                    value={password1}
                    onChange={(e) => {
                      onInputChange(e);
                      setPassword1Error("");
                    }}
                  />
                  {password1Error && (
                    <ArgonTypography
                      variant="caption"
                      color="error"
                      sx={{ ml: 0.5, mt: 1 }}
                    >
                      {password1Error}
                    </ArgonTypography>
                  )}
                </ArgonBox>
                <ArgonBox mb={2}>
                  <ArgonInput
                    type="password"
                    placeholder="Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => {
                      onInputChange(e);
                      setPassword2Error("");
                    }}
                  />
                  {password2Error && (
                    <ArgonTypography
                      variant="caption"
                      color="error"
                      sx={{ ml: 0.5, mt: 1 }}
                    >
                      {password2Error}
                    </ArgonTypography>
                  )}
                </ArgonBox>
              </div>
            )}
            <ArgonBox mt={3} mb={1} textAlign="center">
              {loading ? (
                <ArgonButton color="info" fullWidth>
                  <CircularProgress color="inherit" size={20} />
                </ArgonButton>
              ) : (
                <ArgonButton color="info" fullWidth onClick={onSubmit}>
                  Reset Password
                </ArgonButton>
              )}

              <ArgonTypography
                display="block"
                variant="button"
                color="text"
                fontWeight="regular"
                mt={3}
                sx={{ cursor: "pointer" }}
              >
                I don&apos;t have access to my Email
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
