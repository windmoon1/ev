import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function Notifications(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHide}
      onClose={props.onClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={props.onClose}
        severity={props.color}
      >
        {props.content}
      </MuiAlert>
    </Snackbar>
  );
}

Notifications.propTypes = {
  open: PropTypes.bool,
  autoHide: PropTypes.number,
  color: PropTypes.string,
  content: PropTypes.string,
  onClose: PropTypes.func,
};
