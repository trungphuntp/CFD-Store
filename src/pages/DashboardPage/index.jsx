import React from "react";
import MyAccount from "./components/MyAccount";
import MyOders from "./components/MyOders";
import MyAddress from "./components/MyAddress";
import MyWishlist from "./components/MyWishlist";

const DashboardPage = () => {
    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">My Account</h1>
                </div>
            </div>
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            My Account
                        </li>
                    </ol>
                </div>
            </nav>
            <div className="page-content">
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-4 col-lg-3">
                                <ul
                                    className="nav nav-dashboard flex-column mb-3 mb-md-0"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="tab-account-link"
                                            data-toggle="tab"
                                            href="#tab-account"
                                            role="tab"
                                            aria-controls="tab-account"
                                            aria-selected="false"
                                        >
                                            Account Details
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="tab-orders-link"
                                            data-toggle="tab"
                                            href="#tab-orders"
                                            role="tab"
                                            aria-controls="tab-orders"
                                            aria-selected="false"
                                        >
                                            Orders
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="tab-address-link"
                                            data-toggle="tab"
                                            href="#tab-address"
                                            role="tab"
                                            aria-controls="tab-address"
                                            aria-selected="false"
                                        >
                                            Adresses
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="tab-wishlist-link"
                                            data-toggle="tab"
                                            href="#tab-wishlist"
                                            role="tab"
                                            aria-controls="tab-wishlist"
                                            aria-selected="false"
                                        >
                                            Wishlist
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </aside>
                            <div className="col-md-8 col-lg-9">
                                <div className="tab-content">
                                    <MyAccount />
                                    <MyOders />
                                    <MyAddress />
                                    <MyWishlist />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
