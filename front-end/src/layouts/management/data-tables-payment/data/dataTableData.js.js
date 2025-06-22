import { useState, useEffect } from "react";
import axios from "axios";

const [dataTableData, setDataTableData] = useState({
  columns: [
    { Header: "Payment ID", accessor: "paymentId", width: "10%" },
    { Header: "Content", accessor: "content" },
    { Header: "User ID", accessor: "userId", width: "10%" },
    { Header: "Amount", accessor: "amount", width: "10%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "QR Data", accessor: "qr_data" },
    { Header: "Paid At", accessor: "paid_at" },
    { Header: "Created At", accessor: "created_at" },
    { Header: "Action", accessor: "actionCell" },
  ],
  rows: [],
});

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

const fetchPaymentData = async () => {
  try {
    const response = await api.get("/api/payment");
    const paymentData = response.data.data;

    const formattedData = paymentData.map(payment => ({
      paymentId: payment.paymentId,
      content: payment.content,
      userId: payment.userId,
      amount: payment.amount,
      status: payment.status,
      qr_data: payment.qr_data,
      paid_at: payment.paid_at,
      created_at: payment.created_at,
      actionCell: (
        <div>
          {/* Add action buttons or components here */}
        </div>
      ),
    }));

    setDataTableData(prevState => ({ ...prevState, rows: formattedData }));
  } catch (error) {
    console.error("Error fetching payment data:", error);
  }
};

useEffect(() => {
  fetchPaymentData();
}, []);

export default dataTableData;
