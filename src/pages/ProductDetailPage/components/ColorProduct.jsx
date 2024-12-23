import React, { forwardRef, useImperativeHandle, useState } from "react";

const ColorProduct = ({ colors, defaultValue = "", isClick = false }, ref) => {
    const [selectedColor, setSelectedColor] = useState(defaultValue);

    useImperativeHandle(ref, () => {
        return {
            value: selectedColor,
            reset: () => setSelectedColor(""),
        };
    });

    const onClickColor = (e, color) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (isClick) {
            if (selectedColor === color) {
                setSelectedColor("");
            } else {
                setSelectedColor(color);
            }
        }
    };

    return (
        <div className="product-nav product-nav-dots" ref={ref}>
            {colors?.map((color, index) => {
                return (
                    <div
                        key={new Date().getTime() + index}
                        className={`product-nav-item ${selectedColor === color ? "active" : ""} `}
                        style={{ background: color || "" }}
                        onClick={(e) => {
                            onClickColor(e, color);
                        }}
                    >
                        <span className="sr-only">Color name</span>
                    </div>
                );
            })}
            {/* <div
                                    className="product-nav-item active"
                                    style={{ background: "#e2e2e2" }}
                                >
                                    <span className="sr-only">Color name</span>
                                </div>
                                <div className="product-nav-item" style={{ background: "#333333" }}>
                                    <span className="sr-only">Color name</span>
                                </div>
                                <div className="product-nav-item" style={{ background: "#f2bc9e" }}>
                                    <span className="sr-only">Color name</span>
                                </div> */}
        </div>
    );
};

export default forwardRef(ColorProduct);
