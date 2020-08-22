import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeDialog2}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeDialog1} color={props.colorLeft}>
            {props.textLeft}
          </Button>
          <Button
            onClick={props.closeDialog2}
            color={props.colorRight}
            autoFocus
          >
            {props.textRight}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  closeDialog1: PropTypes.func,
  closeDialog2: PropTypes.func,
  colorLeft: PropTypes.string,
  colorRight: PropTypes.string,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
};
