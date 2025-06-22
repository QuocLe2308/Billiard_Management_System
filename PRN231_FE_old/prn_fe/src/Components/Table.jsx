import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';


const Table = ({ tableNumber, tableType, tableStart, price, status }) => {
  const [color, setColor] = useState(false);
  const [open, setOpen] = useState(false); // State for dialog visibility

  const handleColor = () => {
    setColor(!color);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div onClick={handleColor}>
        <div className="w-60 h-40 rounded-md bg-slate-200">
          <div className="p-5">
            <p>{tableNumber}</p>
            <p>{tableType}</p>
            <button className="w-20 h-10 bg-blue-700 rounded-md mt-10" onClick={handleOpen}>
              <p className="text-slate-50">Detail</p>
            </button>
          </div>
        </div>
      </div>


      <Dialog open={open} fullWidth="xs" TransitionComponent={Grow}>
        <DialogTitle>Table</DialogTitle>
        <DialogContent>
            <p><strong>Table Number:</strong> {tableNumber}</p>
            <p><strong>Table Type:</strong> {tableType}</p>
            <p><strong>Start Time:</strong> {tableStart}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Status:</strong> {status}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="error" variant="contained">Cancel</Button>
          <Button onClick={handleOpen} color="primary"  variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default Table;
