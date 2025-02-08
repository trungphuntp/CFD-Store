import CheckBox from "@/components/Checkbox";
import React, { useEffect, useState } from "react";

const ProductFilter = ({
    categories,
    products,
    activeFilter,
    handleChangeFilter,
    handlePriceChange,
    currentPrice,
    handleResetAll,
}) => {
    const [valuePrice, setvaluePrice] = useState([]);

    useEffect(() => {
        // Slider For category pages / filter price
        if (typeof noUiSlider === "object") {
            var priceSlider = document.getElementById("price-slider");

            // Check if #price-slider elem is exists if not return
            // to prevent error logs
            if (priceSlider == null) return;

            noUiSlider.create(priceSlider, {
                start: currentPrice,
                connect: true,
                step: 50,
                margin: 200,
                range: {
                    min: 0,
                    max: 10000,
                },
                tooltips: true,
                format: wNumb({
                    decimals: 0,
                    prefix: "$",
                }),
            });

            // Update Price Range
            priceSlider.noUiSlider.on("change", function (values, handle) {
                $("#filter-price-range").text(values.join(" - "));
                setvaluePrice(values);
            });

            document.getElementById("clearAllFilter").addEventListener("click", function () {
                priceSlider.noUiSlider.set([0, 5000]);
            });
        }

        document.getElementById("clearAllFilter").addEventListener("click", function (e) {
            e?.preventDefault();
            handleResetAll?.();
        });
    }, []);

    useEffect(() => {
        handlePriceChange?.(valuePrice);
    }, [valuePrice]);

    return (
        <aside className="col-lg-3 order-lg-first">
            <div className="sidebar sidebar-shop">
                <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a id="clearAllFilter" href="#" className="sidebar-filter-clear">
                        Clean All
                    </a>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-1"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-1"
                        >
                            {" "}
                            Category{" "}
                        </a>
                    </h3>
                    <div className="collapse show" id="widget-1">
                        <div className="widget-body">
                            <div className="filter-items filter-items-count">
                                {categories?.map((cate, index) => {
                                    const { name, id } = cate;
                                    return (
                                        <div className="filter-item" key={id || index}>
                                            <CheckBox
                                                label={name}
                                                id={id || index}
                                                isChecked={activeFilter?.includes(id)}
                                                onChange={(e) => {
                                                    handleChangeFilter(id, e.target.checked);
                                                }}
                                            />

                                            {products && (
                                                <span className="item-count">
                                                    {" "}
                                                    {products?.filter((item) => {
                                                        return item?.category?.id === id;
                                                    })?.length || 0}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                        <a
                            data-toggle="collapse"
                            href="#widget-2"
                            role="button"
                            aria-expanded="true"
                            aria-controls="widget-5"
                        >
                            {" "}
                            Price{" "}
                        </a>
                    </h3>
                    <div className="collapse show" id="widget-2">
                        <div className="widget-body">
                            <div className="filter-price">
                                <div className="filter-price-text">
                                    {" "}
                                    Price Range: <span id="filter-price-range" />
                                </div>
                                <div id="price-slider" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ProductFilter;
