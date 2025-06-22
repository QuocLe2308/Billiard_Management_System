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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCardTable";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import API_BASE_URL from "config/apiConfig";

// Project page components
import Header from "layouts/pages/profile/components/Header";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";
import statusGreen from "assets/images/color/green.png";
import statusOrange from "assets/images/color/orange.png";
import boolImage from "assets/images/color/bool.png";
import getRequest from "components/API_Request/getRequest";
import dayjs from "dayjs";
import postRequest from "components/API_Post";
import Swal_show from "components/Swal";
import { useNavigate } from "react-router-dom";
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function TableManagement() {
  const navigate = useNavigate();
  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);
  const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
  const [designToolsMenu, setDesignToolsMenu] = useState(null);
  const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
  const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);
  const [tables, setTables] = useState([]);
  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);
  const openPremiumSupportMenu = (event) => setPremiumSupportMenu(event.currentTarget);
  const closePremiumSupportMenu = () => setPremiumSupportMenu(null);
  const openDesignToolsMenu = (event) => setDesignToolsMenu(event.currentTarget);
  const closeDesignToolsMenu = () => setDesignToolsMenu(null);
  const openLookingGreatMenu = (event) => setLookingGreatMenu(event.currentTarget);
  const closeLookingGreatMenu = () => setLookingGreatMenu(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuTableId, setOpenMenuTableId] = useState(null);
  // const openDeveloperFirstMenu = (event) => setDeveloperFirstMenu(event.currentTarget);
  // const closeDeveloperFirstMenu = () => setDeveloperFirstMenu(null);
  const openDeveloperFirstMenu = (event, tableId) => {
    setAnchorEl(event.currentTarget);
    setOpenMenuTableId(tableId);
  };

  const closeDeveloperFirstMenu = () => {
    setAnchorEl(null);
    setOpenMenuTableId(null);
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  async function fetchTableData() {
    const response = await getRequest(API_BASE_URL + ":5016/api/Table");
    if (response.success) {
      setTables(response.data);
      console.log("Dữ liệu bảng:", response.data);
    } else {
      console.log("Lỗi khi lấy dữ liệu bảng:", response.message);
    }
  }
  const getColorStatus = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "";
      case "occupied":
        return "#00FFFF";
      default:
        return "";
    }
  };
  async function StartTable(id) {
    console.log("Starting table with ID:", id);
    const data_send = { tableId: id };
    // Thêm logic xử lý theo yêu cầu
    const response = await postRequest(API_BASE_URL + ":5193/api/Order", data_send);
    if (response.success) {
      Swal_show("success", "Mở bàn thành công!!!");
      fetchTableData();
    } else {
      Swal_show("error", response.message);
      console.log("Lỗi khi lấy dữ liệu bảng:", response.message);
    }
  }
  async function PayTable(id) {
    console.log("Pay table with ID:", id);
    // Thêm logic xử lý theo yêu cầu
    const response = await getRequest(API_BASE_URL + ":5193/api/OrderDetail/bill/" + id);
    if (response.success) {
      Swal_show("success", "Thanh toán thành công!!!");
      fetchTableData();
    } else {
      console.log("Lỗi khi lấy dữ liệu bảng:", response.message);
    }
  }

  async function Order(id) {
    navigate(`/table-management/order-list/${id}`);
  }

  const renderMenu = (tableId, status) => (
    <Menu
      anchorEl={openMenuTableId === tableId ? anchorEl : null}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenuTableId === tableId)}
      onClose={closeDeveloperFirstMenu}
      keepMounted
    >
      {/* Conditionally render "Start" if status is "Available" */}
      {status === "Available" && (
        <MenuItem
          onClick={() => {
            StartTable(tableId);
            closeDeveloperFirstMenu();
          }}
        >
          Start
        </MenuItem>
      )}
      {/* Conditionally render "Pay" if status is "Occupied" */}
      {status === "Occupied" && (
        <MenuItem
          onClick={() => {
            Order(tableId);
            closeDeveloperFirstMenu();
          }}
        >
          Order
        </MenuItem>
      )}

      {/* Conditionally render "Pay" if status is "Occupied" */}
      {status === "Occupied" && (
        <MenuItem
          onClick={() => {
            PayTable(tableId);
            closeDeveloperFirstMenu();
          }}
        >
          Pay
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(rgba(gradients.info.main, 0.6), rgba(gradients.info.state, 0.6))}`,
        backgroundPositionY: "50%",
      }}
    >
      <ArgonBox pt={5} pb={2}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <ArgonBox mb={1}>
              <ArgonTypography variant="h5">Some of Our Awesome Projects</ArgonTypography>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonTypography variant="body2" color="text">
                This is the paragraph where you can write more details about your projects. Keep you
                user engaged by providing meaningful information.
              </ArgonTypography>
            </ArgonBox>
          </Grid>
        </Grid>
        <ArgonBox mt={{ xs: 1, lg: 3 }} mb={1}>
          <Grid container spacing={3}>
            {tables.map((table) => (
              <Grid item xs={12} md={6} lg={4} key={table.tableId}>
                <ComplexProjectCard
                  image={boolImage}
                  colorStatus={getColorStatus(table.status)}
                  title={table.tableNumber + " - " + table.tableType}
                  dateTime={dayjs(table.tableStart).format("DD.MM.YY")}
                  members={[]}
                  timeStart={table.tableStart}
                  dropdown={{
                    action: (event) => openDeveloperFirstMenu(event, table.tableId),
                    menu: renderMenu(table.tableId, table.status),
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default TableManagement;
