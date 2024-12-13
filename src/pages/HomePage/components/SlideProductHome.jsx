import ProductCard from "@/components/ProductCard";
import React from "react";

const SlideProductHome = ({ slideProduct, SLIDE_PRODCUT, handleSetSliderProduct, products }) => {
    const handleChangeSilde = (e, type) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleSetSliderProduct?.(type);
    };

    return (
        <div className="container featured">
            <ul className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3">
                <li className="nav-item">
                    <a
                        className={`nav-link  ${
                            slideProduct === SLIDE_PRODCUT.featured ? "active" : ""
                        }`}
                        id="products-featured-link"
                        href="#products-featured-tab"
                        onClick={(e) => {
                            handleChangeSilde(e, SLIDE_PRODCUT.featured);
                        }}
                    >
                        Featured
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link  ${
                            slideProduct === SLIDE_PRODCUT.onSale ? "active" : ""
                        }`}
                        id="products-sale-link"
                        href="#products-sale-tab"
                        onClick={(e) => {
                            handleChangeSilde(e, SLIDE_PRODCUT.onSale);
                        }}
                    >
                        On Sale
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link  ${
                            slideProduct === SLIDE_PRODCUT.topRate ? "active" : ""
                        }`}
                        id="products-top-link"
                        href="#products-top-tab"
                        onClick={(e) => {
                            handleChangeSilde(e, SLIDE_PRODCUT.topRate);
                        }}
                    >
                        Top Rated
                    </a>
                </li>
            </ul>

            <div className="tab-content tab-content-carousel">
                {/* FEATURED */}
                {!!products && (
                    <div
                        className={`tab-pane p-0 fade ${
                            slideProduct === SLIDE_PRODCUT.featured ? "active show" : ""
                        }`}
                        id="products-featured-tab"
                        role="tabpanel"
                        aria-labelledby="products-featured-link"
                    >
                        <div
                            className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                            data-toggle="owl"
                            data-owl-options='{
                              "nav": true, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":2
                                  },
                                  "600": {
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
                {/* ONSALE */}
                {!!products && (
                    <div
                        className={`tab-pane p-0 fade ${
                            slideProduct === SLIDE_PRODCUT.onSale ? "active show" : ""
                        }`}
                        id="products-featured-tab"
                        role="tabpanel"
                        aria-labelledby="products-featured-link"
                    >
                        <div
                            className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                            data-toggle="owl"
                            data-owl-options='{
                              "nav": true, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":2
                                  },
                                  "600": {
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
                                    return product?.onSale === true && !!product?.discount;
                                })
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
                {/* TOP RATE */}
                {!!products && (
                    <div
                        className={`tab-pane p-0 fade ${
                            slideProduct === SLIDE_PRODCUT.topRate ? "active show" : ""
                        }`}
                        id="products-featured-tab"
                        role="tabpanel"
                        aria-labelledby="products-featured-link"
                    >
                        <div
                            className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                            data-toggle="owl"
                            data-owl-options='{
                              "nav": true, 
                              "dots": true,
                              "margin": 20,
                              "loop": false,
                              "responsive": {
                                  "0": {
                                      "items":2
                                  },
                                  "600": {
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
                                    return product?.topRated === true && product?.rating > 3;
                                })
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
            </div>
        </div>
    );
};

export default SlideProductHome;
