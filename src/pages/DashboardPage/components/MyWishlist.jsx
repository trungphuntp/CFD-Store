import Button from "@/components/Button";
import ComponentLoading from "@/components/ComponentLoading";
import { PATH } from "@/constants/Pathjs";
import AuthServices from "@/services/AuthServices";
import { handleGetProfile } from "@/store/reducers/authReducer";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { formatCurrency } from "@/utils/format";
import { message, Spin } from "antd";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const MyWishlist = () => {
    const { profile, loading } = useSelector((state) => state.auth) || [];
    const dispatch = useDispatch();
    const { whiteList } = profile || [];
    const handleAddToCart = async (e, dataProduct) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (dataProduct) {
            const { id, color, quantity, price, discount } = dataProduct || [];
            const addPayload = {
                addedID: id,
                addedColor: color[0],
                addedQuantity: 1,
                addedPrice: price - discount,
            };
            try {
                const res = await dispatch(handleAddCart(addPayload)).unwrap();
            } catch (error) {}
        }
    };
    const handleRemoveToWishlist = async (e, idProduct) => {
        e?.preventDefault();
        e?.stopPropagation();
        try {
            if (idProduct) {
                const payload = {
                    product: idProduct,
                };
                const res = await AuthServices.removeWishlist(payload);
                if (res?.data?.data) {
                    message.success("Remove wishlist product successfully!");
                    dispatch(handleGetProfile());
                } else {
                    message.success("Remove wishlist product failed!");
                }
            }
        } catch (error) {
            message.success("Remove wishlist product failed!");
        }
    };

    return (
        <>
            {!!loading.getProfile && (
                <ComponentLoading>
                    <Spin />
                </ComponentLoading>
            )}
            <NavLink
                className={({ isActive }) =>
                    classNames("tab-pane fade", { "active show": isActive })
                }
                id="tab-wishlist"
            >
                <table className="table table-wishlist table-mobile">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Stock Status</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {!!whiteList?.length < 1 && (
                            <tr>
                                <td colSpan={3}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <p>There are no wishlist products</p>{" "}
                                        <Button link={PATH.PRODUCTS.INDEX} variant="outline">
                                            <span>GO SHOP</span>
                                            <i class="icon-long-arrow-right"></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!!whiteList?.length > 0 &&
                            whiteList?.map((itemWishlist, index) => {
                                const { images, name, price, discount, slug, stock, id } =
                                    itemWishlist;
                                const linkDetailProduct = PATH.PRODUCTS.INDEX + `/${slug || ""}`;
                                const priceProduct = formatCurrency((price || 0) - (discount || 0));
                                return (
                                    <tr key={itemWishlist?.id || new Date().getTime() + index}>
                                        <td className="product-col">
                                            <div className="product">
                                                <figure className="product-media">
                                                    <Link to={linkDetailProduct}>
                                                        <img
                                                            src={
                                                                images?.length > 0
                                                                    ? `https://cfdshop.hn.ss.bfcplatform.vn/images/product/${images[0]}`
                                                                    : ""
                                                            }
                                                            alt="Product image"
                                                        />
                                                    </Link>
                                                </figure>
                                                <h3 className="product-title">
                                                    <Link to={linkDetailProduct}>{name || ""}</Link>
                                                </h3>
                                            </div>
                                        </td>
                                        <td className="price-col text-center">${priceProduct}</td>
                                        <td className="stock-col text-center">
                                            {!!stock > 0 ? (
                                                <span className="in-stock">In stock</span>
                                            ) : (
                                                <span className="out-of-stock">Out of stock</span>
                                            )}
                                        </td>
                                        <td className="action-col">
                                            <Button
                                                variant="outline"
                                                onClick={(e) => {
                                                    if (stock > 0) {
                                                        handleAddToCart(e, itemWishlist);
                                                    } else {
                                                        message.error(
                                                            "This product is out of stock!"
                                                        );
                                                    }
                                                }}
                                            >
                                                <i className="icon-cart-plus" />
                                                Add to Cart{" "}
                                            </Button>
                                        </td>
                                        <td className="remove-col">
                                            <button
                                                className="btn-remove"
                                                onClick={(e) => {
                                                    handleRemoveToWishlist(e, id);
                                                }}
                                            >
                                                <i className="icon-close" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </NavLink>
        </>
    );
};

export default MyWishlist;
