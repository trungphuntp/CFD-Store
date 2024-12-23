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
        return axiosInstance.delete("/customer/white-list", { data: payload });
    },
    getProvince: () => {
        return axiosInstance.get("/provinces");
    },
    getProvinceById: (id = "") => {
        return axiosInstance.get(`/provinces/${id}`);
    },
    getDistrict: (ProvinceID = "") => {
        return axiosInstance.get(`/districts?province=${ProvinceID}`);
    },
    getDistrictById: (id = "") => {
        return axiosInstance.get(`/districts/${id}`);
    },
    getWard: (DistrictId = "") => {
        return axiosInstance.get(`/wards?district=${DistrictId}`);
    },
    getWardById: (id = "") => {
        return axiosInstance.get(`/wards/${id}`);
    },
};

export default AuthServices;
