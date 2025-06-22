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
import ExportFilePayment from "components/exportFile/exportPayment";
import ImportFilePayment from "components/importFile/importPayment";
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
import { Link, useNavigate } from "react-router-dom";
import putRequest from "components/API_Put";
import deleteRequest from "components/API_Delete";
import postRequest from "components/API_Post";
import { valid } from "chroma-js";
import ArgonBadge from "components/ArgonBadge";

function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const column = [
    { Header: "id", accessor: "id", width: "10%" },
    { Header: "content", accessor: "content", width: "10%" },
    { Header: "user id", accessor: "userid" },
    { Header: "amount", accessor: "amount", width: "7%" },
    { Header: "status", accessor: "status" },
    { Header: "paid at", accessor: "paidat" },
    { Header: "create at", accessor: "createat" },
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
  const [id_nurse, setId_nurse] = useState();
  const [values, setValues] = useState({
    content: "",
    userid: "",
    amount: "",
    qrdata: "",
    paidat: "",
    createat: "",
  });

  // Validation part ********/
  const [inputErrors, setInputErrors] = useState({
    content: false,
    userid: false,
    amount: false,
    qrdata: false,
    paidat: false,
    createat: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    content: false,
    userid: false,
    amount: false,
    qrdata: false,
    paidat: false,
    createat: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    content: "",
    userid: "",
    amount: "",
    qrdata: "",
    paidat: "",
    createat: "",
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

    if (!validContent(values.content)) {
      newErrors.content = true;
      errorsFound = true;
      newErrorMessage.content = "Content is not valid";
    } else {
      newSuccess.content = true;
    }
    if (!validUserID(values.userid)) {
      newErrors.userid = true;
      errorsFound = true;
      newErrorMessage.userid = "UserID is not valid";
    } else {
      newSuccess.userid = true;
    }
    if (!validAmout(values.amount)) {
      newErrors.amount = true;
      errorsFound = true;
      newErrorMessage.amount = "Amount is not valid";
    } else {
      newSuccess.amount = true;
    }
    if (!validStatus(values.status)) {
      newErrors.status = true;
      errorsFound = true;
      newErrorMessage.status = "Status is not valid";
    } else {
      newSuccess.status = true;
    }
    if (!validQrData(values.qrdata)) {
      newErrors.qrdata = true;
      errorsFound = true;
      newErrorMessage.qrdata = "QrData is not valid";
    } else {
      newSuccess.qrdata = true;
    }
    if (!validPaidat(values.paidat)) {
      newErrors.paidat = true;
      errorsFound = true;
      newErrorMessage.paidat = "Paidat is not valid";
    } else {
      newSuccess.paidat = true;
    }
    if (!validateCreatead(values.createat)) {
      newErrors.createat = true;
      errorsFound = true;
      newErrorMessage.createat = "Createat is not valid";
    } else {
      newSuccess.createat = true;
    }

    if (values.domicile_address == "") {
      newErrors.domicile_address = true;
      errorsFound = true;
      newErrorMessage.domicile_address = "Domicile address not null";
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
      content: false,
      userId: false,
      amount: false,
      qrdata: false,
      paidat: false,
      createat: false,
    });
    setInputErrors({
      content: false,
      userId: false,
      amount: false,
      qrdata: false,
      paidat: false,
      createat: false,
    });
    setInputSuccess({
      content: false,
      userId: false,
      amount: false,
      qrdata: false,
      paidat: false,
      createat: false,
    });
    setErrorMessage({
      content: false,
      userId: false,
      amount: false,
      qrdata: false,
      paidat: false,
      createat: false,
    });
  };
  const getStatusBadge = (status) => {
    if (status === 0) {
      return <ArgonBadge variant="contained" color="warning" badgeContent="unpaid" container />;
    } else if (status === 1) {
      return <ArgonBadge variant="contained" color="info" badgeContent="paid" container />;
    }
    return null;
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      getRequest("/api/payment", (response) => {
        //console.log("Response from API:", response); // Log response here
        if (response.status === "success") {
          const paymentData = response.data;
          const formattedData = paymentData.map((payment) => ({
            id: payment.paymentId,
            content: payment.content,
            userid: payment.userId,
            amount: payment.amount,
            status: getStatusBadge(payment.status),
            qr_data: payment.qr_data,
            paidat: payment.paid_at ? payment.paid_at : 'none',
            createat: payment.createdAt,
            disableV: payment.disable === true ? "true" : "false",
            actionCell: (
              <ArgonBox display="flex" alignItems="center">
                <ArgonBox mx={2}>
                  <ArgonTypography
                    variant="body1"
                    color="secondary"
                    sx={{ cursor: "pointer", lineHeight: 0 }}
                  >
                    <Tooltip title="Edit" placement="top">
                      <Icon
                        style={{ cursor: "pointer" }}
                        onClick={() => getInfo(payment.paymentId)}
                      >
                        info
                      </Icon>
                    </Tooltip>
                  </ArgonTypography>
                </ArgonBox>
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

  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      postRequest("/api/payment", values, (response) => {
        //const response = await api.post("api/payment", values).then((response) => {
        console.log(response);
        if (response.status == "success") {
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
            text: response.message,
          });
        }
      });
    }
  };
  const disable = async (idValue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest("api/payment/" + idValue, (response) => {
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
  const navigate = useNavigate();
  const getInfo = async (id) => {
    navigate(`/payment-detail/${id}`);
  };

  const handleSave = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      if (isEdit) {
        // Update existing payment
        putRequest("/api/payment/" + setId_payment, values, (response) => {
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
      } else {
        // Add new payment
        postRequest("/api/payment", values, (response) => {
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
    }
  };
  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>{isEdit ? "Edit Payment" : "Add Payment"}</DialogTitle>
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
                Payment DataTable
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={handleAdd}>
                + New
              </ArgonButton>

              <ArgonButton variant="outlined" color="info" size="small" onClick={ImportFilePayment}>
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small" onClick={ExportFilePayment}>
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
