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

import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Widgets page components
import Steps from "layouts/room/components/Steps";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import getRequest from "components/API_Get";
import Swal_show from "components/Swal";

function Widgets() {
  const [lights, setLights] = useState(false);
  const [data, setData] = useState([]);
  const handleSetLights = () => setLights(!lights);
  useEffect(() => {
    getInfo();
  }, []);
  function getInfo() {
    getRequest("/api/room/info", (response) => {
      if (response.status === "success") {
        setData(response.room_list);
      } else {
        Swal_show("error", "An error occurred, please log in again!");
        reject({ status: "error", message: "An error occurred, please log in again!" });
      }
    });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <ArgonBox mb={3}>
          <Grid container spacing={3}>
            {data.map((room, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <Steps data={room} />
              </Grid>
            ))}
          </Grid>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Widgets;
