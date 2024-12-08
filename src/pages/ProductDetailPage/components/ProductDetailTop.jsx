import { PATH } from "@/constants/Pathjs";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ColorProduct from "./ColorProduct";
import QuanlityProduct from "./QuanlityProduct";
import { message } from "antd";
import ShareLink from "@/components/ShareLink";
import ProductGallery from "@/components/ProductGallery";

const ProductDetailTop = ({
    id,
    color,
    title,
    rating,
    price,
    category,
    images,
    handleAddCart,
    handleWishlish,
    stock,
    widthStar,
    description,
    reviews,
}) => {
    const categoryPath = PATH.PRODUCTS.INDEX + `?category=${category?.id}`;

    const refColor = useRef();
    const refQuanlity = useRef();

    const handleAddToCart = (e) => {
        e?.preventDefault();
        const { value: color, reset: resetColor } = refColor?.current || {};
        const { value: quantity, reset: resetQuantity } = refQuanlity?.current || {};

        if (!color) {
            message.error("Please select color");
        } else if (isNaN(quantity) || quantity < 1) {
            message.error("Quantity must be greater than 1");
        } else {
            resetColor();
            resetQuantity();
            handleAddCart?.();
        }
    };

    const handleAddToWishlist = (e) => {
        e?.preventDefault();
        handleWishlish?.();
    };
    return (
        <div className="product-details-top">
            <div className="row">
                <div className="col-md-6">
                    <ProductGallery images={images} />
                </div>
                <div className="col-md-6">
                    <div className="product-details">
                        <h1 className="product-title">{title || ""}</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={{ width: `${widthStar}%` }} />
                            </div>
                            <a
                                className="ratings-text"
                                href="#product-review-link"
                                id="review-link"
                            >
                                ( {reviews || 0} Reviews )
                            </a>
                        </div>
                        <div className="product-price"> ${price || 0} </div>
                        <div className="product-content">
                            <p dangerouslySetInnerHTML={{ __html: description || "" }}></p>
                        </div>
                        <ColorProduct colors={color} ref={refColor} />
                        <QuanlityProduct ref={refQuanlity} max={stock || 0} />

                        <div className="product-details-action">
                            <a href="#" className="btn-product btn-cart" onClick={handleAddToCart}>
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a
                                    href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                    onClick={handleAddToWishlist}
                                >
                                    <span>Add to Wishlist</span>
                                </a>
                            </div>
                        </div>
                        <div className="product-details-footer">
                            <div className="product-cat">
                                <span>Category:</span>
                                <Link to={categoryPath}>{category?.name}</Link>;
                                {/* <a href="#">Women</a>, <a href="#">Dresses</a>,{" "}
                                <a href="#">Yellow</a> */}
                            </div>
                            <div className="social-icons social-icons-sm" style={{ gap: 5 }}>
                                <span className="social-label">Share:</span>
                                <ShareLink label={"Facebook"} type={"Facebook"}>
                                    <i className="icon-facebook-f" />
                                </ShareLink>
                                <ShareLink label={"Twitter"} type={"Twitter"}>
                                    <i className="icon-twitter" />
                                </ShareLink>
                                <ShareLink
                                    label={"Instagram"}
                                    type={"Instagram"}
                                    media={images?.[0] || ""}
                                >
                                    <i className="icon-instagram" />
                                </ShareLink>
                                <ShareLink label={"Printerest"} type={"Printerest"}>
                                    <i className="icon-pinterest" />
                                </ShareLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailTop;
