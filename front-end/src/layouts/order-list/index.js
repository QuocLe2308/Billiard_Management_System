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

// react-router-dom components
import "assets/css/button-custom.css";

import { Link, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
import useOrderData from "layouts/order-list/data/dataTableData";
import ProductCell from "layouts/ecommerce/products/products-list/components/ProductCell";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import ArgonBadge from "components/ArgonBadge";
import { useEffect, useState } from "react";
import getRequest from "components/API_Request/getRequest";
import AddOrderModal from "components/AddOrderModal";
import ArgonInput from "components/ArgonInput";
import { Icon } from "@mui/material";
import API_BASE_URL from "config/apiConfig";
import ActionCellOrder from "layouts/ecommerce/products/products-list/components/ActionCellOrder";
import postRequest from "components/API_Post";
import Swal_show from "components/Swal";
function OrdersList() {
  const adidasHoodie = "https://www.bartender.edu.vn/wp-content/uploads/2020/04/sinh-to-xoai.jpg";

  const outOfStock = (
    <ArgonBadge variant="contained" color="error" size="xs" badgeContent="out of stock" container />
  );
  const inStock = (
    <ArgonBadge variant="contained" color="success" size="xs" badgeContent="in stock" container />
  );
  const { id } = useParams();
  const apiUrl = `${API_BASE_URL}:5193/api/OrderDetail/${id}/calculate-total-cost-to-show`;
  const apiUrlProduct = API_BASE_URL + ":5281/api/Drink";
  const orderApiUrl = API_BASE_URL + ":5193/api/OrderDetail";

  const createOrder = async (drinkId, quantity, noti) => {
    const data = {
      tableId: id,
      drinkId: drinkId,
      quantity: quantity,
    };

    try {
      const response = await postRequest(orderApiUrl, data); // Using postRequest here
      console.log(response);
      if (response && response.success) {
        if (noti) {
          Swal_show("success", "Create success!");
        }
        fetchData();

        // Optionally, refresh data or show success feedback
      } else {
        console.warn("Failed to create order:", response);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const [dataTableData, setDataTableData] = useState({
    columns: [
      {
        Header: "Product",
        accessor: "product",
        width: "40%",
        //Cell: ({ value: [name, data] }) => (
        //  <ProductCell image={data.image} name={name} checked={data.checked} />
        //),
      },
      { Header: "Price", accessor: "price" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Action", accessor: "action" },
      { Header: "Hidden Field", accessor: "hiddenField", show: false },
    ],
    rows: [],
  });
  const [dataTableDataProduct, setDataTableDataProduct] = useState({
    columns: [
      {
        Header: "Product",
        accessor: "product",
        width: "40%",
      },
      { Header: "Price", accessor: "price" },
      { Header: "Action", accessor: "action" },
      { Header: "Hidden Field", accessor: "hiddenField", show: false },
    ],
    rows: [],
  });

  const fetchData = async () => {
    try {
      const response = await getRequest(apiUrl);
      if (response && response.data.drinkDetails) {
        const rows = response.data.drinkDetails.map((drink) => ({
          product: <ProductCell image={adidasHoodie} name={drink.drinkName} />,
          price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
            drink.totalPrice
          ),
          quantity: (
            <>
              <button
                className="button-33"
                role="button"
                onClick={() => createOrder(drink.drinkId, -1, false)}
              >
                -
              </button>
              <ArgonButton style={{ margin: "0 8px" }}>{drink.quantity}</ArgonButton>
              <button
                className="button-33"
                role="button"
                onClick={() => createOrder(drink.drinkId, 1, false)}
              >
                +
              </button>
            </>
          ),
          action: <ActionCellOrder />,
          hiddenField: drink.drinkName,
        }));
        setDataTableData((prevData) => ({ ...prevData, rows }));
      } else {
        console.warn("No drink details found in response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const responseDrink = await getRequest(apiUrlProduct);
        if (responseDrink && responseDrink.data) {
          const rows = responseDrink.data.map((product) => ({
            product: <ProductCell image={adidasHoodie} name={product.drinkName} />,
            price: new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
              product.drinkPrice
            ),
            action: (
              <Stack spacing={1} direction="row">
                <ArgonButton
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={() => createOrder(product.drinkId, 1, true)}
                >
                  + Add New Order
                </ArgonButton>
              </Stack>
            ),
            hiddenField: product.drinkName,
          }));
          setDataTableDataProduct((prevData) => ({ ...prevData, rows }));
        } else {
          console.warn("No drink details found in response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchDataProduct();
    console.log(dataTableData);
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Order List
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                All orders have been placed at table {id}.
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
              <ArgonButton variant="gradient" color="info" size="small" onClick={handleOpen}>
                + Add New Order
              </ArgonButton>
            </Stack>
          </ArgonBox>
          <DataTable
            table={dataTableData}
            entriesPerPage={{
              defaultValue: 10,
              entries: [5, 10, 15, 20, 25],
            }}
            canSearch
          />
        </Card>
      </ArgonBox>
      <AddOrderModal open={openModal} handleClose={handleClose} data={dataTableDataProduct} />
      <Footer />
    </DashboardLayout>
  );
}

export default OrdersList;
