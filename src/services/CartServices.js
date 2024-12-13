import axiosInstance from "@/utils/axiosInstance";

const CartServices = {
    getCart: (query = "") => {
        return axiosInstance.get(`/carts/me${query}`);
    },
    updateCart: (payload = {}) => {
        return axiosInstance.put("/carts", payload);
    },
};
export default CartServices;
