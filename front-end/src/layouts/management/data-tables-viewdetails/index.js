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
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";


import {
  Typography,
  Button,
  Box,
  TableCell,
} from "@mui/material";


// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Viện Dưỡng Lão An Nghỉ MUI base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Invoice page components
import PageLayout from "examples/LayoutContainers/PageLayout/index";

// Images
import logoCT from "assets/images/logo-ct.png";
import logoCTDark from "assets/images/logo-ct-dark.png";

// Viện Dưỡng Lão An Nghỉ MUI contexts
import { useArgonController } from "context";
import { useEffect, useState } from "react";
import getRequest from "components/API_Get";
import numeral from "numeral";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import Swal_show from "components/Swal";
function Invoice() {
  const [controller] = useArgonController();
  const { darkMode } = controller;
  const { borderWidth } = borders;
  const { light, dark } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;

  const [invoiceData, setInvoiceData] = useState({
    paymentId: '',
    content: '',
    userId: '',
    amount: '',
    status: '',
    createdAt: '',
    qr_data: '',
    service: [],
  });
  const { id } = useParams();
  useEffect(() => {
    getRequest("/api/payment/" + id, (response) => {
      if (response.status === "success") {
        setInvoiceData(response.data);
        if (response.data.status == 0) {
          const intervalId = setInterval(() => {
            getRequest('/api/payment/check/' + id, (response) => {
              if (response.status === 'success') {
                Swal_show('success', 'Paid, have a nice day!');
                clearInterval(intervalId);
              } else {
                console.log("check continute")
              }
            });
          }, 2000);
          return () => clearInterval(intervalId);
        }
      } else {
        Swal_show('success', response.message);
      }
    });

  }, []);




  function formatDate(originalDateString) {
    const dateObject = new Date(originalDateString);
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds = dateObject.getSeconds().toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  const handlePrint = () => {
    print();
    close();
    //window.open('/account/bill/' + id, '_blank');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById("printable-content");
    doc.html(content, {
      callback: function (doc) {
        doc.save("invoice.pdf");
      }
    });
  };

  function printDiv() {
    var printableContent = document.getElementById("printable-content");
    if (printableContent) {
      var content = printableContent.innerHTML;
      var newWindow = window.open('', '_blank');
      newWindow.document.body.innerHTML = content;
      newWindow.print();
      newWindow.close();
    } else {
      console.error("Không tìm thấy phần tử có ID là 'printable-content'");
    }
  }


  return (

    <PageLayout stickyNavbar>
      <ArgonBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>

            <Card>
              {/* Invoice header */}
              <ArgonBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <ArgonBox
                      component="img"
                      src={darkMode ? logoCT : logoCTDark}
                      width="25%"
                      p={1}
                      mb={1}
                    />
                    <ArgonTypography variant="h6" fontWeight="medium">
                      Vien Duong Lao
                    </ArgonTypography>
                    <ArgonBox mt={1} mb={2}>
                      <ArgonTypography display="block" variant="body2" color="secondary">
                        tel: +1 (909) 5678999
                      </ArgonTypography>
                    </ArgonBox>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <ArgonBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <ArgonBox mt={1}>
                        <ArgonTypography variant="h6" fontWeight="medium">
                          Billed to: John Doe
                        </ArgonTypography>
                      </ArgonBox>
                      <ArgonBox mb={1}>
                        <ArgonTypography variant="body2" color="secondary">
                          3231 S Standard Ave
                          <br />
                          Orange County
                          <br />
                          California
                        </ArgonTypography>
                      </ArgonBox>
                    </ArgonBox>
                  </Grid>
                </Grid>
                <ArgonBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <ArgonTypography variant="h6" color="secondary" fontWeight="medium">
                        Invoice no
                      </ArgonTypography>
                      <ArgonTypography variant="h5" fontWeight="medium">
                        #{invoiceData.paymentId}
                      </ArgonTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <ArgonBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <ArgonBox width="50%">
                          <ArgonTypography variant="h6" color="secondary" fontWeight="medium">
                            Invoice date:
                          </ArgonTypography>
                        </ArgonBox>
                        <ArgonBox width="50%">
                          <ArgonTypography variant="h6" fontWeight="medium">
                            {formatDate(invoiceData.createdAt)}
                          </ArgonTypography>
                        </ArgonBox>
                      </ArgonBox>

                    </Grid>
                  </Grid>
                </ArgonBox>
              </ArgonBox>

              {/* Invoice table */}
              <ArgonBox p={3}>
                <ArgonBox width="100%" overflow="auto" borderRadius="xl">
                  <Table sx={{ minWidth: "32rem" }}>
                    <ArgonBox bgColor="dark" component="thead">
                      <TableRow>
                        <ArgonBox
                          component="th"
                          width={{ xs: "45%", md: "50%" }}
                          py={1.5}
                          px={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <ArgonTypography variant="h6" color="white" fontWeight="medium">
                            Item
                          </ArgonTypography>
                        </ArgonBox>

                        <ArgonBox
                          component="th"
                          py={1.5}
                          pl={30}
                          pr={1}
                          textAlign="left"
                          borderBottom={borderBottom}
                        >
                          <ArgonTypography variant="h6" color="white" fontWeight="medium">
                            Amount
                          </ArgonTypography>
                        </ArgonBox>
                      </TableRow>
                    </ArgonBox>
                    <TableBody>
                      {invoiceData.services && invoiceData.services.map((service, index) => (
                        <TableRow key={index}>
                          <ArgonBox
                            component="td"
                            textAlign="left"
                            p={1}
                            borderBottom={borderBottom}
                          >
                            <ArgonTypography variant="body2" color="text">
                              {service.name}
                            </ArgonTypography>
                          </ArgonBox>
                          <ArgonBox
                            component="td"
                            textAlign="left"
                            py={1}
                            pr={1}
                            pl={30}
                            borderBottom={borderBottom}
                          >
                            <ArgonTypography variant="body2" color="text">
                              {numeral(service.price).format('0,0') + " VNĐ"}
                            </ArgonTypography>
                          </ArgonBox>
                        </TableRow>
                      ))}
                      <TableRow>
                        <ArgonBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <ArgonTypography variant="h5">Total</ArgonTypography>
                        </ArgonBox>
                        <ArgonBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={30}
                          borderBottom={borderBottom}
                        >
                          <ArgonTypography variant="h5">{numeral(invoiceData.amount).format('0,0') + " VNĐ"}</ArgonTypography>
                        </ArgonBox>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ArgonBox>
              </ArgonBox>
              <center>You can scan the QR below to pay<p></p><img width="30%" src={invoiceData.qr_data}></img></center>
              {/* Invoice footer */}
              <ArgonBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <ArgonTypography variant="h5" fontWeight="medium">
                      Thank you!
                    </ArgonTypography>
                    <ArgonBox mt={1} mb={2} lineHeight={0}>
                      <ArgonTypography variant="button" fontWeight="regular" color="secondary">
                        If you encounter any issues related to the invoice you can contact us at:
                      </ArgonTypography>
                    </ArgonBox>
                    <ArgonTypography
                      component="span"
                      variant="h6"
                      fontWeight="medium"
                      color="secondary"
                    >
                      email:{" "}
                      <ArgonTypography component="span" variant="h6" fontWeight="medium">
                        support@
                      </ArgonTypography>
                    </ArgonTypography>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <ArgonBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <ArgonButton color="info" onClick={handlePrint}>
                        Print
                      </ArgonButton>
                    </ArgonBox>
                  </Grid>
                </Grid>
              </ArgonBox>
            </Card>
          </Grid>
        </Grid>
      </ArgonBox>
    </PageLayout >
  );
}

export default Invoice;
