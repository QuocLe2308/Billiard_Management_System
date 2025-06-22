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

import { useEffect, useState } from "react";

// @mui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonSelect from "components/ArgonSelect";
import ArgonTagInput from "components/ArgonTagInput";

// Settings page components
import FormField from "layouts/account/components/FormField";

// Data
import selectData from "layouts/account/settings/components/BasicInfo/data/selectData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import getRequest from "components/API_Get";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ArgonBadge from "components/ArgonBadge";
import ElderlyPaperInfo from "../paperworksInfo";
import TimelineItem from "examples/Timeline/TimelineItem";
import TimelineList from "examples/Timeline/TimelineList";
import { useParams } from "react-router-dom";
import DefaultItem from "../DefaultItem";

function ElderlyInfo() {
  const { id } = useParams();
  const [values, setValues] = useState({
    fullNameElderly: "",
    birthdayElderly: "",
    genderElderly: "",
    resident: "",
    domicile: "",
    roomName: "",
    status: "",
    relative: "",
    serviceId: "",
  });

  const [medical, setMedical] = useState({
    surgicalHistory: "",
    allergyHistory: "",
    psychologicalHistory: "",
    medicalHistory: "",
  });

  const fetchDataMedical = () => {
    getRequest("/api/history/" + id, (response) => {
      if (response.status === "success") {
        const newData = {
          surgicalHistory:response.data.surgicalHistory,
          allergyHistory: response.data.allergyHistory,
          psychologicalHistory: response.data.psychologicalHistory,
          medicalHistory: response.data.medicalHistory,
        };
        setMedical(newData);
      } else {
        console.error("API Error:", response.error); // Log the error from the API if it's available
      }
    });
  };

  const serviceIdMapping = {
    1: "BASIC PACKAGE",
    2: "REGULAR PACKAGE",
    3: "ADVANCED PACKAGE",
  };
  const [timelineData, setTimelineData] = useState([]);
  const fetchData = () => {
    getRequest("/api/elderly/" + id, (response) => {
      if (response.status === "success") {
        const newData = {
          fullNameElderly: response.data.fullNameElderly,
          birthdayElderly: response.data.birthdayElderly,
          genderElderly: response.data.genderElderly,
          resident: response.data.resident,
          domicile: response.data.domicile,
          roomName: response.data.roomName,
          status: response.data.status,
          relative: response.data.relative,
          serviceId: serviceIdMapping[response.data.serviceId],
        };
        setValues(newData);
      } else {
        console.error("API Error:", response.error); // Log the error from the API if it's available
      }
    });
  };
  const fetchActivity = async () => {
    try {
      getRequest("/api/activity/elderly/" + id, (response) => {
        console.log("act 1", response);
        if (response.status === "success") {
          const newData = response.data
            .map((item) => ({
              color: "success",
              icon: "notifications",
              title: item.title,
              dateTime: item.time,
              description: item.history,
              activityId: item.activityId,
            }))
            .sort((a, b) => b.activityId - a.activityId)
            .slice(0, 5);
          setTimelineData(newData);
          console.log("act", timelineData);
        } else {
        }
      });
    } catch (error) {}
  };
  const formatDate = (datetimeString) => {
    const expiryDateTime = new Date(datetimeString);
    const year = expiryDateTime.getFullYear();
    const month = (expiryDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = expiryDateTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const renderTimelineItems = timelineData.map(
    ({ color, icon, title, dateTime, description, badges, lastItem }) => (
      <TimelineItem
        key={title + color}
        color={color}
        icon={icon}
        title={title}
        dateTime={formatDate(dateTime)}
        description={description}
        badges={badges}
        lastItem={lastItem}
      />
    )
  );
  const resetValues = () => {
    setValues({
      fullNameElderly: "",
      birthdayElderly: "",
      genderElderly: "",
      resident: "",
      domicile: "",
      roomName: "",
      status: "",
      relative: "",
      serviceId: "",
    });
    setTimelineData([]);
  };

  useEffect(() => {
    resetValues();
    fetchData();
    fetchActivity();
    fetchDataMedical();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ArgonBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <ArgonBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <ArgonBox mb={2}>
                    <Card id="basic-info" sx={{ overflow: "visible" }}>
                      <ArgonBox p={3}>
                        <ArgonTypography variant="h5">Basic Infomation</ArgonTypography>
                      </ArgonBox>
                      <ArgonBox component="form" pb={3} px={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormField
                              label="fullname"
                              value={values.fullNameElderly}
                              disabled={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField
                              label="Date of birth"
                              value={formatDate(values.birthdayElderly)}
                              disabled={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField
                              label="Gender"
                              value={values.genderElderly}
                              disabled={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Resident" value={values.resident} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Domicile" value={values.domicile} disabled={true} />
                          </Grid>
                        </Grid>
                      </ArgonBox>
                    </Card>
                  </ArgonBox>
                  <ElderlyPaperInfo data_user={id} />
                </Grid>
                <Grid item xs={4}>
                  <ArgonBox mb>
                    <Card>
                      <ArgonBox p={3}>
                        <ArgonBox display="flex" justifyContent="space-between" pb={3}>
                          <ArgonTypography variant="h5">Subscription Details</ArgonTypography>
                          {values.status === 1 ? (
                            <ArgonBadge
                              variant="gradient"
                              color="success"
                              badgeContent="live in"
                              container
                            />
                          ) : (
                            <ArgonBadge
                              variant="gradient"
                              color="warning"
                              badgeContent="Awaiting review"
                              container
                            />
                          )}
                        </ArgonBox>
                        <ArgonBox
                          p={1}
                          mb
                          style={{ border: "2px solid #8bd8e3", borderRadius: "8px" }}
                        >
                          <MiniStatisticsCard
                            direction="right"
                            bgColor="white"
                            title={{ text: "service pack", fontWeight: "medium" }}
                            count={values.serviceId}
                            icon={{ color: "#c28be3", component: "paid" }}
                          />
                        </ArgonBox>
                        <ArgonBox
                          p={1}
                          style={{ border: "2px solid #8bd8e3", borderRadius: "8px" }}
                        >
                          <MiniStatisticsCard
                            bgColor="white"
                            title={{ text: "room-bed", fontWeight: "medium" }}
                            count={values.roomName}
                            icon={{ color: "#c28be3", component: "bed" }}
                          />
                        </ArgonBox>
                      </ArgonBox>
                    </Card>
                  </ArgonBox>
                  <hr
                    style={{
                      border: "none",
                      height: "2px",
                      backgroundColor: "#F7C566",
                      margin: "20px",
                    }}
                  />
                  <ArgonBox mb={2}>
                    <Card>
                      <ArgonBox>
                        <Card>
                          <ArgonBox display="flex" justifyContent="space-between" p={3}>
                            <ArgonBadge
                              variant="gradient"
                              color="warning"
                              badgeContent="Medical"
                              container
                            />
                            <ArgonTypography variant="h5">
                              Elderly&apos;s Background
                            </ArgonTypography>
                          </ArgonBox>
                          <ArgonBox>
                            <ArgonBox m={0.25} display="flex" justifyContent="center"></ArgonBox>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={6}>
                                <ArgonBox p={2}>
                                  <DefaultItem
                                   
                                    icon="sickIcon"
                                    title={medical.medicalHistory}
                                    description="Medical History"
                                  />
                                </ArgonBox>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <ArgonBox p={2}>
                                  <DefaultItem
                                    icon="vaccinesicon"
                                    title={medical.allergyHistory}
                                    description="Allergy History"
                                  />
                                </ArgonBox>
                              </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={6}>
                                <ArgonBox p={2}>
                                  <DefaultItem
                                    icon="medicationLiquidIcon"
                                    title={medical.surgicalHistory}
                                    description="Surgical History"
                                  />
                                </ArgonBox>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <ArgonBox p={2}>
                                  <DefaultItem
                                    icon="psychologyAltIcon"
                                    title={medical.psychologicalHistory}
                                    description="Psychological History"
                                  />
                                </ArgonBox>
                              </Grid>
                            </Grid>
                          </ArgonBox>
                        </Card>
                      </ArgonBox>
                    </Card>
                  </ArgonBox>
                  <hr
                    style={{
                      border: "none",
                      height: "2px",
                      backgroundColor: "#F7C566",
                      margin: "20px",
                    }}
                  />
                  <ArgonBox>
                    <Card sx={{ backgroundColor: "#41C9E2" }}>
                      <ArgonBox display="flex" justifyContent="center" alignItems="center">
                        <ArgonTypography m={1} variant="h5">
                          Time Line
                        </ArgonTypography>
                      </ArgonBox>
                      <TimelineList title="Recent Activities">{renderTimelineItems}</TimelineList>
                    </Card>
                  </ArgonBox>
                </Grid>
              </Grid>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ElderlyInfo;
