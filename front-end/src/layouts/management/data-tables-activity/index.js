import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Stack,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import FormField from "components/Validate/FormField";
import Swal_show from "components/Swal";
import Swal from "sweetalert2";
import getRequest from "components/API_Get";
import deleteRequest from "components/API_Delete";
import ExportFileDoctor from "components/exportFile/exportDoctor";
import ImportFileDoctor from "components/importFile/importDoctor";
import { validFullName, validateUsername, validEmail, validatePassword, validPhoneNumber } from "components/Validate/ValidateFunctions";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Activity ID", accessor: "activity_id", width: "10%" },
      { Header: "Elderly ID", accessor: "elderly_id" },
      { Header: "History", accessor: "history" },
      { Header: "Title", accessor: "title" },
      { Header: "Date Created", accessor: "date_created" },
      { Header: "Execution Time", accessor: "execution_time" },
      { Header: "Action", accessor: "actionCell" },
    ],
    rows: [],
  });

  const [values, setValues] = useState({
    roomName: "",
    elderlyId: "",
    servicePackId: "",
    status: "",
  });

  const [inputErrors, setInputErrors] = useState({
    roomName: false,
    elderlyId: false,
    servicePackId: false,
    status: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    roomName: false,
    elderlyId: false,
    servicePackId: false,
    status: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    roomName: "",
    elderlyId: "",
    servicePackId: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  function validateForm(values, setInputErrors, setInputSuccess) {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};

    if (!validateString(values.roomName)) {
      newErrors.roomName = true;
      errorsFound = true;
      newErrorMessage.roomName = "Room name is not valid";
    } else {
      newSuccess.roomName = true;
    }

    if (!validateString(values.elderlyId)) {
      newErrors.elderlyId = true;
      errorsFound = true;
      newErrorMessage.elderlyId = "Elderly ID is not valid";
    } else {
      newSuccess.elderlyId = true;
    }

    if (!validateString(values.servicePackId)) {
      newErrors.servicePackId = true;
      errorsFound = true;
      newErrorMessage.servicePackId = "Service Pack ID is not valid";
    } else {
      newSuccess.servicePackId = true;
    }

    if (!validateString(values.status)) {
      newErrors.status = true;
      errorsFound = true;
      newErrorMessage.status = "Status is not valid";
    } else {
      newSuccess.status = true;
    }

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  }

  const resetValue = () => {
    setValues({
      roomName: "",
      elderlyId: "",
      servicePackId: "",
      status: "",
    });
    setInputErrors({
      roomName: false,
      elderlyId: false,
      servicePackId: false,
      status: false,
    });
    setInputSuccess({
      roomName: false,
      elderlyId: false,
      servicePackId: false,
      status: false,
    });
    setErrorMessage({
      roomName: "",
      elderlyId: "",
      servicePackId: "",
      status: "",
    });
  };

  const setDisable = (isDisable, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: isDisable === "true" ? "you are going to unable this row" : "you are going to disable this row",
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
    deleteRequest("api/room/" + idValue, null, (response) => {
      if (response.status === "success") {
        fetchData();
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/activity");
      if (response.data) {
        const formattedData = response.data.data.map((activity) => ({
          activity_id: activity.activity_id,
          elderly_id: activity.elderly && activity.elderly.fullName ? activity.elderly.fullName : 'none',
          history: activity.history,
          title: activity.title,
          date_created: activity.date_created,
          execution_time: activity.execution_time,
          actionCell: (
            <ArgonBox display="flex" alignItems="center">
              <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                <Tooltip title="Edit" placement="top">
                  <Icon>edit</Icon>
                </Tooltip>
              </ArgonTypography>
              <ArgonBox mx={2}>
                <ArgonTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
                  <Tooltip title="Delete" placement="left">
                    <Icon style={{ cursor: "pointer" }} onClick={() => setDisable("true", activity.activity_id)}>
                      delete
                    </Icon>
                  </Tooltip>
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>
          ),
        }));
        setDataTableData((prevState) => ({ ...prevState, rows: formattedData }));
      }
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

  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      const response = await api.post("api/room", values).then((response) => {
        if (response.data.status === "success") {
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
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.roomName}
                  errorMessage={errorMessage.roomName}
                  error={inputErrors.roomName}
                  name="roomName"
                  label="Room Name"
                  placeholder="Enter room name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.elderlyId}
                  errorMessage={errorMessage.elderlyId}
                  error={inputErrors.elderlyId}
                  name="elderlyId"
                  label="Elderly ID"
                  placeholder="Enter elderly ID"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.servicePackId}
                  errorMessage={errorMessage.servicePackId}
                  error={inputErrors.servicePackId}
                  name="servicePackId"
                  label="Service Pack ID"
                  placeholder="Enter service pack ID"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  success={inputSuccess.status}
                  errorMessage={errorMessage.status}
                  error={inputErrors.status}
                  name="status"
                  label="Status"
                  placeholder="Enter status"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={addUser}>
            Add Room
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
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
                Activity DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <Button variant="contained" color="primary" size="small" onClick={handleAdd}>
                + New Room
              </Button>
              <Button variant="outlined" color="primary" size="small" onClick={ImportFileDoctor}>
                Import
              </Button>
              <Button variant="outlined" color="primary" size="small" onClick={ExportFileDoctor}>
                Export
              </Button>
            </Stack>
          </ArgonBox>

          {loading ? (
            <ArgonBox display="flex" justifyContent="center" alignItems="center" minHeight="100px">
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
