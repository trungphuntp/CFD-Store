import React from "react";
import styled from "styled-components";

const PaginationItem = ({ children, isActive, isDisable, typeButton = "", ...rest }) => {
    let typeClass = "";
    switch (typeButton) {
        case "prev":
            typeClass = "page-link-prev";
            break;
        case "next":
            typeClass = "page-link-next";
            break;

        default:
            typeClass = "";
            break;
    }

    const StyledItem = styled.a`
        &:focus {
            outline: none;
        }
    `;

    return (
        <li
            style={{ cursor: "pointer" }}
            className={`page-item ${isDisable ? "disabled" : ""} ${isActive ? "active" : ""}`}
            {...rest}
        >
            <StyledItem className={`page-link ${typeClass}`} href="#">
                {children}
            </StyledItem>
        </li>
    );
};

export default PaginationItem;
