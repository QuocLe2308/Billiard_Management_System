import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle,  TextField
} from '@mui/material';
import Swal from 'sweetalert2';

const column = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'tableNumber', label: 'Table Number', minWidth: 100 },
  { id: 'tableType', label: 'Type', minWidth: 170, align: 'right' },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right' },
  { id: 'action', label: 'Action', minWidth: 150, align: 'center' }
];

export default function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [dataTableData, setDataTableData] = useState({
    columns: column,
    rows: [],
  });
  
  const [value, setValue] = useState({
    tableId: '',
    tableNumber: '',
    tableType: '',
    price: '',
    tableStart: '2024-01-01T00:00:00', // giá trị mặc định cho tableStart (ví dụ)
    status: 'available'
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5011/tables");
      if (response.status === 200) {
        const data = response.data;
        const formatted = data.map((table) => ({
          id: table.tableId,
          tableNumber: table.tableNumber,
          tableType: table.tableType,
          price: table.price
        }));
        setDataTableData((prevState) => ({ ...prevState, rows: formatted }));
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (row) => {
    setValue({
      tableId: row.id,
      tableNumber: row.tableNumber,
      tableType: row.tableType,
      price: row.price,
      tableStart: '2024-01-01T00:00:00', // default value for tableStart
      status: 'available' // default value for status
    });
    setOpen(true);
  };
  
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenAddDialog = () => {
    setOpen(true);
  }

  const handleCloseAddDialog = () => {
    setOpen(false);
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5011/tables/${value.tableId}`, value);
      fetchData(); 
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className='flex items-center justify-center mt-12'>
      <Paper sx={{ width: '80%', overflow: 'hidden' }}>
        <Button variant='contained' color='primary' sx={{ margin: "10px" }} onClick={handleOpenAddDialog}>
          Add table
        </Button>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {dataTableData.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: '#f1f5f9' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTableData.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {column.map((column) => {
                        const cellValue = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'action' ? (
                              <div>
                                <Button variant='contained' color='warning' sx={{ margin: "5px" }} onClick={() => handleOpenDialog(row)}>
                                  Update
                                </Button>
                                <Button variant='contained' color='error' onClick={handleDelete}>
                                  Delete
                                </Button>
                              </div>
                            ) : (
                              cellValue 
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataTableData.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Update Table Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="tableNumber"
            name="tableNumber"
            label="Table Number"
            type="text"
            fullWidth
            variant="standard"
            value={value.tableNumber}
            onChange={(e) => setValue({ ...value, tableNumber: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="tableType"
            name="tableType"
            label="Table Type"
            type="text"
            fullWidth
            variant="standard"
            value={value.tableType}
            onChange={(e) => setValue({ ...value, tableType: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={value.price}
            onChange={(e) => setValue({ ...value, price: e.target.value })}
          />
          <input type="hidden" value={value.tableStart} />
          <input type="hidden" value={value.status} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open}  fullWidth>
        <DialogTitle>Update Table Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="tableNumber"
            name="tableNumber"
            label="Table Number"
            type="text"
            fullWidth
            variant="standard"
            value={value.tableNumber}
            onChange={(e) => setValue({ ...value, tableNumber: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="tableType"
            name="tableType"
            label="Table Type"
            type="text"
            fullWidth
            variant="standard"
            value={value.tableType}
            onChange={(e) => setValue({ ...value, tableType: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={value.price}
            onChange={(e) => setValue({ ...value, price: e.target.value })}
          />
          <input type="hidden" value={value.tableStart} />
          <input type="hidden" value={value.status} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="error">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant='contained'>Add</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
