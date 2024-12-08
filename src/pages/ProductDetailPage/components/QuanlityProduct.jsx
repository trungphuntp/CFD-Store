import QuantityInput from "@/components/QuantityInput";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
    position: absolute;
    top: 0;
`;

const QuanlityProduct = ({ max, defaultValue = 0 }, ref) => {
    const maxNumber = Number(max) || 0;

    console.log(maxNumber);

    const [quantity, setQuantity] = useState(defaultValue);
    useImperativeHandle(ref, () => {
        return {
            value: quantity,
            reset: () => setQuantity(0),
        };
    });

    const onChangeQuanlity = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setQuantity(Number(e?.target.value));
    };

    const onDecrease = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setQuantity((prev) => {
            return prev - 1;
        });
    };
    const onIncrease = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setQuantity((prev) => {
            return prev + 1;
        });
    };

    if (quantity < 0) {
        setQuantity(0);
    }
    if (quantity > maxNumber) {
        setQuantity(maxNumber);
    }

    return (
        <div className="details-filter-row details-row-size">
            <label htmlFor="qty">Qty:</label>
            <div className="product-details-quantity" style={{ position: "relative" }} ref={ref}>
                <StyledButton
                    className="input-group-prepend"
                    style={{ left: 0 }}
                    onClick={onDecrease}
                >
                    <button
                        style={{ minWidth: 26 }}
                        className="btn btn-decrement btn-spinner"
                        type="button"
                    >
                        <i className="icon-minus" />
                    </button>
                </StyledButton>

                <QuantityInput
                    max={maxNumber}
                    value={quantity}
                    onChange={onChangeQuanlity}
                    defaultValue
                />
                <StyledButton
                    className="input-group-append "
                    style={{ right: 0 }}
                    onClick={onIncrease}
                >
                    <button
                        style={{ minWidth: 26 }}
                        className="btn btn-increment btn-spinner"
                        type="button"
                    >
                        <i className="icon-plus" />
                    </button>
                </StyledButton>
            </div>
        </div>
    );
};

export default forwardRef(QuanlityProduct);
