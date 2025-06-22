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
import getRequest from "components/API_Request_Table/getRequest";
import ExportFileNurse from "components/exportFile/exportNurse";
import ImportFileNurse from "components/importFile/importNurse";
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
import putRequest from "components/API_Put_Table";
import deleteRequest from "components/API_Delete_Table";
import postRequest from "components/API_Post_Table";
import API_BASE_URL from "config/apiConfig";
function DataTables() {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const column = [
    { Header: "ID", accessor: "tableId" },
    { Header: "Number", accessor: "tableNumber" },
    { Header: "Type", accessor: "tableType" },
    { Header: "Start", accessor: "tableStart" },
    { Header: "Price", accessor: "price" },
    { Header: "Status", accessor: "status" },
    { Header: "action", accessor: "actionCell" },
  ];
  const [refreshCount, setRefreshCount] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });

  const [id_table, setId_table] = useState();
  const [values, setValues] = useState({
    tableId: "",
    tableNumber: "",
    tableType: "",
    tableStart: "",
    price: "",
    status: "",
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
    const { name, value } = e.target; // Lấy name và value của trường bị thay đổi
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // Cập nhật giá trị mới cho khóa tương ứng
    }));
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
      const response = await getRequest(API_BASE_URL + ":5016/api/Table");
      if (response.success) {
        const tableData = response.data;
        const formattedData = tableData.map((data) => ({
          tableId: data.tableId,
          tableNumber: data.tableNumber,
          tableType: data.tableType,
          tableStart: data.tableStart,
          price: data.price,
          status: data.status,
          disableV: data.disable === true ? "true" : "false",
          actionCell: (
            <ArgonBox display="flex" alignItems="center">
              {1 == 1 && (
                <ArgonTypography
                  variant="body1"
                  color="secondary"
                  sx={{ cursor: "pointer", lineHeight: 0 }}
                ></ArgonTypography>
              )}
              <ArgonBox mx={0}>
                <ArgonTypography
                  variant="body1"
                  color="secondary"
                  sx={{ cursor: "pointer", lineHeight: 0 }}
                >
                  <Tooltip title="Edit" placement="top">
                    <Icon style={{ cursor: "pointer" }} onClick={() => getInfo(data.tableId)}>
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
                    <Icon style={{ cursor: "pointer" }} onClick={() => handleDelete(data.tableId)}>
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
        Swal_show("error", "Hong fetch duoc data nhe ni");
        reject({ status: "error", message: "Error, please login again!" });
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
    setEdit(false);
    setAdd(true);
  };

  const handleDelete = (id) => {
    const response = deleteRequest("api/Table/" + id);
    fetchData();
  };

  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      postRequest("/api/nurse", values, (response) => {
        //const response = await api.post("api/nurse", values).then((response) => {
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

  const getInfo = async (id) => {
    setId_table(id);
    const response = await getRequest(API_BASE_URL + ":5016/api/Table/" + id);
    if (response.success) {
      const user = response.data;
      setValues({
        tableId: user.tableId,
        tableNumber: user.tableNumber,
        tableType: user.tableType,
        tableStart: user.tableStart,
        price: user.price,
        status: user.status,
      });
      setAdd(true);
      setEdit(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message,
      });
    }
  };

  const handleSave = async () => {
    if (isEdit) {
      await putRequest("/api/Table/" + id_table, values);
      fetchData();
      handleClose();
    } else {
      const response = await postRequest("/api/Table", values);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Added successfully",
        });
      }
      fetchData();
      handleClose();
    }
  };

  return (
    <DashboardLayout>
      <Dialog open={add}>
        <DialogTitle>{isEdit ? "Update nurse" : "Add Nurse"}</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="tableNumber"
                  label="Table Number"
                  value={values.tableNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="tableType"
                  label="Table Type"
                  placeholder="Input type of table"
                  value={values.tableType}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="tableStart"
                  label="Time Start"
                  value={values.tableStart}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="price"
                  label="Price"
                  value={values.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="status"
                  label="status"
                  value={values.status}
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
                Bida
              </ArgonTypography>
            </ArgonBox>
            <ArgonButton variant="gradient" color="info" size="small" onClick={handleAdd}>
              + New
            </ArgonButton>
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
