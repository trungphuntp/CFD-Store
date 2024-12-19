import ColorProduct from "@/pages/ProductDetailPage/components/ColorProduct";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledProductCartDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    & .details-filter-row {
        margin: initial;
    }
    & .product-color * {
        font-size: 13px !important;
    }
`;

const MiniDropCart = ({
    price,
    quantity,
    name,
    image,
    linkDetail,
    color,
    onRemoveClick,
    productIndex,
}) => {
    const onClickRemove = (e, productIndex) => {
        onRemoveClick(e, productIndex);
    };
    return (
        <div className="product">
            <StyledProductCartDetail className="product-cart-details">
                <h4 className="product-title">
                    <Link to={linkDetail}>{name || ""}</Link>
                </h4>
                <div className="product-color">
                    <ColorProduct colors={[color]} />
                </div>
                <span className="cart-product-info">
                    <span className="cart-product-qty">{quantity || 1}</span> x ${price}
                </span>
            </StyledProductCartDetail>

            <figure className="product-image-container">
                <Link to={linkDetail} className="product-image">
                    <img src={image || ""} alt="product" />
                </Link>
            </figure>
            <a
                href="#"
                className="btn-remove"
                title="Remove Product"
                onClick={(e) => {
                    onClickRemove(e, productIndex);
                }}
            >
                <i className="icon-close" />
            </a>
        </div>
    );
};

export default MiniDropCart;
