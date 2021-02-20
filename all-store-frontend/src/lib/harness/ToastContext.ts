import React from "react";
import { ToastProp } from "./Toast";

const ToastContext = React.createContext<{
    toaster: ToastProp;
    setValue: (val: ToastProp) => void;
}>({
    toaster: {
        severity: "info",
        state: false,
        text: "string",
    },
    setValue: (val: ToastProp) => { }
});

export default ToastContext;
