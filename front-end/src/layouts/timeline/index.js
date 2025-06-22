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
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";

// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TimelineList from "examples/Timeline/TimelineList";
import TimelineItem from "examples/Timeline/TimelineItem";

// Viện Dưỡng Lão An Nghỉ MUI contexts
import { useArgonController } from "context";

// Data
import { useNavigate, useParams } from "react-router-dom";
import ArgonTypography from "components/ArgonTypography";
import ArgonDatePicker from "components/ArgonDatePicker";
import { useEffect, useState } from "react";
import getRequest from "components/API_Get";
import postRequest from "components/API_Post";

function Timeline() {
  const { id } = useParams();
  const [renderTimelineItems, setRenderTimelineItems] = useState([]);
  const [controller] = useArgonController();
  const { darkMode } = controller;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    getRequest("/api/activity/" + id, (response) => {
      if (response.status === "success") {
        const newData = response.data.map((item) => ({
          color: "success",
          icon: "notifications",
          title: item.title,
          dateTime: formatDateTime(item.date_create),
          description: item.history,
          activityId: item.activityId,
        })).sort((a, b) => b.activityId - a.activityId);

        setRenderTimelineItems(newData);
      } else {
        setRenderTimelineItems([]);
      }
    });
  };

  const filterDate = async (date) => {
    postRequest("/api/activity/inputDate", { elderlyId: id, date }, (response) => {
      if (response.status === "success") {
        const newData = response.data.map((item) => ({
          color: "success",
          icon: "notifications",
          title: item.title,
          dateTime: formatDateTime(item.date_create),
          description: item.history,
          activityId: item.activityId,
        })).sort((a, b) => b.activityId - a.activityId);

        setRenderTimelineItems(newData);
      } else {
        setRenderTimelineItems([]);
      }
    });
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <TimelineList title="Activity history of the elderly" dark={darkMode}>
              {renderTimelineItems.map((item) => (
                <TimelineItem
                  key={item.activityId}
                  color={item.color}
                  icon={item.icon}
                  title={item.title}
                  dateTime={item.dateTime}
                  description={item.description}
                />
              ))}
            </TimelineList>
          </Grid>
          <Grid item xs={12} lg={4}>
            <TimelineList title="Search activities by date" dark={darkMode}>
              <ArgonTypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize"
              >
                Select Time
              </ArgonTypography>
              <ArgonDatePicker
                label="date_create"
                placeholder="date_create"
                name="date_create"
                onChange={(selectedDates) => {
                  const selectedDate = selectedDates[0];
                  // Subtract one day
                  const yesterday = new Date(selectedDate);
                  yesterday.setDate(selectedDate.getDate() + 1);
                  // Format the date as "YYYY-MM-DD"
                  const formattedDate = yesterday.toISOString().split('T')[0];
                  filterDate(formattedDate);
                }}
              />
            </TimelineList>
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Timeline;
