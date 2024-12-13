import { formatDate } from "@/utils/format";
import React, { useState } from "react";

const TYPE_TABS = {
    description: "description",
    shiping: "shiping",
    reviews: "reviews",
};

const ProductDetailBottom = ({ shippingReturn, description, countReviews, reviews }) => {
    const [activeTab, setActiveTab] = useState(TYPE_TABS.description);
    const onClickTabChange = (e, type) => {
        e?.preventDefault();
        e?.stopPropagation();
        setActiveTab(type);
    };

    return (
        <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            activeTab === TYPE_TABS.description ? "active" : ""
                        }`}
                        id="product-desc-link"
                        href="#product-desc-tab"
                        onClick={(e) => {
                            onClickTabChange(e, TYPE_TABS.description);
                        }}
                    >
                        Description
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === TYPE_TABS.shiping ? "active" : ""}`}
                        id="product-shipping-link"
                        href="#product-shipping-tab"
                        onClick={(e) => {
                            onClickTabChange(e, TYPE_TABS.shiping);
                        }}
                    >
                        Shipping &amp; Returns
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === TYPE_TABS.reviews ? "active" : ""}`}
                        id="product-review-link"
                        href="#product-review-tab"
                        onClick={(e) => {
                            onClickTabChange(e, TYPE_TABS.reviews);
                        }}
                    >
                        Reviews ({countReviews || 0})
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                <div
                    className={`tab-pane fade ${
                        activeTab === TYPE_TABS.description ? "show active" : ""
                    }`}
                    id="product-desc-tab"
                >
                    <div
                        className="product-desc-content"
                        dangerouslySetInnerHTML={{ __html: description || "" }}
                    ></div>
                </div>
                <div
                    className={`tab-pane fade ${
                        activeTab === TYPE_TABS.shiping ? "show active" : ""
                    }`}
                    id="product-shipping-tab"
                >
                    <div
                        className="product-desc-content"
                        dangerouslySetInnerHTML={{ __html: shippingReturn || "" }}
                    ></div>
                </div>
                <div
                    className={`tab-pane fade ${
                        activeTab === TYPE_TABS.reviews ? "show active" : ""
                    }`}
                    id="product-review-tab"
                >
                    <div className="reviews">
                        <h3>Reviews ({countReviews || 0})</h3>
                        {reviews?.map((review, index) => {
                            const { title, rate, updatedAt, description, id } = review || {};
                            return (
                                <div className="review" key={(id, new Date().getTime() + index)}>
                                    <div className="row no-gutters">
                                        <div className="col-auto">
                                            <h4>
                                                <a href="#">Guest</a>
                                            </h4>
                                            <div className="ratings-container">
                                                <div className="ratings">
                                                    <div
                                                        className="ratings-val"
                                                        style={{
                                                            width: ((rate || 0) / 5) * 100 || 0,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="review-date">
                                                {formatDate(updatedAt)}
                                            </span>
                                        </div>
                                        <div className="col">
                                            <h4>{title || ""}</h4>
                                            <div className="review-content">
                                                <p>{description || ""}</p>
                                            </div>
                                            <div className="review-action">
                                                <a href="#">
                                                    <i className="icon-thumbs-up" />
                                                    Helpful (2){" "}
                                                </a>
                                                <a href="#">
                                                    <i className="icon-thumbs-down" />
                                                    Unhelpful (0){" "}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailBottom;
