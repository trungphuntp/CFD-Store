import styled from "styled-components";
const StyledInput = styled.input`
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    -moz-appearance: textfield;
`;
const QuantityInput = ({ max = 0, value = 0, className, defaultValue = 0, ...rest }) => {
    return (
        <StyledInput
            {...rest}
            value={value}
            type="number"
            id="qty"
            className={`form-control ${className}`}
            defaultValue={defaultValue}
            min={1}
            max={max}
            step={1}
            data-decimals={0}
            required
        />
    );
};

export default QuantityInput;
