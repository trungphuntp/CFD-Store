import React, { forwardRef } from "react";

export const InputM = (
    {
        isRequired,
        label = "",
        error,
        placeholder = "",
        className,
        name = "",
        renderInput = undefined,
        ...rest
    },
    ref
) => {
    return (
        <div className="form-group">
            {!!label && <label className="label">{`${label} ${!!isRequired ? "*" : ""}`}</label>}

            {renderInput?.({ ...rest, ref, placeholder, isRequired }) || (
                <input
                    placeholder={`${placeholder} ${isRequired && placeholder ? "*" : ""}`}
                    ref={ref}
                    className={`form-control ${!!error ? "input-error" : ""} 
                    ${className ? className : ""} `}
                    name={name}
                    id={name}
                    {...rest}
                />
            )}
            {!!error && <p className="form-error">{error}</p>}
        </div>
    );
};

export const Input = forwardRef(InputM);
