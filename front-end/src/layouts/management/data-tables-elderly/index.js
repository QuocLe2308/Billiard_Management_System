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
import ExportFileElderly from "components/exportFile/exportElderly";
import ImportFileElderly from "components/importFile/importElderly";
import ArgonBadge from "components/ArgonBadge";
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
import { create } from "yup/lib/Reference";
import putRequest from "components/API_Put";
import deleteRequest from "components/API_Delete";
import Cookies from "js-cookie";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "elderly id", accessor: "elderlyId", width: "10%" },
    { Header: "user id", accessor: "userId", width: "10%" },
    { Header: "fullname", accessor: "fullname", width: "10%" },
    { Header: "birthday", accessor: "birthday" },
    { Header: "gender", accessor: "gender" },
    { Header: "domicile address", accessor: "domicileAddress" },
    { Header: "service id", accessor: "serviceId", width: "7%" },
    { Header: "room id", accessor: "roomName" },
    { Header: "status", accessor: "status" },
    { Header: "created at", accessor: "createdAt" },
    { Header: "updated at	", accessor: "updatedAt" },
    { Header: "payment time", accessor: "paymentTime" },
    { Header: "action", accessor: "actionCell" },
  ];
  if (role == 1) {
    column.splice(5, 0, { Header: "disable", accessor: "disableV" });
  }

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });
  const [id_elderly, setId_elderly] = useState();
  const [values, setValues] = useState({
    fullname: "",
    birthday: "",
    gender: "",
    domicileAddress: "",
  });

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    birthday: false,
    gender: false,
    domicileAddress: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    fullname: false,
    birthday: false,
    gender: false,
    domicileAddress: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    fullname: "",
    birthday: "",
    gender: "",
    domicileAddress: "",
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

  const handleAccept = async (elderlyId, roomName) => {
    try {
      const response = await api.put(`api/elderly/accept/${elderlyId}`, {
        status: 1,
        roomName: roomName, // Cập nhật roomName nếu cần thiết
      });
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Accepted!",
          text: "Elderly's status has been updated.",
        });
        fetchData(); // Lấy lại dữ liệu sau khi cập nhật
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error accepting elderly:", error);
    }
  };

  const handleReject = async (elderlyId, roomName) => {
    try {
      const response = await api.put(`api/elderly/accept/${elderlyId}`, {
        status: 2,
        roomName: roomName, // Cập nhật roomName nếu cần thiết
      });
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Elderly's status has been updated.",
        });
        fetchData(); // Lấy lại dữ liệu sau khi cập nhật
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error accepting elderly:", error);
    }
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

    const birthYear = new Date(values.birthday).getFullYear();
    if (birthYear > 1962) {
      newErrors.birthday = true;
      errorsFound = true;
      newErrorMessage.birthday = "Birthday must be before 1962";
    } else {
      newSuccess.birthday = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setValues({
      fullname: "",
      domicileAddress: "",
      birthday: "",
      gender: "",
      username: "",
      password: "",
      email: "",
      phone: "",
    });
    setInputErrors({
      fullname: false,
      username: false,
      birthday: false,
      gender: false,
      domicileAddress: false,
      password: false,
      email: false,
      phone: false,
    });
    setInputSuccess({
      fullname: false,
      username: false,
      birthday: false,
      gender: false,
      domicileAddress: false,
      password: false,
      email: false,
      phone: false,
    });
    setErrorMessage({
      fullname: false,
      username: false,
      birthday: false,
      gender: false,
      domicileAddress: false,
      password: false,
      email: false,
      phone: false,
    });
  };

  const handleSave = async () => {
    if (isEdit) {
      // Update existing nurse
      if (!validateForm(values, setInputErrors, setInputSuccess)) {
        putRequest("/api/elderly/" + id_elderly, values, (response) => {
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
        });
      }
    } else {
      // Add new nurse
      postRequest("/api/elderly", values, (response) => {
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
      });
    }
  };

  // Validation part ********/
  const role_int = Cookies.get("role");
  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/elderly", (response) => {
        if (response.status === "success") {
          const userData = response.data;
          console.log(userData);
          const formattedData = userData.map((user) => ({
            elderlyId: user.elderlyId,
            userId: user.userId,
            fullname: user.fullname,
            birthday: user.birthday,
            gender: user.gender,
            domicileAddress: user.domicileAddress,
            serviceId: user.serviceId,
            roomName: "Room " + user.roomId,
            status: getStatusBadge(user.status),
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            paymentTime: user.paymentTime,

            disableV: user.disable === true ? "true" : "false",
            actionCell: (
              <ArgonBox display="flex" alignItems="center">
                {user.status === 0 && role_int == 1 && (
                  <>
                    <ArgonButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => handleAccept(user.elderlyId, user.roomName)}
                    >
                      Accept
                    </ArgonButton>
                    <ArgonButton
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleReject(user.elderlyId, user.roomName)}
                    >
                      Reject
                    </ArgonButton>
                  </>
                )}


                {user.status === 1 && (
                  <ArgonBox display="flex" alignItems="center">
                    {user.status === 2 && (
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
                          <Icon style={{ cursor: "pointer" }} onClick={() => getInfo(user.elderlyId)}>
                            edit
                          </Icon>
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
                          <Icon style={{ cursor: "pointer" }} onClick={() => disable(user.elderlyId)}>
                            delete
                          </Icon>
                        </Tooltip>
                      </ArgonTypography>
                    </Link>
                  </ArgonBox>
                )}

                {user.status === 2 && (
                  <ArgonBox display="flex" alignItems="center">
                    {user.status === 2 && (
                      <ArgonTypography
                        variant="body1"
                        color="secondary"
                        sx={{ cursor: "pointer", lineHeight: 0 }}
                      ></ArgonTypography>
                    )}
                    <ArgonBox mx={2}>
                      <Link to="" style={{ textDecoration: "none" }}>
                        <ArgonTypography
                          variant="body1"
                          color="secondary"
                          sx={{ cursor: "pointer", lineHeight: 0 }}
                        >
                          <Tooltip title="Delete" placement="left">
                            <Icon style={{ cursor: "pointer" }} onClick={() => disable(user.elderlyId)}>
                              delete
                            </Icon>
                          </Tooltip>
                        </ArgonTypography>
                      </Link>
                    </ArgonBox>
                  </ArgonBox>
                )}
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

  const getStatusBadge = (status) => {
    if (status === 0) {
      return <ArgonBadge variant="contained" color="warning" badgeContent="Not accept" container />;
    } else if (status === 1) {
      return <ArgonBadge variant="contained" color="success" badgeContent="Accept" container />;
    } else {
      return <ArgonBadge variant="contained" color="secondary" badgeContent="Reject" container />;
    }
    return null;
  };

  const disable = async (idValue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this nurse?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest("api/elderly/" + idValue, (response) => {
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
    setId_elderly(id);
    getRequest("/api/elderly/" + id, (response) => {
      if (response.status == "success") {
        const user = response.data;
        setValues({
          fullname: user.fullname,
          birthday: user.birthday,
          gender: user.gender, // Leave password blank for security reasons
          domicileAddress: user.domicileAddress,
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

  //api/nurse
  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      const response = await api.post("api/elderly", values).then((response) => {
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
        <DialogTitle>{isEdit ? "Edit Elderly" : "Add Elderly"}</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.fullname}
                  errorMessage={errorMessage.fullname}
                  error={inputErrors.fullname}
                  name="fullname"
                  label="Full Name"
                  placeholder="Tommy Thompson"
                  value={values.fullname}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  inputProps={{ type: "date" }}
                  success={inputSuccess.birthday}
                  errorMessage={errorMessage.birthday}
                  error={inputErrors.birthday}
                  name="birthday"
                  label="Birthday"
                  placeholder="Tommy Thompson"
                  value={values.birthday}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.gender}
                  errorMessage={errorMessage.gender}
                  error={inputErrors.gender}
                  name="gender"
                  label="Gender"
                  placeholder="Tommy Thompson"
                  value={values.gender}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.domicileAddress}
                  errorMessage={errorMessage.domicileAddress}
                  error={inputErrors.domicileAddress}
                  name="domicileAddress"
                  label="Address"
                  placeholder="Tommy Thompson"
                  value={values.domicileAddress}
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
                Elderly DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="outlined" color="info" size="small" onClick={ImportFileElderly}>
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFileElderly}>
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
