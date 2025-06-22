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

//Validation component
import { validFullName } from "components/Validate/ValidateFunctions";
import { validateUsername } from "components/Validate/ValidateFunctions";
import { validEmail } from "components/Validate/ValidateFunctions";
import { validatePassword } from "components/Validate/ValidateFunctions";
import { validPhoneNumber } from "components/Validate/ValidateFunctions";
import { validateString } from "components/Validate/ValidateFunctions";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
import getRequest from "components/API_Get";
import ExportFileDoctor from "components/exportFile/exportDoctor";
import ImportFileDoctor from "components/importFile/importDoctor";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Stack,
  Tooltip,
} from "@mui/material";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import FormField from "components/Validate/FormField";
import { actions } from "react-table";
import { Link } from "react-router-dom";
import deleteRequest from "components/API_Delete";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "id", accessor: "id", width: "10%" },
    { Header: "fullname", accessor: "fullname", width: "10%" },
    { Header: "email", accessor: "email" },
    { Header: "username", accessor: "username", width: "7%" },
    { Header: "phone", accessor: "phone" },
    { Header: "action", accessor: "actionCell" },
  ];
  if (role == 1) {
    column.splice(5, 0, { Header: "disable", accessor: "disableV" });
  }

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });

  const [values, setValues] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  const handleInputChangeUpdate = (e) => {
    const { name, value } = e.target;
    setValuesUpdate({ ...valuesUpdate, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false }); // Reset error state when input changes
    setInputSuccess({ ...inputSuccess, [name]: false });
  };
  function validateForm(values, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};

    if (!validFullName(values.fullname)) {
      newErrors.fullname = true;
      errorsFound = true;
      newErrorMessage.fullname = "Full name is not valid";
    } else {
      newSuccess.fullname = true;
    }
    if (!validateUsername(values.username)) {
      newErrors.username = true;
      errorsFound = true;
      newErrorMessage.username = "Username is not valid";
    } else {
      newSuccess.username = true;
    }
    if (!validEmail(values.email)) {
      newErrors.email = true;
      errorsFound = true;
      newErrorMessage.email = "Email is not valid";
    } else {
      newSuccess.email = true;
    }
    if (!validPhoneNumber(values.phone)) {
      newErrors.phone = true;
      errorsFound = true;
      newErrorMessage.phone =
        "phone number is not invalid(phone number must be start with +84, 84, 0)";
    } else {
      newSuccess.phone = true;
    }
    if (!validatePassword(values.password)) {
      newErrors.password = true;
      errorsFound = true;
      newErrorMessage.password =
        "more than 8 characters (at least 1 lowercase, 1 uppercase, 1 special character and 1 digit)";
    } else {
      newSuccess.password = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setValues({
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
    });
    setInputErrors({
      fullname: false,
      username: false,
      password: false,
      email: false,
      phone: false,
    });
    setInputSuccess({
      fullname: false,
      username: false,
      password: false,
      email: false,
      phone: false,
    });
    setErrorMessage({
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
    });
  };
  const setDisable = (isDisable, id) => {
    Swal.fire({
      title: "Are you sure?",
      text:
        isDisable === "true"
          ? "you are going to unable this row"
          : "you are going to disable this row",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isDisable === "true" ? "Yes, unable this" : "Yes, disable it!",
    }).then((result) => {
      if (result.isConfirmed) {
        disable(id);
        Swal.fire({
          title: isDisable === "true" ? "Unable" : "Disable",
          text: isDisable === "true" ? "The row has been unabled" : "The row has been disabled.",
          icon: "success",
        });
      }
    });
  };
  const disable = async (idValue) => {
    deleteRequest("api/doctor/" + idValue, null, (response) => {
      if (response.status === "success") {
        // Update UI after successful deletion
        fetchData(); // This function should update the table data
        Swal.fire({
          icon: "success",
          title: "Successfully",
          text: "Update successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Failed to delete the row.",
        });
      }
    });
  };
  // Validation part ********/

  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/doctor", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          console.log(userData);
          const formattedData = userData.map((user) => ({
            id: user.doctorId,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            phone: user.phone,
            disableV: user.disable === true ? "true" : "false",
            actionCell: (
              <ArgonBox display="flex" alignItems="center">
                {1 == 1 && (
                  <ArgonTypography
                    variant="body1"
                    color="secondary"
                    sx={{ cursor: "pointer", lineHeight: 0 }}
                  ></ArgonTypography>
                )}
                <ArgonBox mx={2}>
                  <ArgonTypography
                    variant="body1"
                    color="secondary"
                    sx={{ cursor: "pointer", lineHeight: 0 }}
                  >
                    <Tooltip title="Edit" placement="top">
                      <Icon>edit</Icon>
                    </Tooltip>
                  </ArgonTypography>
                </ArgonBox>
                <Link to="" style={{ textDecoration: "none" }}>
                  <ArgonTypography
                    variant="body1"
                    color="secondary"
                    sx={{ cursor: "pointer", lineHeight: 0 }}
                  >
                    <Tooltip title="Delete" placement="left">
                      <Icon
                        style={{ cursor: "pointer" }}
                        onClick={() => setDisable("true", user.doctorId)}
                      >
                        delete
                      </Icon>
                    </Tooltip>
                  </ArgonTypography>
                </Link>
              </ArgonBox>
            ),
          }));
          setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
        } else {
          Swal_show("error", "Error, please login again!");
          reject({ status: "error", message: "Error, please login again!" });
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setAdd(false);
    resetValue();
  };
  const handleAdd = () => {
    setAdd(true);
  };
  const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //api/nurse
  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      const response = await api.post("api/doctor", values).then((response) => {
        console.log(response);
        if (response.data.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Nice!",
            text: "Add successfully",
          });
          fetchData();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        }
      });
    }
  };

  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.fullname}
                  errorMessage={errorMessage.fullname}
                  error={inputErrors.fullname}
                  name="fullname"
                  label="fullname"
                  placeholder="Tommy Thompson's"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.email}
                  errorMessage={errorMessage.email}
                  error={inputErrors.email}
                  name="email"
                  label="email"
                  placeholder="example@email.com"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.username}
                  errorMessage={errorMessage.username}
                  error={inputErrors.username}
                  name="username"
                  label="User name"
                  placeholder="Your username"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.password}
                  errorMessage={errorMessage.password}
                  error={inputErrors.password}
                  name="password"
                  label="Password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.phone}
                  errorMessage={errorMessage.phone}
                  error={inputErrors.phone}
                  name="phone"
                  label="phone number"
                  placeholder="+84 735 631 620"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={12}></Grid>
            </Grid>
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <ArgonButton
            variant="gradient"
            color="dark"
            size="medium"
            type="submit"
            onClick={addUser}
          >
            Add
          </ArgonButton>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <DashboardNavbar />
      <ArgonBox pt={6} pb={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Doctor DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={handleAdd}>
                + New
              </ArgonButton>

              <ArgonButton variant="outlined" color="info" size="small" onClick={ImportFileDoctor}>
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileDoctor}>
                Export
              </ArgonButton>
            </Stack>
          </ArgonBox>

          {loading ? (
            <ArgonBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100px" // Adjust as needed
            >
              <CircularProgress color="inherit" size={40} />
            </ArgonBox>
          ) : (
            <DataTable table={dataTableData} canSearch onDeleteRow={fetchData} />
          )}
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
