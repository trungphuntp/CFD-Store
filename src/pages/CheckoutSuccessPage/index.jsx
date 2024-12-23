import Button from "@/components/Button";
import React from "react";

const CheckoutSuccess = () => {
    return (
        <main className="main">
            <div className="content-success text-center">
                <div className="container">
                    <h1 className="content-title">Your Order is Completed!</h1>
                    <p>
                        Your order has been completed. Your order details are shown for your
                        personal accont.{" "}
                    </p>
                    <Button href="dashboard.html" className="btn-minwidth-lg" variant="outline">
                        <span>VIEW MY ORDERS</span>
                        <i className="icon-long-arrow-right" />
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default CheckoutSuccess;
