import Breadcrumb from "@/components/Breadcrumb";
import { PATH } from "@/constants/Pathjs";
import { Link, useNavigate } from "react-router-dom";
import CheckoutDiscount from "./components/CheckoutDiscount";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutSum from "./components/CheckoutSum";
import OrderServices from "@/services/OrderServices";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCart, handleUpdateCacheCart } from "@/store/reducers/cartReducer";
import { useForm } from "react-hook-form";
import useAddress from "@/hooks/useAddress";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartInfor, loading } = useSelector((state) => state.cart);
    const [selectMethodPayment, setSelectMethodPayment] = useState("");

    const { profile } = useSelector((state) => state.auth);
    const { firstName, email, phone, province, district, ward, street } = profile || [];

    // use form
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: firstName,
            email,
            phone,
            street,
            ward,
            district,
            province,
        },
    });

    // when profile update auto fill infor
    useEffect(() => {
        reset({
            name: firstName,
            email,
            phone,
            street,
            ward,
            district,
            province,
        });
        handleChangeProvince?.(province);
        handleChangeDistrict?.(district);
        handleChangeWard?.(ward);
    }, [profile]);

    // use address
    const {
        provinceId,
        districtId,
        wardId,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        provinces,
        districts,
        wards,
    } = useAddress();

    // handle Add Discount (Voucher)
    const handleAddDiscount = async (dataDiscount) => {
        try {
            if (dataDiscount) {
                const resDisCount = await OrderServices.getVoucher(dataDiscount);
                const Vourcher = resDisCount?.data?.data;
                if (Vourcher) {
                    const { shipping, subTotal } = cartInfor || [];
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

    // handle Remove Discount (Voucher)
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

    // handle Method Payment
    const handleMethodPayment = (typeMethod) => {
        setSelectMethodPayment(typeMethod);
    };

    const onSubmitCheckout = async (dataCheckout) => {
        const {
            shipping,
            variant,
            subTotal,
            total,
            product,
            quantity,
            totalProduct,
            discount,
            discountCode,
        } = cartInfor || [];
        const { name, email, phone, note } = dataCheckout || [];

        if (!selectMethodPayment) {
            message.error("Please select a payment method!");
            return;
        }
        if (!shipping) {
            message.error("Please select a shipping method!");
        }
        const { district, ward, province, street } = getValues() || {};
        if (!district || !ward || !province) {
            message.error("Please check the address again!");
            return;
        }
        // payload Order
        const provinceDetail =
            provinces?.find((provinceItem) => provinceItem?.value === province) || [];
        const districtDetail =
            districts?.find((districtItem) => districtItem?.value === district) || [];
        const wardDetail = wards?.find((wardItem) => wardItem?.value === ward) || [];

        const payload = {
            address: {
                phone: phone,
                email: email,
                fullName: name,
                street: `${street}, ${wardDetail?.label}, ${districtDetail?.label}, ${provinceDetail?.label}`,
            },
            shipping: {
                typeShip: shipping?.typeShip,
                price: shipping?.price,
            },
            variant: variant,
            subTotal: subTotal,
            total: total,
            product: product?.map((product) => product?.id),
            quantity: quantity,
            totalProduct: totalProduct,
            discount: discount || 0,
            discountCode: discountCode || "",
            paymentMethod: selectMethodPayment || "",
            note: note,
        };

        try {
            const res = await OrderServices.checkoutOrder(payload);
            if (res?.data?.data) {
                dispatch(handleGetCart());
                message.success("Checkout successfully!");
                navigate(PATH.CHECKOUT.SUCCESS);
            } else {
                message.error("Checkout failed!");
            }
        } catch (error) {
            message.error("Checkout failed!");
        }
    };

    // Checkout Discount Props
    const checkoutDiscountProps = {
        Voucher: cartInfor?.discountCode || "",
        handleAddDiscount,
        handleRemoveDiscount,
    };

    const CheckoutFormProps = {
        provinceId,
        districtId,
        wardId,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        provinces,
        districts,
        wards,

        register,
        getValues,
        reset,
        control,
        errors,
    };
    const CheckoutSumProps = {
        cartInfor,
        selectMethodPayment,
        handleMethodPayment,
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
                        <form className="checkout-form" onSubmit={handleSubmit(onSubmitCheckout)}>
                            <div className="row">
                                <CheckoutForm {...CheckoutFormProps} />
                                <CheckoutSum {...CheckoutSumProps} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
