import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, Stack, Tooltip } from '@mui/material';
import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';
import DataTable from 'examples/Tables/DataTable';
import Swal_show from 'components/Swal';
import getRequest from 'components/API_Get';
import ExportFileRole5 from 'components/exportFile/exportRole5';
import { Link } from 'react-router-dom';
import { actions } from 'react-table';
import putRequest from 'components/API_Put';
import deleteRequest from 'components/API_Delete';
import postRequest from 'components/API_Post';
import { Payment } from '@mui/icons-material';

function PaymentDetails() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [add, setAdd] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [id_payment, setId_payment] = useState();
  const [values, setValues] = useState({
    content: '',
    userId: '',
    amount: '',
    status: '',
    qrData: '',
    paidAt: '',
    createdAt: '',
  });

  // Validation and input state
  const [inputErrors, setInputErrors] = useState({
    content: false,
    userId: false,
    amount: false,
    status: false,
    qrData: false,
    paidAt: false,
    createdAt: false,
  });

  const [inputSuccess, setInputSuccess] = useState({
    content: false,
    userId: false,
    amount: false,
    status: false,
    qrData: false,
    paidAt: false,
    createdAt: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    content: '',
    userId: '',
    amount: '',
    status: '',
    qrData: '',
    paidAt: '',
    createdAt: '',
  });

  // Fetch payments data from API
  const fetchPayments = async () => {
    try {
      setLoading(true);
      getRequest('/api/payment', (response) => {
        if (response.status === 'success') {
          const paymentData = response.data;
          const formattedData = paymentData.map((payment) => ({
            paymentId: payment.paymentId,
            content: payment.content,
            userId: payment.userId,
            amount: payment.amount,
            status: payment.status,
            qrData: payment.qrData,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt,
            actionCell: (
              <ArgonBox display='flex' alignItems='center'>
                {/* Edit button */}
                {1 == 1 && (
                  <ArgonTypography
                    variant='body1'
                    color='secondary'
                    sx={{ cursor: 'pointer', lineHeight: 0 }}
                  >
                    <Tooltip title='Edit' placement='top'>
                      <Icon onClick={() => getInfo(payment.paymentId)}>edit</Icon>
                    </Tooltip>
                  </ArgonTypography>
                )}

                {/* Delete button */}
                <Link to='' style={{ textDecoration: 'none' }}>
                  <ArgonTypography
                    variant='body1'
                    color='secondary'
                    sx={{ cursor: 'pointer', lineHeight: 0 }}
                  >
                    <Tooltip title='Delete' placement='left'>
                      <Icon onClick={() => deletePayment(payment.paymentId)}>delete</Icon>
                    </Tooltip>
                  </ArgonTypography>
                </Link>
              </ArgonBox>
            ),
          }));
          setPayments(formattedData);
        } else {
          Swal_show('error', 'Error, please login again!');
        }
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [refreshCount]); // Refresh when refreshCount changes

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setInputErrors({ ...inputErrors, [name]: false });
    setInputSuccess({ ...inputSuccess, [name]: false });
  };

  // Validate form inputs
  const validateForm = (values, setInputErrors, setInputSuccess) => {
    let errorsFound = false;
    const newErrors = {};
    const newSuccess = {};
    const newErrorMessage = {};

    // Example validation rules
    if (values.content.trim() === '') {
      newErrors.content = true;
      errorsFound = true;
      newErrorMessage.content = 'Content cannot be empty';
    } else {
      newSuccess.content = true;
    }

    // Add more validation rules as needed

    setInputSuccess({ ...inputSuccess, ...newSuccess });
    setInputErrors({ ...inputErrors, ...newErrors });
    setErrorMessage({ ...errorMessage, ...newErrorMessage });

    return errorsFound;
  };

  // Reset form inputs and state
  const resetForm = () => {
    setValues({
      content: '',
      userId: '',
      amount: '',
      status: '',
      qrData: '',
      paidAt: '',
      createdAt: '',
    });
    setInputErrors({
      content: false,
      userId: false,
      amount: false,
      status: false,
      qrData: false,
      paidAt: false,
      createdAt: false,
    });
    setInputSuccess({
      content: false,
      userId: false,
      amount: false,
      status: false,
      qrData: false,
      paidAt: false,
      createdAt: false,
    });
    setErrorMessage({
      content: '',
      userId: '',
      amount: '',
      status: '',
      qrData: '',
      paidAt: '',
      createdAt: '',
    });
  };

  // Handle save payment
  const handleSavePayment = async () => {
    if (!validateForm(values, setInputErrors, setInputSuccess)) {
      if (isEdit) {
        // Update existing payment
        putRequest('/api/payment/' + id_payment, values, (response) => {
          if (response.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Payment updated successfully',
            });
            fetchPayments();
            handleClose();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
            });
          }
        });
      } else {
        // Add new payment
        postRequest('/api/payment', values, (response) => {
          if (response.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Payment added successfully',
            });
            fetchPayments();
            handleClose();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
            });
          }
        });
      }
    }
  };

  // Handle delete payment
  const deletePayment = async (paymentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this payment?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest('/api/payment/' + paymentId, (response) => {
          if (response.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Payment deleted successfully',
            });
            fetchPayments();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete payment',
            });
          }
        });
      }
    });
  };

  // Fetch payment details for editing
  const getPaymentDetails = async (paymentId) => {
    setId_payment(paymentId);
    getRequest('/api/payment/' + paymentId, (response) => {
      if (response.status === 'success') {
        const payment = response.data;
        setValues({
          content: payment.content,
          userId: payment.userId,
          amount: payment.amount,
          status: payment.status,
          qrData: payment.qrData,
          paidAt: payment.paidAt,
          createdAt: payment.createdAt,
        });
        setEdit(true);
        setAdd(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch payment details',
        });
      }
    });
  };

  // Close modal dialog
  const handleClose = () => {
    setAdd(false);
    setEdit(false);
    resetForm();
  };

  return (
    <>
      {/* Your UI for displaying payments */}
      {/* Example Card component */}
      <Card>
        {/* Example usage of DataTable or any other UI component to display payments */}
        {loading ? (
          <ArgonBox
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100px' // Adjust as needed
          >
            <CircularProgress color='inherit' size={40} />
          </ArgonBox>
        ) : (
          <DataTable table={dataTableData} onDeleteRow={fetchPayments} />
        )}
      </Card>

      {/* Dialog for adding/editing payments */}
      <Dialog open={add}>
        <DialogTitle>{isEdit ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
        <DialogContent>
          <ArgonBox component='form' pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {/* Example of form fields, adjust based on your actual fields */}
                <Payment
                  variant='outlined'
                  label='Content'
                  name='content'
                  value={values.content}
                  onChange={handleInputChange}
                  fullWidth
                  error={inputErrors.content}
                  helperText={errorMessage.content}
                />
              </Grid>
              {/* Add more form fields as needed */}
            </Grid>
          </ArgonBox>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={handleSavePayment}>
            {isEdit ? 'Save' : 'Add'}
          </Button>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PaymentDetails;
