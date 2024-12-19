import RadioGroup from "@/components/RadioGroup";
import { SHOPPING_TYPE } from "@/constants/General";
import { PATH } from "@/constants/Pathjs";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";

const CartSum = ({ total, subTotal, shipping, handleChangeShopping, goCheckout }) => {
    const handleCheckout = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        goCheckout?.();
    };
    const handleChangeRadio = (typeShip) => {
        handleChangeShopping?.(typeShip);
    };

    return (
        <aside className="col-lg-3">
            <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                    <tbody>
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${formatCurrency(subTotal || 0)}</td>
                        </tr>
                        <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                        </tr>
                        <RadioGroup
                            onChange={handleChangeRadio}
                            defaultValue={shipping?.typeShip || ""}
                        >
                            {SHOPPING_TYPE.map((typeShop) => {
                                return (
                                    <tr className="summary-shipping-row" key={typeShop.value}>
                                        <td>
                                            <RadioGroup.Item
                                                value={typeShop.value}
                                                label={typeShop.label}
                                            />
                                        </td>
                                        <td>${formatCurrency(typeShop.price)}</td>
                                    </tr>
                                );
                            })}
                        </RadioGroup>

                        {/* <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="free-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label className="custom-control-label" htmlFor="free-shipping">
                                        Free Shipping
                                    </label>
                                </div>
                            </td>
                            <td>$0.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="standart-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="standart-shipping"
                                    >
                                        Standart:
                                    </label>
                                </div>
                            </td>
                            <td>$10.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="express-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="express-shipping"
                                    >
                                        Express:
                                    </label>
                                </div>
                            </td>
                            <td>$20.00</td>
                        </tr> */}

                        <tr className="summary-shipping-estimate">
                            <td>
                                Estimate for Your Country <br />
                                <a href="dashboard.html">Change address</a>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>${formatCurrency(total || 0)}</td>
                        </tr>
                    </tbody>
                </table>
                <a
                    onClick={handleCheckout}
                    href="checkout.html"
                    className="btn btn-outline-primary-2 btn-order btn-block"
                >
                    PROCEED TO CHECKOUT
                </a>
            </div>
            <Link to={PATH.PRODUCTS.INDEX} className="btn btn-outline-dark-2 btn-block mb-3">
                <span>CONTINUE SHOPPING</span>
                <i className="icon-refresh" />
            </Link>
        </aside>
    );
};

export default CartSum;
