import { PATH } from "@/constants/Pathjs";
import { formatCurrency } from "@/utils/format";
import { Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ loading, error, products }) => {
    if ((!loading && products?.length < 1) || error) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">There is no products</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {new Array(9).fill("").map((_, index) => {
                        return (
                            <div
                                className="col-6 col-md-4 col-lg-4"
                                key={index}
                                style={{ flexDirection: "column", gap: 5, marginTop: 10 }}
                            >
                                <Skeleton.Image
                                    active={true}
                                    style={{ width: "100%", height: 275 }}
                                />
                                <Skeleton.Input active />
                                <Skeleton.Input block active />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="products mb-3">
            <div className="row justify-content-center">
                {products?.map((product, index) => {
                    const { id, name, slug, rating, price, images } = product;
                    return (
                        <div
                            className="col-6 col-md-4 col-lg-4"
                            key={id || new Date().getTime() + index}
                        >
                            <div className="product product-2">
                                <figure className="product-media">
                                    <a href="product-detail.html">
                                        <Link to={PATH.PRODUCTS.INDEX + `/${slug || ""}`}>
                                            <img
                                                src={images[0] || ""}
                                                alt="Product image"
                                                className="product-image"
                                            />
                                        </Link>
                                    </a>
                                    <div className="product-action-vertical">
                                        <a
                                            href="#"
                                            className="btn-product-icon btn-wishlist btn-expandable"
                                        >
                                            <span>add to wishlist</span>
                                        </a>
                                    </div>
                                    <div className="product-action product-action-dark">
                                        <a
                                            href="#"
                                            className="btn-product btn-cart"
                                            title="Add to cart"
                                        >
                                            <span>add to cart</span>
                                        </a>
                                    </div>
                                </figure>
                                <div className="product-body">
                                    <h3 className="product-title">
                                        <Link to={PATH.PRODUCTS.INDEX + `/${slug || ""}`}>
                                            {name || ""}
                                        </Link>
                                    </h3>
                                    <div className="product-price">
                                        {" "}
                                        ${formatCurrency(price || 0)}{" "}
                                    </div>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div
                                                className="ratings-val"
                                                style={{ width: `${(rating / 5) * 100}%` }}
                                            />
                                        </div>
                                        <span className="ratings-text">( {rating} Reviews )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* <div className="col-6 col-md-4 col-lg-4">
                    <div className="product product-2">
                        <figure className="product-media">
                            <a href="product-detail.html">
                                <img
                                    src="assets/images/demos/demo-3/products/product-12.jpg"
                                    alt="Product image"
                                    className="product-image"
                                />
                            </a>
                            <div className="product-action-vertical">
                                <a
                                    href="#"
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                >
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
                                <a href="product-detail.html">Bose - SoundLink Bluetooth Speaker</a>
                            </h3>
                            <div className="product-price"> $79.99 </div>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "60%" }} />
                                </div>
                                <span className="ratings-text">( 6 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-4">
                    <div className="product product-2">
                        <figure className="product-media">
                            <span className="product-label label-circle label-new">New</span>
                            <a href="product-detail.html">
                                <img
                                    src="assets/images/demos/demo-3/products/product-13.jpg"
                                    alt="Product image"
                                    className="product-image"
                                />
                            </a>
                            <div className="product-action-vertical">
                                <a
                                    href="#"
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                >
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
                                <a href="product-detail.html">
                                    Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                                </a>
                            </h3>
                            <div className="product-price"> $899.99 </div>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "80%" }} />
                                </div>
                                <span className="ratings-text">( 4 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-4">
                    <div className="product product-2">
                        <figure className="product-media">
                            <span className="product-label label-circle label-sale">Sale</span>
                            <a href="product-detail.html">
                                <img
                                    src="assets/images/demos/demo-3/products/product-14.jpg"
                                    alt="Product image"
                                    className="product-image"
                                />
                            </a>
                            <div className="product-action-vertical">
                                <a
                                    href="#"
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                >
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
                                <a href="product-detail.html">Google - Pixel 3 XL 128GB</a>
                            </h3>
                            <div className="product-price">
                                <span className="new-price">$35.41</span>
                                <span className="old-price">Was $41.67</span>
                            </div>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "100%" }} />
                                </div>
                                <span className="ratings-text">( 10 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-4">
                    <div className="product product-2">
                        <figure className="product-media">
                            <a href="product-detail.html">
                                <img
                                    src="assets/images/demos/demo-3/products/product-15.jpg"
                                    alt="Product image"
                                    className="product-image"
                                />
                            </a>
                            <div className="product-action-vertical">
                                <a
                                    href="#"
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                >
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
                                <a href="product-detail.html">
                                    Samsung - 55" Class LED 2160p Smart
                                </a>
                            </h3>
                            <div className="product-price"> $899.99 </div>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "60%" }} />
                                </div>
                                <span className="ratings-text">( 5 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-4">
                    <div className="product product-2">
                        <figure className="product-media">
                            <a href="product-detail.html">
                                <img
                                    src="assets/images/demos/demo-3/products/product-11.jpg"
                                    alt="Product image"
                                    className="product-image"
                                />
                            </a>
                            <div className="product-action-vertical">
                                <a
                                    href="#"
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                >
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
                                <a href="product-detail.html">MacBook Pro 13" Display, i5</a>
                            </h3>
                            <div className="product-price"> $1,199.99 </div>
                            <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{ width: "100%" }} />
                                </div>
                                <span className="ratings-text">( 4 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProductList;
