import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

const SuccessComponent = (props) => {
  const { description, handleClose = () => {}, open } = props;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {description}
      </Alert>
    </Snackbar>
  );
};

export default SuccessComponent;
