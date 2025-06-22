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

/** 
  All of the routes for the Argon Dashboard 2 PRO MUI are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 PRO MUI layouts
import Landing from "layouts/dashboards/landing";
import Default from "layouts/dashboards/default";
import Automotive from "layouts/dashboards/automotive";
import SmartHome from "layouts/dashboards/smart-home";
import VRDefault from "layouts/dashboards/virtual-reality/vr-default";
import VRInfo from "layouts/dashboards/virtual-reality/vr-info";
import CRM from "layouts/dashboards/crm";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Teams from "layouts/pages/profile/teams";
import AllProjects from "layouts/pages/profile/all-projects";
import Reports from "layouts/pages/users/reports";
import NewUser from "layouts/pages/users/new-user";
import Settings from "layouts/pages/account/settings";
import Billing from "layouts/pages/account/billing";
import Invoice from "layouts/pages/account/invoice";
import Security from "layouts/pages/account/security";
import General from "layouts/pages/projects/general";
import Timeline from "layouts/pages/projects/timeline";
import NewProject from "layouts/pages/projects/new-project";
import Widgets from "layouts/pages/widgets";
import Charts from "layouts/pages/charts";
import SweetAlerts from "layouts/pages/sweet-alerts";
import Notifications from "layouts/pages/notifications";
import PricingPage from "layouts/pages/pricing-page";
import RTL from "layouts/pages/rtl";
import Kanban from "layouts/applications/kanban";
import Wizard from "layouts/applications/wizard";
import DataTables from "layouts/applications/data-tables";
import Calendar from "layouts/applications/calendar";
import Analytics from "layouts/applications/analytics";
import Overview from "layouts/ecommerce/overview";
import NewProduct from "layouts/ecommerce/products/new-product";
import EditProduct from "layouts/ecommerce/products/edit-product";
import ProductPage from "layouts/ecommerce/products/product-page";
import ProductsList from "layouts/ecommerce/products/products-list";
import OrderList from "layouts/ecommerce/orders/order-list";
import OrderDetails from "layouts/ecommerce/orders/order-details";
import Referral from "layouts/ecommerce/referral";
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpBasic from "layouts/authentication/sign-up/basic";
import SignUpCover from "layouts/authentication/sign-up/cover";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetBasic from "layouts/authentication/reset-password/basic";
import ResetCover from "layouts/authentication/reset-password/cover";
import ResetIllustration from "layouts/authentication/reset-password/illustration";
import LockBasic from "layouts/authentication/lock/basic";
import LockCover from "layouts/authentication/lock/cover";
import LockIllustration from "layouts/authentication/lock/illustration";
import VerificationBasic from "layouts/authentication/2-step-verification/basic";
import VerificationCover from "layouts/authentication/2-step-verification/cover";
import VerificationIllustration from "layouts/authentication/2-step-verification/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";

import DataTablesNurse from "layouts/management/data-tables-nurse";
import DataTablesBida from "layouts/management/data-tables-bida";
import DataTablesProduct from "layouts/management/data-tables-product";
import DataTablesDoctor from "layouts/management/data-tables-doctor";
import DataTablesElderlyMananger from "layouts/management/data-tables-elderly_manager";
import DataTablesUser from "layouts/management/data-tables-user";
import DataTablesElderly from "layouts/management/data-tables-elderly";
import DataTablesRoom from "layouts/management/data-tables-room";
import DataTablesMedicalExamination from "layouts/management/data-tables-medicalExamination";
import DataTablesActivity from "layouts/management/data-tables-activity";
import DataTablesRDS from "layouts/management/data-tables-room-duty-schedule";
import DataTablesSVP from "layouts/management/data-tables-servicepack";
import NewElderly from "layouts/elderly/new-elderly";
import ViewListRoom from "layouts/room";

import DataTablesPayment from "layouts/management/data-tables-payment";
import PaymentDetail from "layouts/management/data-tables-viewdetails";

import TableManagement from "layouts/table-management";
import OrdersList from "layouts/order-list";
// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import { Icon } from "@mui/material";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-shop" />,
    collapse: [
      {
        name: "Landing",
        key: "landing",
        route: "/dashboards/landing",
        component: <SmartHome />,
      },
      {
        name: "Default",
        key: "default",
        route: "/dashboards/default",
        component: <Default />,
      },
      {
        name: "Automotive",
        key: "automotive",
        route: "/dashboards/automotive",
        component: <Automotive />,
      },
      {
        name: "Smart Home",
        key: "smart-home",
        route: "/dashboards/smart-home",
        component: <SmartHome />,
      },
      {
        name: "Virtual Reality",
        key: "virtual-reality",
        collapse: [
          {
            name: "VR Default",
            key: "vr-default",
            route: "/dashboards/virtual-reality/default",
            component: <VRDefault />,
          },
          {
            name: "VR Info",
            key: "vr-info",
            route: "/dashboards/virtual-reality/info",
            component: <VRInfo />,
          },
        ],
      },
      { name: "CRM", key: "crm", route: "/dashboards/crm", component: <CRM /> },
    ],
  },

  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-circle-08" />,
    collapse: [
      {
        name: "Settings",
        key: "settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Billing",
        key: "billing",
        route: "/pages/account/billing",
        component: <Billing />,
      },
      {
        name: "Invoice",
        key: "invoice",
        route: "/pages/account/invoice",
        component: <Invoice />,
      },
      {
        name: "Security",
        key: "security",
        route: "/pages/account/security",
        component: <Security />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-single-02" />,
    collapse: [
      {
        name: "Overview",
        key: "profile-overview",
        route: "/pages/profile/overview",
        component: <ProfileOverview />,
      },
      {
        name: "Teams",
        key: "teams",
        route: "/pages/profile/teams",
        component: <Teams />,
      },
      {
        name: "All Projects",
        key: "all-projects",
        route: "/pages/profile/all-projects",
        component: <AllProjects />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-circle-08" />,
    collapse: [
      {
        name: "Reports",
        key: "reports",
        route: "/pages/users/reports",
        component: <Reports />,
      },
      {
        name: "New User",
        key: "new-user",
        route: "/pages/users/new-user",
        component: <NewUser />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Projects",
    key: "projects",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-building" />,
    collapse: [
      {
        name: "General",
        key: "general",
        route: "/pages/projects/general",
        component: <General />,
      },
      {
        name: "Timeline",
        key: "timeline",
        route: "/pages/projects/timeline",
        component: <Timeline />,
      },
      {
        name: "New Project",
        key: "new-project",
        route: "/pages/projects/new-project",
        component: <NewProject />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Widgets",
    key: "widgets",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-box-2" />,
    collapse: [
      {
        name: "Widgets",
        key: "widgets",
        route: "/pages/widgets",
        component: <Widgets />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Charts",
    key: "charts",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-chart-bar-32" />,
    collapse: [
      {
        name: "Charts",
        key: "charts",
        route: "/pages/charts",
        component: <Charts />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Sweet Alerts",
    key: "sweet-alerts",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-bell-55" />,
    collapse: [
      {
        name: "Sweet Alerts",
        key: "sweet-alerts",
        route: "/pages/sweet-alerts",
        component: <SweetAlerts />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-bell-55" />,
    collapse: [
      {
        name: "Notifications",
        key: "notifications",
        route: "/pages/notifications",
        component: <Notifications />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Pricing",
    key: "pricing",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-basket" />,
    collapse: [
      {
        name: "Pricing Page",
        key: "pricing-page",
        route: "/pages/pricing-page",
        component: <PricingPage />,
      },
    ],
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-world-2" />,
    collapse: [
      {
        name: "RTL",
        key: "rtl",
        route: "/pages/rtl",
        component: <RTL />,
      },
    ],
  },

  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-circle-08" />,
    collapse: [
      {
        name: "Settings",
        key: "settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Invoice",
    key: "invoice",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-money-coins" />,
    collapse: [
      {
        name: "List Invoice",
        key: "data-tables-payment",
        route: "/invoice/data-tables-payment",
        component: <DataTablesPayment />,
        role: true,
        roleShow: [0, 1],
      },
    ],
  },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-ui-04" />,
    collapse: [
      {
        name: "Kanban",
        key: "kanban",
        route: "/applications/kanban",
        component: <Kanban />,
      },
      {
        name: "Wizard",
        key: "wizard",
        route: "/applications/wizard",
        component: <Wizard />,
      },
      {
        name: "Data Tables",
        key: "data-tables",
        route: "/applications/data-tables",
        component: <DataTables />,
      },
      {
        name: "Calendar",
        key: "calendar",
        route: "/applications/calendar",
        component: <Calendar />,
      },
      {
        name: "Analytics",
        key: "analytics",
        route: "/applications/analytics",
        component: <Analytics />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Ecommerce",
    key: "ecommerce",
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-archive-2" />,
    collapse: [
      {
        name: "Overview",
        key: "overview",
        route: "/ecommerce/overview",
        component: <Overview />,
      },
      {
        name: "Products",
        key: "products",
        collapse: [
          {
            name: "New Product",
            key: "new-product",
            route: "/ecommerce/products/new-product",
            component: <NewProduct />,
          },
          {
            name: "Edit Product",
            key: "edit-product",
            route: "/ecommerce/products/edit-product",
            component: <EditProduct />,
          },
          {
            name: "Product Page",
            key: "product-page",
            route: "/ecommerce/products/product-page",
            component: <ProductPage />,
          },
          {
            name: "Products List",
            key: "products-list",
            route: "/ecommerce/products/products-list",
            component: <ProductsList />,
          },
        ],
      },
      {
        name: "Orders",
        key: "orders",
        collapse: [
          {
            name: "Order List",
            key: "order-list",
            route: "/ecommerce/orders/order-list",
            component: <OrderList />,
          },
          {
            name: "Order Details",
            key: "order-details",
            route: "/ecommerce/orders/order-details",
            component: <OrderDetails />,
          },
        ],
      },
      {
        name: "Referral",
        key: "referral",
        route: "/ecommerce/referral",
        component: <Referral />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Room Duty Schedule",
    key: "roomdutyschedule",
    icon: <Icon color="success">article</Icon>,
    role: true,
    roleShow: [1, 2, 3, 4],
    collapse: [
      {
        name: "Room Duty Schedule List",
        key: "data-tables-room-duty-schedule",
        route: "/roomdutyschedule/data-tables-room-duty-schedule",
        role: true,
        roleShow: [1, 2, 3, 4],
        component: <DataTablesRDS />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Room",
    key: "room",
    icon: <Icon color="info">group</Icon>,
    role: true,
    roleShow: [1, 3, 5, 6, 7],
    collapse: [
      {
        name: "View List Room",
        key: "view-list-room",
        route: "/room/view-list-room",
        role: true,
        roleShow: [1, 3, 5],
        component: <DataTablesRoom />,
      },
    ],
  },

  {
    type: "collapse",
    name: "Activity",
    key: "activity",
    icon: <Icon color="info">apps</Icon>,
    role: true,
    roleShow: [0, 1, 3, 5],
    collapse: [
      {
        name: "View List Activity",
        key: "view-list-activity",
        route: "/activity/view-list-activity",
        role: true,
        roleShow: [0, 1, 3, 5],
        component: <DataTablesActivity />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Service Pack",
    key: "servicepack",
    icon: <Icon color="info">bedroomchild</Icon>,
    role: true,
    roleShow: [1, 3, 5, 6, 7],
    collapse: [
      {
        name: "View List Service Pack",
        key: "view-list-servicepack",
        route: "/servicepack/view-list-servicepack",
        role: true,
        roleShow: [1, 3, 5],
        component: <DataTablesSVP />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Table Management",
    key: "table-management",
    icon: <Icon color="info">Table Management</Icon>,
    role: true,
    roleShow: [1],
    collapse: [
      {
        name: "Table Management",
        key: "table-management",
        route: "/table-management/view-all",
        role: true,
        roleShow: [1],
        component: <TableManagement />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Management",
    key: "management",
    icon: <Icon color="dark">group</Icon>,
    role: true,
    roleShow: [1, 3, 5, 6, 7],
    collapse: [
      // {
      //   name: "Data tables Nurse",
      //   key: "data-tables-nurse",
      //   route: "/management/data-tables-nurse",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesNurse />,
      // },
      {
        name: "Data tables Bida",
        key: "data-tables-bida",
        route: "/management/data-tables-bida",
        role: true,
        roleShow: [1],
        component: <DataTablesBida />,
      },
      {
        name: "Data tables Product",
        key: "data-tables-product",
        route: "/management/data-tables-product",
        role: true,
        roleShow: [1],
        component: <DataTablesProduct />,
      },

      // {
      //   name: "Data tables Doctor",
      //   key: "data-tables-doctor",
      //   route: "/management/data-tables-doctor",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesDoctor />,
      // },
      // {
      //   name: "Data tables Elderly Manager",
      //   key: "data-tables-elderly-manager",
      //   route: "/management/data-tables-elderly-manager",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesElderlyMananger />,
      // },
      // {
      //   name: "Data tables User",
      //   key: "data-tables-user",
      //   route: "/management/data-tables-user",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesUser />,
      // },
      // {
      //   name: "Data tables Elderly",
      //   key: "data-tables-elderly",
      //   route: "/management/data-tables-elderly",
      //   role: true,
      //   roleShow: [1, 2, 3, 4, 5],
      //   component: <DataTablesElderly />,
      // },
      // {
      //   name: "Data tables medicalExamination",
      //   key: "data-tables-medicalExamination",
      //   route: "/management/data-tables-medicalExamination",
      //   role: true,
      //   roleShow: [1, 2],
      //   component: <DataTablesMedicalExamination />,
      // },

      // {
      //   name: "Data tables Room",
      //   key: "data-tables-rooms",
      //   route: "/management/data-tables-rooms",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesRoom />,
      // },
      // {
      //   name: "Data tables Ativity",
      //   key: "data-tables-activity",
      //   route: "/management/data-tables-activity",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesActivity />,
      // },
      // {
      //   name: "Data tables Payment",
      //   key: "data-tables-payment",
      //   route: "/management/data-tables-payment",
      //   role: true,
      //   roleShow: [1],
      //   component: <DataTablesPayment />,
      // },
    ],
  },
  {
    type: "collapse",
    name: "Manage Elderly",
    key: "manage-elderly",
    icon: <Icon color="light">accessibility</Icon>,
    role: true,
    roleShow: [0, 1, 2, 3, 4, 5],
    collapse: [
      {
        name: "View List Elderly",
        key: "data-tables-elderly",
        route: "/elderly/data-tables-elderly",
        role: true,
        roleShow: [0, 1, 2, 3, 4, 5],
        component: <DataTablesElderly />,
      },
      {
        name: "Add Elderly",
        key: "add-elderly",
        route: "/elderly/add-elderly",
        role: true,
        roleShow: [0],
        component: <NewElderly />,
      },
    ],
  },
  {
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-in/basic",
            component: <SignInBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-in/illustration",
            component: <SignInIllustration />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/sign-up/basic",
            component: <SignUpBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
            component: <SignUpCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/sign-up/illustration",
            component: <SignUpIllustration />,
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/reset-password/basic",
            component: <ResetBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
            component: <ResetCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/reset-password/illustration",
            component: <ResetIllustration />,
          },
        ],
      },
      {
        name: "Lock",
        key: "lock",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/lock/basic",
            component: <LockBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/lock/cover",
            component: <LockCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/lock/illustration",
            component: <LockIllustration />,
          },
        ],
      },
      {
        name: "2-Step Verification",
        key: "2-step-verification",
        collapse: [
          {
            name: "Basic",
            key: "basic",
            route: "/authentication/verification/basic",
            component: <VerificationBasic />,
          },
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/verification/cover",
            component: <VerificationCover />,
          },
          {
            name: "Illustration",
            key: "illustration",
            route: "/authentication/verification/illustration",
            component: <VerificationIllustration />,
          },
        ],
      },
      {
        name: "Error",
        key: "error",
        collapse: [
          {
            name: "Error 404",
            key: "error-404",
            route: "/authentication/error/404",
            component: <Error404 />,
          },
          {
            name: "Error 500",
            key: "error-500",
            route: "/authentication/error/500",
            component: <Error500 />,
          },
        ],
      },

      {
        key: "payment-detail",
        route: "/payment-detail/:id",
        component: <PaymentDetail />,
      },
      {
        name: "Order List",
        key: "order-list",
        route: "/table-management/order-list/:id",
        role: true,
        roleShow: [1],
        component: <OrdersList />,
      },
    ],
  },
];

export default routes;
