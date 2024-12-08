import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PATH } from "./constants/Pathjs";
import MainLayout from "./layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import CheckoutSuccess from "./pages/CheckoutSuccessPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashboardPage from "./pages/DashboardPage";
import MyAccount from "./pages/DashboardPage/components/MyAccount";
import MyAddress from "./pages/DashboardPage/components/MyAddress";
import MyWishlist from "./pages/DashboardPage/components/MyWishlist";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { handleGetProfile } from "./store/reducers/authReducer";
import { message } from "antd";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        message.config({
            top: 60,
            duration: 3,
            maxCount: 3,
        });
        dispatch(handleGetProfile());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* Home page */}
                    <Route index element={<HomePage />} />

                    {/* About page */}
                    <Route path={PATH.ABOUT} element={<AboutPage />} />

                    {/* Blog page */}
                    <Route path={PATH.BLOG.INDEX} element={<BlogPage />} />
                    <Route path={PATH.BLOG.DETAIL} element={<BlogDetailPage />} />

                    {/* Product page */}
                    <Route path={PATH.PRODUCTS.INDEX} element={<ProductPage />} />
                    <Route path={PATH.PRODUCTS.DETAIL} element={<ProductDetailPage />} />

                    {/* PRIVATE ROUTE */}
                    <Route element={<PrivateRoute />}>
                        {/* dashboard page */}
                        <Route path={PATH.DASHBOARD.INDEX} element={<DashboardPage />}>
                            <Route path={PATH.DASHBOARD.ODER} element={<MyAccount />} />
                            <Route path={PATH.DASHBOARD.ADDRESS} element={<MyAddress />} />
                            <Route path={PATH.DASHBOARD.WISHLIST} element={<MyWishlist />} />
                        </Route>

                        {/* Cart page */}
                        <Route path={PATH.CART} element={<CartPage />} />

                        {/* Checkout page */}
                        <Route path={PATH.CHECKOUT.INDEX} element={<CheckoutPage />} />
                        <Route path={PATH.CHECKOUT.SUCCESS} element={<CheckoutSuccess />} />
                    </Route>

                    {/* Contact page */}
                    <Route path={PATH.CONTACT} element={<ContactPage />} />

                    {/* FAQ page */}
                    <Route path={PATH.FAQ} element={<FaqPage />} />

                    {/* payment method page */}
                    <Route path={PATH.PAYMENT} element={<PaymentMethodPage />} />

                    {/* privacy policy page */}
                    <Route path={PATH.PRIVACY} element={<PrivacyPolicyPage />} />

                    {/* returns page */}
                    <Route path={PATH.RETURNS} element={<ReturnsPage />} />

                    {/* shipping page */}
                    <Route path={PATH.SHIPPING} element={<ShippingPage />} />

                    {/* 404 Page */}
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
