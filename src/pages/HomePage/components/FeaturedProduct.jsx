import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const LIMIT_SHOW_PRODUCT = 9;
const FeaturedProduct = ({
    categories,
    products,
    handleSetFeaturedProduct,
    featuredProductActive,
}) => {
    const onChangeFeaturedProduct = (e, type = "") => {
        e?.stopPropagation();
        e?.preventDefault();
        handleSetFeaturedProduct(type);
    };
    return (
        <div className="container top">
            <div className="heading heading-flex mb-3">
                <div className="heading-left">
                    <h2 className="title">Featured Products</h2>
                </div>
                <div className="heading-right">
                    <ul className="nav nav-pills nav-border-anim justify-content-center">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    featuredProductActive === "" ? "active" : ""
                                }`}
                                id="top-all-link"
                                href="#top-all-tab"
                                onClick={(e) => {
                                    onChangeFeaturedProduct(e);
                                }}
                            >
                                All
                            </a>
                        </li>
                        {!!categories &&
                            categories?.map((cate, index) => {
                                return (
                                    <li
                                        className="nav-item"
                                        key={cate?.id || new Date().getTime() + index}
                                    >
                                        <a
                                            className={`nav-link ${
                                                featuredProductActive === cate?.name ? "active" : ""
                                            }`}
                                            href="#"
                                            id="top-all-link"
                                            onClick={(e) => {
                                                onChangeFeaturedProduct(e, cate?.name);
                                            }}
                                        >
                                            {cate?.name || ""}
                                        </a>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <div className="tab-content tab-content-carousel just-action-icons-sm">
                {/* ALL */}
                {!!products && (
                    <div
                        className={`tab-pane p-0 fade ${
                            featuredProductActive === "" ? "show active" : ""
                        }`}
                        id="top-all-tab"
                        role="tabpanel"
                        aria-labelledby="top-all-link"
                    >
                        <div
                            className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                            data-toggle="owl"
                            data-owl-options='{
                              "nav": true, 
                              "dots": false,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":2
                                  },
                                  "480": {
                                      "items":2
                                  },
                                  "992": {
                                      "items":3
                                  },
                                  "1200": {
                                      "items":4
                                  }
                              }
                          }'
                        >
                            {products
                                ?.filter((product) => {
                                    return product?.featured === true;
                                })

                                ?.slice(LIMIT_SHOW_PRODUCT)
                                ?.map((product, index) => {
                                    return (
                                        <ProductCard
                                            key={product?.id || new Date().getTime() + index}
                                            {...product}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                )}

                {categories?.map((cate, index) => {
                    return (
                        <div
                            key={cate?.id || new Date().getTime() + index}
                            className={`tab-pane p-0 fade ${
                                featuredProductActive === cate?.name ? "active show" : ""
                            }`}
                        >
                            <div
                                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                                data-toggle="owl"
                                data-owl-options='{
                              "nav": true, 
                              "dots": false,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":2
                                  },
                                  "480": {
                                      "items":2
                                  },
                                  "768": {
                                      "items":3
                                  },
                                  "992": {
                                      "items":4
                                  },
                                  "1200": {
                                      "items":5
                                  }
                              }
                          }'
                            >
                                {products
                                    ?.filter((product) => {
                                        return product?.category?.id === cate?.id;
                                    })
                                    ?.slice(0, LIMIT_SHOW_PRODUCT)
                                    ?.map((product, index) => {
                                        return (
                                            <>
                                                <ProductCard
                                                    {...product}
                                                    key={
                                                        product?.id || new Date().getTime() + index
                                                    }
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProduct;
