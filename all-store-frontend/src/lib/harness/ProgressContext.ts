import React from "react";

const ProgressContext = React.createContext({
    isLoading: false,
    setValue: (val: boolean) => { }
});

export default ProgressContext;
