import axios from "axios";
import { BASE_URL } from "./enviroment";
import { methodToken } from "./Token";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

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

        if (
            (error?.response?.status === 401 ||
                error?.response?.status === 402 ||
                error?.response?.status === 403 ||
                error?.response?.status === 404) &&
            !originalConfig._refresh
        ) {
            originalConfig._refresh = true;
            try {
                const payload = {
                    refreshToken: methodToken?.get?.()?.refreshToken,
                };
                const res = await axiosInstance.put("/customer/refresh", payload);

                if (res?.data?.data) {
                    const { token, refreshToken } = res.data.data;
                    methodToken.set({
                        token,
                        refreshToken,
                    });
                    originalConfig.headers.Authorization = `Bearer ${token}`;
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
