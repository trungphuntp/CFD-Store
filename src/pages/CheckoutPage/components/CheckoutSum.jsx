import Button from "@/components/Button";
import { TYPE_METHOD_PAYMENT } from "@/constants/General";
import { PATH } from "@/constants/Pathjs";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";

const CheckoutSum = ({ cartInfor, selectMethodPayment, handleMethodPayment }) => {
    const { product, quantity, total, subTotal, totalProduct, shipping, discount, discountCode } =
        cartInfor || [];

    const handleChangeMethod = (e, typeMethod) => {
        e?.preventDefault();
        e?.stopPropagation();
        handleMethodPayment?.(typeMethod);
    };

    return (
        <aside className="col-lg-3">
            <div className="summary">
                <h3 className="summary-title">Your Order</h3>
                <table className="table table-summary">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product?.map((product, index) => {
                            const { slug, name } = product;
                            const linkDetail = PATH.PRODUCTS.INDEX + `/${slug || ""}`;

                            return (
                                <tr key={product?.id + index}>
                                    <td>
                                        <Link to={linkDetail}>{name || ""}</Link>
                                    </td>
                                    <td>{`${quantity[index]} x ${formatCurrency(
                                        totalProduct[index]
                                    )}`}</td>
                                </tr>
                            );
                        })}

                        {/* SUB TOTAL */}
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${formatCurrency(subTotal || 0)}</td>
                        </tr>
                        {!!shipping ? (
                            <tr>
                                <td>Shipping:</td>
                                <td>{`${shipping?.typeShip || ""} ($${formatCurrency(
                                    shipping?.price || 0
                                )})`}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td>Shipping:</td>
                                <td>
                                    <Link to={PATH.CART}>Select shipping</Link>
                                </td>
                            </tr>
                        )}
                        {!!discount && !!discountCode && (
                            <tr>
                                <td>Discount:</td>
                                <td>{`${discountCode || ""} - $${formatCurrency(
                                    discount || 0
                                )}`}</td>
                            </tr>
                        )}

                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>${formatCurrency(total || 0)}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="accordion-summary" id="accordion-payment">
                    <div className="card">
                        <div className="card-header" id="heading-1" style={{ cursor: "pointer" }}>
                            <h2 className="card-title">
                                <a
                                    onClick={(e) => {
                                        handleChangeMethod(e, TYPE_METHOD_PAYMENT.cash);
                                    }}
                                    className={`${
                                        selectMethodPayment !== TYPE_METHOD_PAYMENT.cash
                                            ? "collapsed"
                                            : ""
                                    }`}
                                    href="#collapse-1"
                                >
                                    {" "}
                                    Direct bank transfer{" "}
                                </a>
                            </h2>
                        </div>
                        <div
                            id="collapse-1"
                            className={`collapse ${
                                selectMethodPayment === TYPE_METHOD_PAYMENT.cash ? "show" : ""
                            }`}
                        >
                            <div className="card-body">
                                {" "}
                                Make your payment directly into our bank account. Please use your
                                Order ID as the payment reference. Your order will not be shipped
                                until the funds have cleared in our account.{" "}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="heading-3">
                            <h2 className="card-title">
                                <a
                                    onClick={(e) => {
                                        handleChangeMethod(e, TYPE_METHOD_PAYMENT.card);
                                    }}
                                    className={`${
                                        selectMethodPayment !== TYPE_METHOD_PAYMENT.card
                                            ? "collapsed"
                                            : ""
                                    }`}
                                    href="#collapse-3"
                                >
                                    {" "}
                                    Cash on delivery{" "}
                                </a>
                            </h2>
                        </div>
                        <div
                            id="collapse-3"
                            className={`collapse ${
                                selectMethodPayment === TYPE_METHOD_PAYMENT.card ? "show" : ""
                            }`}
                        >
                            <div className="card-body">
                                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                                consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis
                                eros.{" "}
                            </div>
                        </div>
                    </div>
                </div>
                <Button type="submit" className="btn-order btn-block" variant="outline">
                    <span className="btn-text">Place Order</span>
                    <span className="btn-hover-text">Proceed to Checkout</span>
                </Button>
            </div>
        </aside>
    );
};

export default CheckoutSum;
