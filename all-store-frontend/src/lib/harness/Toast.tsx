import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SyntheticEvent } from 'react';
import ToastContext from './ToastContext';

export interface ToastProp {
    severity: "success" | "info" | "warning" | "error";
    state: boolean;
    text: string;
}

export function Toast() {
    let toastContext = useContext(ToastContext);
    const handleClose = (event: SyntheticEvent<Element, Event>) => {
        toastContext.setValue({
            severity: toastContext.toaster.severity,
            state: false,
            text: toastContext.toaster.text,
        })
    };
    return <Snackbar open={toastContext.toaster.state} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={toastContext.toaster.severity}>
            {toastContext.toaster.text}
        </MuiAlert>
    </Snackbar>
}