import React, { createContext, useContext, useEffect, useState } from "react";

const RadioGroupContext = createContext();
const RadioGroup = ({ children, onChange, defaultValue = "" }) => {
    const [selectValue, setselectValue] = useState(defaultValue);
    useEffect(() => {
        setselectValue(defaultValue);
    }, [defaultValue]);

    const handleChangeValue = (valueType) => {
        setselectValue(valueType);
        onChange?.(valueType);
    };
    return (
        <RadioGroupContext.Provider value={{ selectValue, handleChangeValue }}>
            {children}
        </RadioGroupContext.Provider>
    );
};

const RadioItem = ({ value, label }) => {
    const { selectValue, handleChangeValue } = useContext(RadioGroupContext);
    return (
        <div className="custom-control custom-radio">
            <input
                type="radio"
                id={value}
                name="shipping"
                className="custom-control-input"
                value={value}
                checked={selectValue === value}
                onChange={(e) => {
                    handleChangeValue(e.target.value);
                }}
            />
            <label className="custom-control-label" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

RadioGroup.Item = RadioItem;
export default RadioGroup;
