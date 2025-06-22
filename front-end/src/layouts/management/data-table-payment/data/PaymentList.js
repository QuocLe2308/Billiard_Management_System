
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/payment')
            .then(response => {
                setPayments(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Payments</h1>
            <ul>
                {payments.map(payment => (
                    <li key={payment.paymentId}>
                        <p>ID: {payment.paymentId}</p>
                        <p>Content: {payment.content}</p>
                        <p>User ID: {payment.userId}</p>
                        <p>Amount: {payment.amount}</p>
                        <p>Status: {payment.status}</p>
                        <p>QR Data: {payment.qrData}</p>
                        <p>Paid At: {payment.paidAt}</p>
                        <p>Created At: {payment.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentList;
