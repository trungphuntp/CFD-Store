import React, { forwardRef } from "react";

const Textarea = ({ placeholder = "", className, error, isRequired = "", ...rest }, ref) => {
    return (
        <textarea
            placeholder={`${placeholder} ${isRequired ? "*" : ""}`}
            ref={ref}
            className={`form-control ${!!error ? "input-error" : ""} ${className ? className : ""}`}
            {...rest}
        />
    );
};

export default forwardRef(Textarea);
