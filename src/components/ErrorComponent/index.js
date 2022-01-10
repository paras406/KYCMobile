import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const ErrorComponent = (props) => {
    const {
        heading = "Error",
        description,
        handleClose = () => {},
        open,
    } = props;

    return (
        <Snackbar open={open} onClose={handleClose}>
           <Alert severity="error" onClose={handleClose}>
                <AlertTitle>{heading}</AlertTitle>
                {description}
            </Alert>
        </Snackbar>   
    );
}

export default ErrorComponent;