import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DataTable from "examples/Tables/DataTable";
import ProductCell from "layouts/order-list/components/ProductCell";
import ActionCell from "layouts/order-list/components/ActionCell";
import getRequest from "components/API_Request/getRequest";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  maxHeight: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
  overflowY: "scroll",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};
const AddOrderModal = ({ open, handleClose, data }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Order
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Danh Sách Đồ Uống
            </Typography>
            <DataTable
              table={data}
              entriesPerPage={{
                defaultValue: 10,
                entries: [5, 10, 15, 20, 25],
              }}
              canSearch
            />
          </Box>
        </Typography>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};
AddOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
export default AddOrderModal;
