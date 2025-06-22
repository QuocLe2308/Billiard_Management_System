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
import getRequest from "components/API_Get";
import ArgonBadge from "components/ArgonBadge";



function ElderlyPaperInfo(data_user) {
  const [values,setValues]= useState({
    healthInsuranceCard: {
      cardNo: "",
      placeOfIssue: "",
      placeOfConsultation: "",
      dateOfEffect: "",
    },
    identificationCard: {
      cardNo: "",
      placeOfOrigin: "",
      placeOfResidence: "",
      placeOfIssue: "",
      dateOfIssue: "",
      expiredDate: "",
    },
  });
  const formatExpiryDate = (datetimeString) => {
    const expiryDateTime = new Date(datetimeString);
    const year = expiryDateTime.getFullYear();
    const month = (expiryDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = expiryDateTime.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchData = () => {
    getRequest("/api/paperwork/"+data_user.data_user, (response) => {
      if (response.status === "success") {
        const newData = {
          healthInsuranceCard: {
            cardNo: response.data.healthInsuranceCard.cardNo,
            placeOfIssue: response.data.healthInsuranceCard.placeOfIssue,
            placeOfConsultation:response.data.healthInsuranceCard.placeOfConsultation,
            dateOfEffect: response.data.healthInsuranceCard.dateOfEffect,
          },
          identificationCard: {
            cardNo: response.data.identificationCard.cardNo,
            placeOfOrigin:response.data.identificationCard.placeOfOrigin,
            placeOfResidence:response.data.identificationCard.placeOfResidence,
            placeOfIssue:response.data.identificationCard.placeOfIssue,
            dateOfIssue: response.data.identificationCard.dateOfIssue,
            expiredDate:response.data.identificationCard.expiredDate,
          },
        };
        setValues(newData);
      } else {
        console.error("API Error:", response.error); // Log the error from the API if it's available
      }
    });
  };
  const resetValues = () => {
    setValues({
      healthInsuranceCard: {
        cardNo: "",
        placeOfIssue: "",
        placeOfConsultation: "",
        dateOfEffect: "",
      },
      identificationCard: {
        cardNo: "",
        placeOfOrigin: "",
        placeOfResidence: "",
        placeOfIssue: "",
        dateOfIssue: "",
        expiredDate: "",
      },
    });
  };
  
  useEffect(() => {
    resetValues();
    fetchData();
  }, []);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
                      <ArgonBox p={3}>
                        <ArgonTypography variant="h5">Elderly&apos;s paperwork </ArgonTypography>
                      </ArgonBox>
                     <ArgonBox  pb={3} px={3} mb mr ml style={{ border: "2px solid #8bd8e3", borderRadius: "8px" }}>
                     <ArgonBox component="form" pb={3} px={3}>
                     <ArgonBox p={2} m={2} display="flex" justifyContent="center" alignItems="center" >
                        <ArgonBadge
                         m={3}
                          circular={true}
                          border={true}
                            variant="gradient"
                            color="light"
                            badgeContent="Identification Card"
                            container
                          />
                      </ArgonBox>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Card No." value={values.identificationCard.cardNo} disabled={true}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Place Of Origin" value={values.identificationCard.placeOfOrigin} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Place Of Residence" value={values.identificationCard.placeOfResidence} disabled={true}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Place Of Issue" value={values.identificationCard.placeOfIssue} disabled={true}/>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Date Of Issue"value={formatExpiryDate(values.identificationCard.dateOfIssue)} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Expired Date"value={formatExpiryDate(values.identificationCard.expiredDate)} disabled={true}/>
                          </Grid>
                        </Grid>
                      </ArgonBox>
                     </ArgonBox>
                     <ArgonBox  p={2} mr ml mb style={{ border: "2px solid #8bd8e3", borderRadius: "8px" }}>
                     <ArgonBox component="form" pb={3} px={3}>
                     <ArgonBox p={2}  mb={2} display="flex" justifyContent="center" alignItems="center" >
                     <ArgonBadge
                         m={3}
                          circular={true}
                          border={true}
                            variant="gradient"
                            color="light"
                            badgeContent="Health Insurance Card"
                            container
                          />
                      </ArgonBox>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Card No." value={values.healthInsuranceCard.cardNo} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Date Of Effect" value={formatExpiryDate(values.healthInsuranceCard.dateOfEffect)} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Place Of Consultation" value={values.healthInsuranceCard.placeOfConsultation} disabled={true} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormField label="Resident" value={values.healthInsuranceCard.placeOfIssue} disabled={true}/>
                          </Grid>
                        </Grid>
                      </ArgonBox>
                     </ArgonBox>
                    </Card>
  );
}

export default ElderlyPaperInfo;
