import Button from "@/components/Button";
import ComponentLoading from "@/components/ComponentLoading";
import { PATH } from "@/constants/Pathjs";
import useQuery from "@/hooks/useQuery";
import OrderServices from "@/services/OrderServices";
import { formatCurrency } from "@/utils/format";
import { Spin } from "antd";
import classNames from "classnames";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const MyOders = () => {
    const { data: ordersData, loading: ordersLoading } = useQuery(OrderServices.getMyOrder);
    const ordersProducts = ordersData?.orders;
    return (
        <NavLink
            className={({ isActive }) => classNames("tab-pane fade", { "active show": isActive })}
            id="tab-orders"
        >
            <table className="table table-cart table-mobile">
                {ordersLoading && (
                    <ComponentLoading>
                        <Spin />
                    </ComponentLoading>
                )}
                {ordersProducts?.length < 1 && (
                    <>
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
                                    <p>No order has been made yet.</p>
                                    <Button link={PATH.PRODUCTS.INDEX} variant="outline">
                                        <span>GO SHOP</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </>
                )}
                {ordersProducts?.length > 0 && (
                    <>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersProducts?.map((order) => {
                                const { quantity, totalProduct } = order;
                                return order?.product?.map((product, index) => {
                                    const { name, slug, images, price, discount } = product || [];
                                    const linkDetail = PATH.PRODUCTS.INDEX + `/${slug}`;
                                    const priceProduct = price - discount;

                                    let imageProduct = images?.[0];
                                    if (imageProduct?.split("https")?.length > 2) {
                                        imageProduct = imageProduct?.split("https");
                                        imageProduct =
                                            "https" + imageProduct[imageProduct?.length - 1];
                                    }
                                    return (
                                        <tr>
                                            <td className="product-col">
                                                <div className="product">
                                                    <figure className="product-media">
                                                        <Link to={linkDetail}>
                                                            <img
                                                                src={imageProduct || ""}
                                                                alt="Product image"
                                                            />
                                                        </Link>
                                                    </figure>
                                                    <h3 className="product-title">
                                                        <Link to={linkDetail}>{name || ""}</Link>
                                                    </h3>
                                                </div>
                                            </td>
                                            <td className="price-col text-center">
                                                ${formatCurrency(priceProduct || 0)}
                                            </td>
                                            <td className="quantity-col text-center">
                                                {quantity?.[index] || 0}
                                            </td>
                                            <td className="total-col text-center">
                                                ${formatCurrency(totalProduct?.[index] || 0)}
                                            </td>
                                        </tr>
                                    );
                                });
                            })}
                        </tbody>
                    </>
                )}
            </table>
        </NavLink>
    );
};

export default MyOders;
