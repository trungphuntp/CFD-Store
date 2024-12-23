import axiosInstance from "@/utils/axiosInstance";
const OrderServices = {
    getVoucher: (query = "") => {
        return axiosInstance.get(`/orders/voucher/${query}`);
    },
    getMyOrder: () => {
        return axiosInstance.get("/orders/me");
    },
    getMyOrderById: (id = "") => {
        return axiosInstance.get(`/orders/${id}/me`);
    },
    checkoutOrder: (payload = {}) => {
        return axiosInstance.post(`/orders`, payload);
    },
};
export default OrderServices;
