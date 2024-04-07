import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ open, setOpen, msg, onConfirm }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleClose}>
            No
          </Button>
          <Button onClick={onConfirm}> Yes </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.any,
  msg: PropTypes.string,
  onConfirm: PropTypes.any,
};
