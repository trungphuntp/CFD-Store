import axios from "axios";
import { BASE_URL } from "./enviroment";
import { methodToken } from "./Token";
import AuthServices from "@/services/AuthServices";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

console.log(BASE_URL);

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${methodToken?.get()?.token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        // state code 200 - 299
        return res;
    },
    async (error) => {
        const originalConfig = error?.config;
        originalConfig._refresh = true;
        if (
            error?.status?.response === 401 ||
            error?.status?.response === 402 ||
            error?.status?.response === 403 ||
            (error?.status?.response === 404 && !originalConfig._refresh)
        ) {
            try {
                const payload = {
                    refreshToken: methodToken?.get?.()?.refreshToken,
                };
                const res = await axiosInstance.put("/customer/refresh", payload);

                if (res?.data?.data) {
                    const { accessToken, refreshToken } = res.data.data;
                    methodToken.set({
                        accessToken,
                        refreshToken,
                    });
                    originalConfig.headers.Authorization = `Bearer ${accessToken}`;
                }
                return axiosInstance(originalConfig);
            } catch (error) {
                // fail refresh token or expired the refresh token
                methodToken.remove();
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
