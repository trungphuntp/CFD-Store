import React from "react";

const CheckoutForm = () => {
    return (
        <div className="col-lg-9">
            <h2 className="checkout-title">Billing Details</h2>
            <div className="row">
                <div className="col-sm-4">
                    <label>Full Name *</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="col-sm-4">
                    <label>Phone number *</label>
                    <input type="text" className="form-control input-error" required />
                    <p className="form-error">Please fill in this field</p>
                </div>
                <div className="col-sm-4">
                    <label>Email address *</label>
                    <input type="email" className="form-control" required />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <label>Province/City *</label>
                    <div className="select-custom">
                        <select
                            className="form-control form-select"
                            id="city"
                            aria-label="Default select example"
                        >
                            <option selected />
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <label>District/Town *</label>
                    <div className="select-custom">
                        <select className="form-control form-select" id="district">
                            <option selected />
                        </select>
                    </div>
                </div>
                <div className="col-sm-4">
                    <label>Ward *</label>
                    <div className="select-custom">
                        <select className="form-control form-select" id="ward">
                            <option selected />
                        </select>
                    </div>
                </div>
            </div>
            <label>Street address *</label>
            <input
                type="text"
                className="form-control input-error"
                placeholder="House number and Street name"
                required
            />
            <p className="form-error">Please fill in this field</p>
            <label>Order notes (optional)</label>
            <textarea
                className="form-control"
                cols={30}
                rows={4}
                placeholder="Notes about your order, e.g. special notes for delivery"
                defaultValue={""}
            />
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                <label className="custom-control-label" htmlFor="checkout-create-acc">
                    Create an account?
                </label>
            </div>
        </div>
    );
};

export default CheckoutForm;
