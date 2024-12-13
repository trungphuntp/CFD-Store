import ProductCard from "@/components/ProductCard";
import { PATH } from "@/constants/Pathjs";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const DealOutletHome = ({ products }) => {
    const productsDeal =
        products?.filter((product) => {
            return product?.onSale === true && product?.topRated === true;
        }) || [];

    return (
        <div className="bg-light deal-container pt-7 pb-7 mb-5">
            <div className="container">
                <div className="heading text-center mb-4">
                    <h2 className="title">Deals &amp; Outlet</h2>
                    <p className="title-desc">Today’s deal and more</p>
                </div>
                <div className="row">
                    <div className="col-lg-6 deal-col">
                        <div
                            className="deal"
                            style={{
                                backgroundImage: 'url("/assets/images/demos/demo-3/deal/bg-1.jpg")',
                            }}
                        >
                            <div className="deal-top">
                                <h2>Deal of the Day.</h2>
                                <h4>Limited quantities.</h4>
                            </div>
                            <div className="deal-content">
                                <h3 className="product-title">
                                    <Link
                                        to={
                                            PATH.PRODUCTS.INDEX +
                                            `/${productsDeal?.[0]?.slug || ""}`
                                        }
                                    >
                                        {productsDeal?.[0]?.title || ""}
                                    </Link>
                                </h3>
                                <div className="product-price">
                                    <span className="new-price">
                                        ${formatCurrency(productsDeal?.[0]?.price || 0)}
                                    </span>
                                    <span
                                        className="old-price"
                                        style={{ textDecoration: "line-through" }}
                                    >
                                        Was{" "}
                                        {formatCurrency(
                                            productsDeal?.[0]?.price -
                                                productsDeal?.[0]?.discount || 0
                                        )}
                                    </span>
                                </div>
                                <Link
                                    to={PATH.PRODUCTS.INDEX + `/${productsDeal?.[0]?.slug || ""}`}
                                    className="btn btn-link"
                                >
                                    <span>Shop Now</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            </div>
                            <div className="deal-bottom">
                                <div className="deal-countdown" data-until="+10h" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="products">
                            <div className="row">
                                <div className="col-6">
                                    <ProductCard {...productsDeal[1]} />
                                </div>
                                <div className="col-6">
                                    <ProductCard {...productsDeal[2]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="more-container text-center mt-3 mb-0">
                    <Link
                        to={PATH.PRODUCTS.INDEX}
                        className="btn btn-outline-dark-2 btn-round btn-more"
                    >
                        <span>Shop more</span>
                        <i className="icon-long-arrow-right" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DealOutletHome;
