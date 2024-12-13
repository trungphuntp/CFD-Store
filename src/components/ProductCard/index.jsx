import { PATH } from "@/constants/Pathjs";
import { compareDate, formatCurrency } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ images, title, price, rating, onSale, slug, updatedAt, discount }) => {
    const linkDetail = PATH.PRODUCTS.INDEX + `/${slug}`;
    const isNewProduct = compareDate(updatedAt);

    return (
        <div className="product product-2">
            <figure className="product-media">
                {/* label new */}
                {!!isNewProduct && !onSale && (
                    <span className="product-label label-circle label-new">New</span>
                )}
                {/* label sale */}
                {!!onSale && !!discount && (
                    <span className="product-label label-circle label-sale">Sale</span>
                )}
                <Link to={linkDetail}>
                    <img
                        src={images?.[0] || images || ""}
                        alt="Product image"
                        className="product-image"
                    />
                </Link>
                <div className="product-action-vertical">
                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
                        <span>add to wishlist</span>
                    </a>
                </div>
                <div className="product-action product-action-dark">
                    <a href="#" className="btn-product btn-cart" title="Add to cart">
                        <span>add to cart</span>
                    </a>
                </div>
            </figure>
            <div className="product-body">
                <h3 className="product-title">
                    <Link to={linkDetail}>{title || ""}</Link>
                </h3>
                <div className="product-price">
                    {!!onSale && !!discount ? (
                        <>
                            <span class="new-price"> ${formatCurrency(price - discount)}</span>
                            <span class="out-price" style={{ textDecoration: "line-through" }}>
                                ${formatCurrency(price)}
                            </span>
                        </>
                    ) : (
                        <> ${formatCurrency(price)}</>
                    )}
                </div>

                <div className="ratings-container">
                    <div className="ratings">
                        <div
                            className="ratings-val"
                            style={{ width: `${((rating || 0) / 5) * 100}%` }}
                        />
                    </div>
                    <span className="ratings-text">( {rating || 0} Reviews )</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;