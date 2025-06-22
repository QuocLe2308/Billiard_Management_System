import Grid from "@mui/material/Grid";

// Viện Dưỡng Lão An Nghỉ MUI components
import ArgonBox from "components/ArgonBox";
import Footer from "examples/Footer";

// Viện Dưỡng Lão An Nghỉ MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BaseLayout from "layouts/account/components/BaseLayout";
import BasicInfo from "./components/BasicInfo";

function viewInfo() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox my={3}></ArgonBox>
      
      <Footer />
    </DashboardLayout>
  );
}

export default viewInfo;
