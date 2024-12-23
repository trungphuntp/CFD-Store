import ProductGallery from "@/components/ProductGallery";
import ShareLink from "@/components/ShareLink";
import { PATH } from "@/constants/Pathjs";
import { message } from "antd";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ColorProduct from "./ColorProduct";
import QuanlityProduct from "./QuanlityProduct";
import { useDispatch } from "react-redux";
import { formatCurrency } from "@/utils/format";
import { handleAddCart } from "@/store/reducers/cartReducer";

const ProductDetailTop = ({
    id,
    color,
    title,
    price,
    discount,
    category,
    images,
    stock,
    widthStar,
    description,
    reviews,
    handleWishlish,
}) => {
    const categoryPath = PATH.PRODUCTS.INDEX + `?category=${category?.id}`;
    const refColor = useRef();
    const refQuanlity = useRef();
    const dispatch = useDispatch();

    const handleAddToCart = async (e) => {
        e?.preventDefault();
        const { value: color, reset: resetColor } = refColor?.current || {};
        const { value: quantity, reset: resetQuantity } = refQuanlity?.current || {};

        if (!color) {
            message.error("Please select color");
        } else if (isNaN(quantity) || quantity < 1) {
            message.error("Quantity must be greater than 1");
        } else {
            const addPayload = {
                addedID: id,
                addedColor: color,
                addedQuantity: quantity,
                addedPrice: price - discount,
            };
            try {
                const res = await dispatch(handleAddCart(addPayload)).unwrap();
                if (res?.id) {
                    resetColor();
                    resetQuantity();
                }
            } catch (error) {}
        }
    };

    const handleAddToWishlist = (e, idProduct) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (idProduct) {
            handleWishlish?.(idProduct);
        }
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
                        <div className="product-price" style={{ display: "flex", gap: 20 }}>
                            <span> ${formatCurrency(price - discount || 0)} </span>
                            <span
                                style={{
                                    color: "#ccc",
                                    textDecoration: "line-through",
                                    fontSize: 20,
                                }}
                            >
                                ${formatCurrency(price || 0)}
                            </span>
                        </div>
                        <div className="product-content">
                            <p dangerouslySetInnerHTML={{ __html: description || "" }}></p>
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>
                            <ColorProduct colors={color} ref={refColor} isClick={true} />
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <QuanlityProduct ref={refQuanlity} max={stock || 100} />
                        </div>
                        <div className="product-details-action">
                            <a href="#" className="btn-product btn-cart" onClick={handleAddToCart}>
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a
                                    href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                    onClick={(e) => {
                                        handleAddToWishlist(e, id);
                                    }}
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
