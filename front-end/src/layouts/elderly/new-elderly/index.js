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

import { useState } from "react";
import * as Yup from "yup";
// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";

// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewUser page components
import UserInfo from "layouts/elderly/new-elderly/components/UserInfo";
import Pack from "layouts/elderly/new-elderly/components/Pack";

// NewUser layout schemas for form and form feilds
import validations from "layouts/elderly/new-elderly/schemas/validations";
import form from "layouts/elderly/new-elderly/schemas/form";
import initialValues from "layouts/elderly/new-elderly/schemas/initialValues";
import postRequest from "components/API_Post";
import Swal_show from "components/Swal";
import putRequest from "components/API_Put";
import getRequest from "components/API_Get";
import { useNavigate } from "react-router-dom";

function getSteps() {
  return ["Info Elderly", "Service Pack"];
}

function getStepContent(
  stepIndex,
  formData,
  genderV,
  handleGenderChange,
  servicepackV,
  handleServicepackChange,
  data,
  roomV,
  handleRoomChange,
  data_room,
  isHealthInsurance,
  handleisHealthInsuranceChange,
  BirthdayV,
  handleBirthdayChange
) {
  switch (stepIndex) {
    case 0:
      return (
        <UserInfo
          formData={formData}
          BirthdayV={BirthdayV}
          setBirthdayV={handleBirthdayChange}
          genderV={genderV}
          setGenderV={handleGenderChange}
          isHealthInsurance={isHealthInsurance}
          setisHealthInsuranceChange={handleisHealthInsuranceChange}
        />
      );
    case 1:
      return (
        <Pack
          formData={formData}
          servicepackV={servicepackV}
          setServicepackV={handleServicepackChange}
          data={data}
          roomV={roomV}
          setRoomV={handleRoomChange}
          data_room={data_room}
        />
      );
    default:
      return null;
  }
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const [loadpack, setLoadpack] = useState(0);

  const [loadroom, setLoadroom] = useState(0);

  const [genderV, setGenderV] = useState("male");

  const [BirthdayV, setBirthdayV] = useState();

  const [servicepackV, setServicepackV] = useState("none");

  const [roomV, setRoomV] = useState("none");

  const [ElderlyID, setElderlyID] = useState();

  const [data, setData] = useState([]);

  const [data_room, setData_room] = useState([]);

  const [isHealthInsurance, setIsHealthInsurance] = useState("true");

  const handleGenderChange = (event) => {
    const { value } = event.target;
    setGenderV(value);
  };

  const schema = Yup.object().shape({
    Birthday: Yup.date()
      .required("Birthday is required")
      .max(new Date(), "Birthday must be before current date"),
  });

  const handleBirthdayChange = (value) => {
    setBirthdayV(value);
  };

  const handleisHealthInsuranceChange = (event) => {
    const { value } = event.target;
    setIsHealthInsurance(value);
  };

  const handleServicepackChange = (event) => {
    const { value } = event.target;
    if (value != "none") {
      getRequest("/api/room/servicePack/" + value, (response) => {
        if (response.status === "success") {
          setServicepackV(value);
          setData_room(response.data);
        } else {
          Swal_show("error", response.message);
        }
      });
    }
  };

  const handleRoomChange = (roomId) => {
    //const updatedValues = { ...values, room: roomV };
    //console.log(updatedValues.room)
    if (roomId == "") {
      Swal_show("error", "This room is occupied by elderly people");
    } else {
      setRoomV(roomId);
    }
  };

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submitForm = async (values, actions) => {
    // eslint-disable-next-line no-alert
    const updatedValues = { ...values, gender: genderV };
    actions.setSubmitting(false);
    //actions.resetForm();
    setActiveStep(0);
  };

  if (loadpack == 0) {
    getRequest("/api/servicePack", (response) => {
      if (response.status === "success") {
        setLoadpack(1);
        setData(response.data);
      } else {
        Swal_show("error", response.message);
      }
    });
  }

  const createElderly = async (values, actions) => {
    const updatedValues = { ...values, gender: genderV, room: roomV, servicepack: servicepackV };
    postRequest(
      "/api/elderly",
      {
        fullname: updatedValues.Name,
        birthday: updatedValues.Birthday,
        gender: updatedValues.gender,
        domicileAddress: updatedValues.domicile,
        serviceId: updatedValues.servicepack,
        roomId: updatedValues.room,
        status: 0,
        isRemoved: 0,
        paymentTime: 0,
      },
      (response) => {
        console.log(response);
        if (response.status === "success") {
          Swal_show("success", "Elderly create successfully");
        } else {
          Swal_show("success", response.message);
        }
      }
    );
    actions.setSubmitting(false);
    actions.resetForm();
    setActiveStep(0);
    navigate("/view/elderly/" + ElderlyID);
    setActiveStep(0);
  };
  let navigate = useNavigate();
  const updateServiceRoom = async (values, actions) => {
    //const updatedValues = { ...values, gender: genderV, room: roomV, servicepack: servicepackV };
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      createElderly(values, actions);
      //updateServiceRoom(values, actions);
    } else {
      if (activeStep == 0) {
        setActiveStep(activeStep + 1);
      }
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                display: "grid",
                alignItems: "center",
                position: "relative",
                height: "6rem",
                borderRadius: "lg",
                mb: 3,
              }}
            >
              <Stepper activeStep={activeStep} sx={{ margin: 0 }} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Card>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <ArgonBox p={2}>
                      <ArgonBox>
                        {getStepContent(
                          activeStep,
                          {
                            values,
                            touched,
                            formField,
                            errors,
                          },
                          genderV,
                          handleGenderChange,
                          servicepackV,
                          handleServicepackChange,
                          data,
                          roomV,
                          handleRoomChange,
                          data_room
                        )}
                        <ArgonBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <ArgonBox />
                          ) : (
                            <ArgonButton variant="gradient" color="light" onClick={handleBack}>
                              Back
                            </ArgonButton>
                          )}
                          <ArgonButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "Send" : "Next"}
                          </ArgonButton>
                        </ArgonBox>
                      </ArgonBox>
                    </ArgonBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewUser;
