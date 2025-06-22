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
import { useState, useEffect } from "react";
import axios from "axios";
const [dataTableData, setDataTableData] = useState({
  columns: [
    { Header: "id", accessor: "id", width: "20%" },
    { Header: "fullname", accessor: "fullname", width: "25%" },
    { Header: "email", accessor: "email" },
    { Header: "username", accessor: "username", width: "7%" },
    { Header: "role", accessor: "role" },
  ],
  rows: [],
});

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

const fetchData = async () => {
  try {
    const response = await api.get("/api/user");
    const userData = response.data.data;

    const formattedData = userData.map(user => ({
      id: user.userId,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
    }));

    setDataTableData(prevState => ({ ...prevState, rows: formattedData }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, []);

export default dataTableData;
