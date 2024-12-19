import Breadcrumb from "@/components/Breadcrumb";
import { PATH } from "@/constants/Pathjs";
import { Link } from "react-router-dom";
import CheckoutDiscount from "./components/CheckoutDiscount";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutSum from "./components/CheckoutSum";
import OrderServices from "@/services/OrderServices";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateCacheCart } from "@/store/reducers/cartReducer";

const CheckoutPage = () => {
    const { cartInfor, loading } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { shipping, subTotal } = cartInfor || [];

    const handleAddDiscount = async (dataDiscount) => {
        try {
            if (dataDiscount) {
                const resDisCount = await OrderServices.getVoucher(dataDiscount);
                const Vourcher = resDisCount?.data?.data;
                if (Vourcher) {
                    dispatch(
                        handleUpdateCacheCart({
                            ...cartInfor,
                            discount: Vourcher?.value || 0,
                            discountCode: Vourcher?.code || "",
                            total: subTotal - (Vourcher?.value || 0) + (shipping?.price || 0),
                        })
                    );
                    message.success("Add voucher successfully!");
                }
            }
        } catch (error) {
            message.error("Voucher not found!");
        }
    };

    const handleRemoveDiscount = () => {
        try {
            if (cartInfor.discountCode) {
                dispatch(
                    handleUpdateCacheCart({
                        ...cartInfor,
                        discount: 0,
                        discountCode: "",
                        total: subTotal + (shipping?.price || 0),
                    })
                );
                message.success("Remove voucher successfully!");
            }
        } catch (error) {
            message.error("Remove voucher successfully!");
        }
    };

    const checkoutDiscountProps = {
        Voucher: cartInfor.discountCode,
        handleAddDiscount,
        handleRemoveDiscount,
    };

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Checkout</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATH.INDEX}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={PATH.PRODUCTS.INDEX}>Product</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive={true}>Checkout</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <CheckoutDiscount {...checkoutDiscountProps} />
                        <form action="#" className="checkout-form">
                            <div className="row">
                                <CheckoutForm />
                                <CheckoutSum />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
