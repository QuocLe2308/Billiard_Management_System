/**
=========================================================
* Argon Dashboard 2 PRO  MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonTagInput from "components/ArgonTagInput";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo(data_user) {
  const created_at = new Date(data_user.data_user.createdAt).toLocaleString("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
  })

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <ArgonBox p={3}>
        <ArgonTypography variant="h5">Basic Info</ArgonTypography>
      </ArgonBox>
      <ArgonBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField label="fullname" value={data_user.data_user.fullname} placeholder="Thompson" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              value={data_user.data_user.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="phone number"
              placeholder="+84 735 631 620"
              inputProps={{ type: "number" }}
              value={data_user.data_user.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Create At"
              value={created_at}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </Card>
  );
}

export default BasicInfo;
