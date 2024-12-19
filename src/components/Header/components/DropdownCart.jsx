import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniDropCart from "./MiniDropCart";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import { PATH } from "@/constants/Pathjs";
import styled from "styled-components";
import { Modal } from "antd";
import { handleRemoveCart } from "@/store/reducers/cartReducer";
import ComponentLoading from "@/components/ComponentLoading";
import ColorProduct from "@/pages/ProductDetailPage/components/ColorProduct";

const StyledDropDown = styled.div`
    max-height: 30vh;
    overflow-y: scroll;
    padding-right: 25px;

    &::-webkit-scrollbar {
        width: 3px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #aaa;
        border-radius: 999px;
    }
`;

const StyledModal = styled.div`
    & .product-nav-dots {
        margin: initial !important;
    }
`;

const DropdownCart = () => {
    const { cartInfor, loading } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const { product, subTotal, quantity, variant, shipping } = cartInfor || [];
    const countCart = product?.length || 0;

    const { confirm } = Modal;
    const onRemoveClick = (e, removeIndex) => {
        if (!!loading.cart || removeIndex < 0) return;

        e?.stopPropagation();
        e?.preventDefault();
        const ProductRemove = product?.[removeIndex];

        let imageProduct = ProductRemove?.images[0];
        if (imageProduct?.split("https")?.length > 2) {
            imageProduct = imageProduct?.split("https");
            imageProduct = "https" + imageProduct[imageProduct?.length - 1];
        }

        confirm({
            title: "Do you want to remove this item form cart?",
            content: (
                <StyledModal>
                    <p>
                        Name: <strong> {ProductRemove?.name || ""}</strong>
                    </p>
                    <p>
                        Quantity:{" "}
                        <strong>
                            {quantity[removeIndex] || 1} x ${formatCurrency(ProductRemove?.price)}
                        </strong>
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        Color:
                        <ColorProduct colors={[variant[removeIndex]]} />
                    </div>
                    <figure style={{ width: 50 }}>
                        <img src={imageProduct} alt="" />
                    </figure>
                </StyledModal>
            ),
            onOk() {
                console.log("OK");

                dispatch(handleRemoveCart(removeIndex));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return (
        <div className="dropdown cart-dropdown">
            <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
            >
                <i className="icon-shopping-cart" />
                <span className="cart-count">{countCart || 0}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
                {!!product?.length <= 0 && (
                    <p>
                        There is no any product in cart -{" "}
                        <Link to={PATH.PRODUCTS.INDEX}>Go to shop</Link>
                    </p>
                )}

                {!!product?.length > 0 && (
                    <>
                        {!!loading.cart && <ComponentLoading />}
                        <StyledDropDown className="dropdown-cart-products">
                            {product?.map((product, index) => {
                                // fix lỗi dulicate link image của BE
                                let imageProduct = product?.images[0];
                                if (imageProduct?.split("https")?.length > 2) {
                                    imageProduct = imageProduct?.split("https");
                                    imageProduct = "https" + imageProduct[imageProduct?.length - 1];
                                }

                                const propsMiniCart = {
                                    color: variant[index],
                                    price: formatCurrency(product?.price || 0),
                                    name: product?.name,
                                    quantity: quantity[index],
                                    image: imageProduct,
                                    linkDetail: PATH.PRODUCTS.INDEX + `/${product?.slug}`,
                                    onRemoveClick,
                                    productIndex: index,
                                };
                                return (
                                    <MiniDropCart
                                        key={product?.id || new Date().getTime() + index}
                                        {...propsMiniCart}
                                    />
                                );
                            })}
                        </StyledDropDown>
                        <div className="dropdown-cart-total">
                            <span>Total</span>
                            <span className="cart-total-price">${formatCurrency(subTotal)}</span>
                        </div>
                        <div className="dropdown-cart-action">
                            <Link to={PATH.CART} className="btn btn-primary">
                                View Cart
                            </Link>
                            {!!shipping && (
                                <Link
                                    to={PATH.CHECKOUT.INDEX}
                                    className="btn btn-outline-primary-2"
                                >
                                    <span>Checkout</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DropdownCart;
