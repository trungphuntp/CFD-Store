import QuantityInput from "@/components/QuantityInput";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const StyledButton = styled.div`
    position: absolute;
    top: 0;
`;

const StyledQuantity = styled.div``;

const QuanlityProduct = ({ max, defaultValue = 1, onChange }, ref) => {
    const maxNumber = Number(max) || 0;
    const [quantity, setQuantity] = useState(defaultValue);
    useImperativeHandle(ref, () => {
        return {
            value: quantity,
            reset: () => setQuantity(defaultValue),
        };
    });

    useEffect(() => {
        onChange?.(quantity);
    }, [quantity]);

    const monifyQuantity = (quantity) => {
        if (quantity === "") return;

        if (quantity <= 0) {
            setQuantity(defaultValue);
        }

        if (quantity > maxNumber) {
            setQuantity(maxNumber);
        }
    };

    const onChangeQuanlity = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        e.target.value !== "" ? setQuantity(Number(e?.target.value)) : setQuantity(e.target.value);
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

    const onBlurQuantity = () => {
        if (quantity === "" || quantity === 0) {
            setQuantity(defaultValue);
        }
    };

    monifyQuantity(quantity);

    return (
        <StyledQuantity
            className="product-details-quantity"
            style={{ position: "relative" }}
            ref={ref}
        >
            <StyledButton className="input-group-prepend" style={{ left: 0 }} onClick={onDecrease}>
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
                onBlur={onBlurQuantity}
                defaultValue
            />
            <StyledButton className="input-group-append " style={{ right: 0 }} onClick={onIncrease}>
                <button
                    style={{ minWidth: 26 }}
                    className="btn btn-increment btn-spinner"
                    type="button"
                >
                    <i className="icon-plus" />
                </button>
            </StyledButton>
        </StyledQuantity>
    );
};

export default forwardRef(QuanlityProduct);
