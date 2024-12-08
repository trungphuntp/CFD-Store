import React from "react";

const Select = ({ options, ...rest }) => {
    return (
        <select {...rest} className={`form-control `}>
            {options &&
                options?.map((option, index) => (
                    <option key={option?.value || index} value={option?.value || ""}>
                        {option?.label || ""}
                    </option>
                ))}
        </select>
    );
};

export default Select;
