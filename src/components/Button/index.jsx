import React from "react";
import { Link } from "react-router-dom";

const Button = ({ variant = "primary", className, link, children, disabled, ...rest }) => {
    let variantButton = "";

    switch (variant) {
        case "primary":
            variantButton = "btn btn-primary";
            break;
        case "outline":
            variantButton = "btn btn-outline-primary-2";
            break;

        default:
            break;
    }

    // disable button
    // if (disabled) {
    //     variantButton = " btn btn--grey";
    //     rest.onClick = () => {};
    // }

    if (!!link) {
        return (
            <Link to={link} className={`${variantButton} ${className ? className : ""}`} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={`${variantButton} ${className ? className : ""}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
