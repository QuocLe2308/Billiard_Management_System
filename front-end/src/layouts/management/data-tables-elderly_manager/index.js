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
import putRequest from "components/API_Put";
import deleteRequest from "components/API_Delete";
import postRequest from "components/API_Post";
import ImportFileElderlyManager from "components/importFile/importElderlyManager";
import ExportElderlyManager from "components/exportFile/exportElderlyManager";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
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
  const [refreshCount, setRefreshCount] = useState(0);

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });
  const [id_elderlymanager, setId_elderlymanager] = useState();
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    domicile_address: "",
  });

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
    domicile_address: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    phone: false,
    domicile_address: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    domicile_address: "",
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
    if (!validatePassword(values.password) && !isEdit) {
      newErrors.password = true;
      errorsFound = true;
      newErrorMessage.password =
        "more than 8 characters (at least 1 lowercase, 1 uppercase, 1 special character and 1 digit)";
    } else {
      newSuccess.password = true;
    }
    if (values.domicile_address == "") {
      newErrors.domicile_address = true;
      errorsFound = true;
      newErrorMessage.domicile_address =
        "Domicile address not null";
    } else {
      newSuccess.domicile_address = true;
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
      domicile_address: "",
    });
    setInputErrors({
      fullname: false,
      username: false,
      password: false,
      email: false,
      phone: false,
      domicile_address: false,
    });
    setInputSuccess({
      fullname: false,
      username: false,
      password: false,
      email: false,
      phone: false,
      domicile_address: false,
    });
    setErrorMessage({
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      domicile_address: "",
    });
  };



  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/elderly_manager", (response) => {

        if (response.status === "success") {
          const userData = response.data;
          const formattedData = userData.map((user) => ({
            id: user.elderlymanagerId,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            phone: user.phone,
            domicile_address: user.domicile_address,
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
                      <Icon
                        style={{ cursor: "pointer" }}
                        onClick={() => getInfo(user.elderlymanagerId)}
                      >edit</Icon>
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
                        onClick={() => disable(user.elderlymanagerId)}
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
    setEdit(false);
    resetValue();
  };

  const handleAdd = () => {
    setAdd(true);
    setEdit(false);
  };

  const disable = async (idValue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this elderlymanager?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest("api/elderly_manager/" + idValue, (response) => {
          //console.log("Response status: " + response.status);
          if (response.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Successfully",
              text: "Delete successfully!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Failed to delete the row.",
            });
          }
          fetchData();
        });
      }
    });
  };

  const getInfo = async (id) => {
    setId_elderlymanager(id);
    getRequest("/api/elderly_manager/" + id, (response) => {
      if (response.status == "success") {
        const user = response.data;
        setValues({
          fullname: user.fullname,
          username: user.username,
          password: "",  // Leave password blank for security reasons
          email: user.email,
          phone: user.phone,
          domicile_address: user.domicile_address,
        });
        setEdit(true);
        setAdd(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    });
  };

  const handleSave = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      console.log("Form is valid, proceeding to save...");
      if (isEdit) {
        putRequest(`/api/elderly_manager/${id_elderlymanager}`, values, (response) => {
          console.log(response + "oooo");
          if (response.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Nice!",
              text: "Updated successfully",
            });
            fetchData();
            handleClose();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response.message,
            });
          }
        }); // Close the callback function
      } // Close the if statement
      else {
        // Add new elderlymanager
        console.log("Adding new elderlymanager");
        const response = await postRequest("/api/elderly_manager", values);
        console.log("Add response:", response);

        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Nice!",
            text: "Added successfully",
          });
          fetchData();
          handleClose();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
          });
        }
      }

    } else {
      console.log("Form validation failed.");
    }
  };


  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>{isEdit ? "Edit Elderly Manager" : "Add Elderly Manager"}</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.fullname}
                  errorMessage={errorMessage.fullname}
                  error={inputErrors.fullname}
                  name="fullname"
                  label="Fullname"
                  placeholder="Tommy Thompson"
                  value={values.fullname}
                  onChange={handleInputChange}
                />
              </Grid>
              {!isEdit && (
                <Grid item xs={12} sm={6}>

                  <FormField
                    success={inputSuccess.email}
                    errorMessage={errorMessage.email}
                    error={inputErrors.email}
                    name="email"
                    label="Email"
                    placeholder="example@email.com"
                    value={values.email}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              {!isEdit && (
                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.username}
                    errorMessage={errorMessage.username}
                    error={inputErrors.username}
                    name="username"
                    label="Username"
                    placeholder="Your username"
                    value={values.username}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              {!isEdit && (
                <Grid item xs={12} sm={6}>
                  <FormField
                    success={inputSuccess.password}
                    errorMessage={errorMessage.password}
                    error={inputErrors.password}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleInputChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.phone}
                  errorMessage={errorMessage.phone}
                  error={inputErrors.phone}
                  name="phone"
                  label="Phone number"
                  placeholder="+84 735 631 620"
                  value={values.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.domicile_address}
                  errorMessage={errorMessage.domicile_address}
                  error={inputErrors.domicile_address}
                  name="domicile_address"
                  label="Domicile address"
                  placeholder="Sai Gon"
                  value={values.domicile_address}
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
            onClick={handleSave}
          >
            {isEdit ? "Save" : "Add"}
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
                Elderly Manager DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={handleAdd}>
                + New
              </ArgonButton>

              <ArgonButton variant="outlined" color="info" size="small" onClick={ImportFileElderlyManager}>
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportElderlyManager}>
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
