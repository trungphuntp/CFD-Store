import React from "react";

const CheckBox = ({ label, id, isChecked, ...rest }) => {
    return (
        <div className="custom-control custom-checkbox">
            <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                checked={isChecked}
                {...rest}
            />
            <label className="custom-control-label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
