import React, { useEffect, useRef } from "react";
import CartTable from "./components/CartTable";
import CartSum from "./components/CartSum";
import { PATH } from "@/constants/Pathjs";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCart, handleRemoveCart, handleUpdateCart } from "@/store/reducers/cartReducer";
import { formatCurrency } from "@/utils/format";
import { SHOPPING_TYPE } from "@/constants/General";

const CartPage = () => {
    const { cartInfor, loading } = useSelector((state) => state.cart);
    const { product, totalProduct, quantity, variant, discount, shipping, total, subTotal } =
        cartInfor || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(handleUpdateCart({ ...cartInfor, shipping: null, total: 0 }));
    // }, []);

    // ref for quantity
    const quantityRef = useRef([]);
    const quantityRefTimer = useRef();

    // Call API Change Quantity
    const handleChangeQuantity = (updateQuantity, updateIndex) => {
        const getPayload = () => {
            const newQuantity = quantity?.map((quantityItem, index) => {
                return index === updateIndex ? updateQuantity : quantityItem;
            });

            const newTotalProduct = totalProduct?.map((totalProduct, index) => {
                return index === updateIndex
                    ? (product[updateIndex]?.price - product[updateIndex]?.discount) *
                          updateQuantity
                    : totalProduct;
            });

            const newSubTotal =
                newTotalProduct?.reduce((current, total) => {
                    return Number(current) + Number(total);
                }, 0) || 0;
            const newTotal = newSubTotal - Number(discount ?? 0) + Number(shipping?.price ?? 0);

            return {
                ...cartInfor,
                product: product?.map((product) => product?.id),
                quantity: newQuantity,
                totalProduct: newTotalProduct,
                subTotal: newSubTotal,
                total: newTotal,
            };
        };

        if (quantityRefTimer.current) {
            clearTimeout(quantityRefTimer.current);
        }

        quantityRefTimer.current = setTimeout(async () => {
            if (
                updateQuantity !== "" &&
                quantity[updateIndex] !== updateQuantity &&
                !loading.cart
            ) {
                try {
                    const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
                } catch (error) {
                    quantityRef[updateIndex]?.current?.reset?.();
                }
            }
        }, 300);
    };

    // handle remove Product
    const { confirm } = Modal;
    const onRemoveProduct = (e, removeIndex) => {
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
                <>
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
                        <div
                            style={{
                                width: "1.7rem",
                                height: "1.7rem",
                                borderRadius: "50%",
                                backgroundColor: `${variant[removeIndex]}`,
                            }}
                        ></div>
                    </div>
                    <figure style={{ width: 50 }}>
                        <img src={imageProduct} alt="" />
                    </figure>
                </>
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

    // handle change shopping
    const handleChangeShopping = (typeShopping) => {
        if (!!typeShopping) {
            const ShoppingInfor =
                SHOPPING_TYPE.find((typeShop) => typeShop.value === typeShopping) || 0;
            const dataUpdate = {
                ...cartInfor,
                product: product?.map((product) => product.id),
                shipping: {
                    typeShip: ShoppingInfor.value || "",
                    price: Number(ShoppingInfor.price) || 0,
                },
                total: subTotal + ShoppingInfor.price || 0,
            };

            dispatch(handleUpdateCart(dataUpdate));
        }
    };

    // gotoCheckOut
    const goCheckout = () => {
        if (product?.length <= 0) {
            message.error("Please add to cart!");
        } else if (!shipping) {
            message.error("Please choose shipping method!");
        } else {
            navigate(PATH.CHECKOUT.INDEX);
        }
    };

    // Cart Table Props
    const cartTableProps = {
        cartInfor,
        loading,
        product,
        totalProduct,
        quantity,
        variant,
        discount,
        shipping,
        quantityRef,
        handleChangeQuantity,
        onRemoveProduct,
    };

    // Cart Sum Props
    const cartSumProps = { subTotal, total, shipping, handleChangeShopping, goCheckout };

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Shopping Cart</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATH.INDEX}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={PATH.PRODUCTS.index}>Product</Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item isActive={true}> Shopping Cart</Breadcrumb.Item>
            </Breadcrumb>

            <div className="page-content">
                <div className="cart">
                    <div className="container">
                        <div className="row">
                            <CartTable {...cartTableProps} />
                            <CartSum {...cartSumProps} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
