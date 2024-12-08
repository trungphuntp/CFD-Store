import axiosInstance from "@/utils/axiosInstance";

const SubscribeServices = {
    subscribe: (payload = {}) => {
        return axiosInstance.post("/subscribes", payload);
    },
    deal: (payload = {}) => {
        return axiosInstance.post("/subscribes/deals", payload);
    },
};
export default SubscribeServices;
