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

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO  MUI components
import ArgonBox from "components/ArgonBox";

// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import Sidenav from "layouts/pages/account/settings/components/Sidenav";
import Header from "layouts/pages/account/settings/components/Header";
import BasicInfo from "layouts/pages/account/settings/components/BasicInfo";
import ChangePassword from "layouts/pages/account/settings/components/ChangePassword";
import Authentication from "layouts/pages/account/settings/components/Authentication";
import getinfo_user from "components/API_GetInfo";
import { useEffect, useState } from "react";
function Settings() {
  const [data_user, setdata_user] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getinfo_user();
        setdata_user(userInfo);
      } catch (error) {
        // Handle errors
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once
  if (data_user) {
    return (
      <BaseLayout stickyNavbar>
        <ArgonBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <ArgonBox mb={3}>
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <Header data_user={data_user} />
                  </Grid>
                  <Grid item xs={8}>
                    <BasicInfo data_user={data_user} />
                  </Grid>

                  <Grid item xs={8}>
                    <Authentication data_user={data_user} />
                  </Grid>
                  <Grid item xs={8}>
                    <ChangePassword />
                  </Grid>

                </Grid>
              </ArgonBox>
            </Grid>
          </Grid>
        </ArgonBox>
      </BaseLayout>
    );
  }
}
export default Settings;
