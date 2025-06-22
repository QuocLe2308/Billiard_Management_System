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

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonBadge from "components/ArgonBadge"; import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import Swal_show from "components/Swal";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { useState } from "react";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import getRequest from "components/API_Get";
import Swal from "sweetalert2";

function Steps(data) {
  const { occupied_beds, total_beds } = data.data;
  const badgeColor = occupied_beds === total_beds ? "warning" : "success";
  const [open, setOpen] = useState(false);
  const [open_info, setOpen_info] = useState(false);
  const [room_see, setRoom_see] = useState();
  const [xs_show, setXs_show] = useState(12);
  const [data_elderly, setData_elderly] = useState({
    "elderly_info": []
  });

  const handleViewButton = (roomName) => {
    setOpen(true);
    setRoom_see(roomName);
    getRequest("/api/room/" + roomName, (response) => {
      if (response.status === "success") {
        if (response.elderly_info.length > 1) {
          setXs_show(6);
        } else {
          setXs_show(12);
        }
        setData_elderly(response);
      } else {
        Swal_show('error', 'Có lỗi sảy ra vui lòng đăng nhập lại!');
        reject({ status: 'error', message: 'Có lỗi sảy ra vui lòng đăng nhập lại!' });
      }
    });
  };

  const handleViewButtonInfo = (elderly) => {
    if (elderly && elderly.ElderlyInfo && elderly.ElderlyInfo.elderlyId) {
      Swal.fire({
        title: 'Elderly Information',
        html: `
          <div>
            <p><strong>ID:</strong> ${elderly.ElderlyInfo.elderlyId}</p>
            <p><strong>Full Name:</strong> ${elderly.ElderlyInfo.fullNameElderly}</p>
            <p><strong>Gender:</strong> ${elderly.ElderlyInfo.genderElderly}</p>
            <p><strong>Birthday:</strong> ${elderly.ElderlyInfo.birthdayElderly}</p>
            <p><strong>Resident:</strong> ${elderly.ElderlyInfo.resident}</p>
            <p><strong>Domicile:</strong> ${elderly.ElderlyInfo.domicile}</p>
            <p><strong>Created At:</strong> ${elderly.ElderlyInfo.created_at}</p>
            <p><strong>Last Updated:</strong> ${elderly.ElderlyInfo.updated_at}</p>
          </div>
        `,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Close',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No Elderly Information Available',
        text: 'The information for this elderly person is not available.',
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>List of beds Room {room_see}</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ArgonBox pt={3}>
            <Grid container spacing={3}>
              {data_elderly.elderly_info.map((elderly, index) => (
                <Grid key={index} item xs={12} md={xs_show} onClick={() => handleViewButtonInfo(elderly)}>
                  <ArgonBox mb={3}>
                    <MiniStatisticsCard
                      bgColor={elderly.status ? "info" : "error"}
                      title={{ text: `BED ${elderly.bed}`, fontWeight: "medium" }}
                      count={elderly.ElderlyInfo ? elderly.ElderlyInfo.fullNameElderly : "Empty"}
                      icon={{ component: "person" }}
                    />
                  </ArgonBox>
                </Grid>
              ))}
            </Grid>
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ArgonBox p={3} onClick={() => handleViewButton(data.data.room_name)}>
        <ArgonTypography variant="body2" color="text" fontWeight="regular">
        </ArgonTypography>
        <ArgonBox mt={2} mb={1} lineHeight={0}>
          <ArgonTypography variant="h3" fontWeight="bold">
            ROOM {data.data.room_name}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBadge
          variant="contained"
          color={badgeColor}
          badgeContent={`${occupied_beds}/${total_beds} PEOPLE`}
          container
        />
      </ArgonBox>
    </Card>
  );
}

export default Steps;
