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
    { Header: "ID", accessor: "drinkId", width: "10%" },
    { Header: "Name", accessor: "drinkName", width: "10%" },
    { Header: "Price", accessor: "drinkPrice", width: "10%" },
    { Header: "Stock", accessor: "stock", width: "10%" },
    { Header: "Category ID", accessor: "categoryId", width: "10%" },
    { Header: "product Category", accessor: "productCategory", width: "10%" },
    { Header: "Created At", accessor: "createdAt", width: "10%" },
    { Header: "Updated At", accessor: "updatedAt", width: "10%" },
    { Header: "Created By", accessor: "createdBy", width: "10%" },
    { Header: "Update by", accessor: "updatedBy", width: "10%" },
    { Header: "action", accessor: "actionCell", width: "10%" },
  ];
  const [refreshCount, setRefreshCount] = useState(0);
  const [isEdit, setEdit] = useState(false);

  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });

  const [id_product, setid_product] = useState();

  const [values, setValues] = useState({
    drinkId: "",
    drinkName: "",
    drinkPrice: "",
    stock: "",
    categoryId: "",
    productCategory: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
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
  };

  const resetValue = () => {
    setValues({
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
      const response = await getRequest(API_BASE_URL + ":5281/api/Drink");
      if (response.success) {
        const tableData = response.data;
        const formattedData = tableData.map((data) => ({
          drinkId: data.drinkId,
          drinkName: data.drinkName,
          drinkPrice: data.drinkPrice,
          stock: data.stock,
          categoryId: data.categoryId,
          productCategory: data.productCategory.categoryName,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
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
                    <Icon style={{ cursor: "pointer" }} onClick={() => getInfo(data.drinkId)}>
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
                    <Icon style={{ cursor: "pointer" }} onClick={() => handleDelete(data.drinkId)}>
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteRequest(API_BASE_URL + ":5281/api/Drink/" + id);
      console.log(response);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Delete successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to delete the item.",
        });
      }

      fetchData(); // Refreshes data after deletion
    } catch (error) {
      console.error("Error during deletion:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong with the delete request.",
      });
    }
  };

  const addUser = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      postRequest("/api/nurse", values, (response) => {
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
    setid_product(id);
    const response = await getRequest(API_BASE_URL + ":5281/api/Drink/" + id);
    if (response.success) {
      const user = response.data;
      setValues({
        drinkId: user.drinkId,
        drinkName: user.drinkName,
        drinkPrice: user.drinkPrice,
        stock: user.stock,
        categoryId: user.categoryId,
        productCategory: user.productCategory,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
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
      const response = await putRequest(API_BASE_URL + ":5281/api/Drink/" + id_product, values);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Nice!",
          text: "Added successfully",
        });
      }
      fetchData();
      handleClose();
    } else {
      const response = await postRequest(API_BASE_URL + ":5281/api/Drink/", values);
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
        <DialogTitle>{isEdit ? "Update drink" : "Add drink"}</DialogTitle>
        <DialogContent>
          <ArgonBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="drinkName"
                  label="Drink Name"
                  value={values.drinkName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="drinkPrice"
                  label="Drink Price"
                  placeholder="Input type of table"
                  value={values.drinkPrice}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="stock"
                  label="Stock"
                  value={values.stock}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  name="categoryId"
                  label="Cate ID"
                  value={values.categoryId}
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
                Drink
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
