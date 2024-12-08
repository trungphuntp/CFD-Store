import axiosInstance from "@/utils/axiosInstance";

const AuthServices = {
    login: (payload = {}) => {
        return axiosInstance.post("/customer/login", payload);
    },
    register: (payload = {}) => {
        return axiosInstance.post("/customer/register", payload);
    },
    getProfile: () => {
        return axiosInstance.get("/customer/profiles");
    },
    updateProfiles: (payload = {}) => {
        return axiosInstance.put("/customer/profiles", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    addWishlist: (payload = {}) => {
        return axiosInstance.post("/customer/white-list", payload);
    },
    removeWishlist: (payload = {}) => {
        return axiosInstance.delete("/customer/white-list", payload);
    },
};

export default AuthServices;
