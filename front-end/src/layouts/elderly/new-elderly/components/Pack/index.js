import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Swal_show from "components/Swal";
import ArgonButton from "components/ArgonButton";

function Pack({ formData, servicepackV, setServicepackV, data, roomV, setRoomV, data_room }) {
  const { formField, values, errors, touched } = formData;
  const { servicepack, room } = formField;

  const [open, setOpen] = useState(false);
  const [xs_show, setXs_show] = useState(12);
  //const [roomshow, setRoomshow] = useState("");
  useEffect(() => {
    if (data_room.length > 0) {
      handleViewButton();
    }
  }, [data_room]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewButton = () => {
    setOpen(true);
    if (data_room.length > 1) {
      setXs_show(6);
    } else {
      setXs_show(12);
    }
  };

  return (
    <ArgonBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>List of Rooms</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {data_room.map((room, index) => (
            <div key={index}>
              <ArgonBox pt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={3} md={12} onClick={() => {
                    //console.log("hehe" + room.id)
                    if (room.status === 0) {
                      setRoomV(room.id);
                      //setRoomshow(room.roomName)
                      setOpen(false);
                    } else {
                      Swal_show('error', 'This room is occupied by elderly people');
                      setRoomV("");
                    }
                  }}>
                    <ArgonBox mb={3}>
                      <MiniStatisticsCard
                        bgColor={room.status === 0 ? "info" : "error"}
                        title={{ text: `ROOM ${room.roomName}`, fontWeight: "medium" }}
                        count={room.status === 0 ? "Available" : "Occupied"}
                        icon={{ component: "home" }}
                      />
                    </ArgonBox>
                  </Grid>
                </Grid>
              </ArgonBox>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ArgonTypography variant="h5" fontWeight="bold">
        Service Pack
      </ArgonTypography>
      <ArgonBox>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Service Pack
              </ArgonTypography>
            </ArgonBox>
            <Select
              input={<ArgonInput />}
              name={servicepack.name}
              label={servicepack.label}
              value={servicepackV}
              onChange={setServicepackV}
            >
              <MenuItem value="none">-- Select Service --</MenuItem>
              {data.map((item, index) => (
                <MenuItem key={index} value={item.servicePackId}>
                  {item.namePack}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {roomV == 10000 && (
            <Grid item xs={12} sm={12}>
              <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <ArgonTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  ROOM
                </ArgonTypography>
              </ArgonBox>
              <Grid item xs={6} sm={6}>
                <ArgonBox mb={3}>
                  <MiniStatisticsCard
                    bgColor="info"
                    title={{ text: `ROOM ` + roomshow, fontWeight: "medium" }}
                    count="Available"
                    icon={{ component: "home" }}
                  />
                </ArgonBox>
              </Grid>
            </Grid>
          )}
          <Grid item xs={6} sm={6} mb={1} ml={0.5}>
            <ArgonButton variant="gradient" color="info" pt={3} onClick={() => { setOpen(true) }}>
              Select Room
            </ArgonButton>

          </Grid>
        </Grid>
      </ArgonBox>
    </ArgonBox >
  );
}

Pack.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  servicepackV: PropTypes.string.isRequired,
  setServicepackV: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  roomV: PropTypes.string.isRequired,
  setRoomV: PropTypes.func.isRequired,
  data_room: PropTypes.array.isRequired,
};

export default Pack;
