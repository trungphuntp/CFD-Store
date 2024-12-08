import AuthServices from "@/services/AuthServices";
import React, { createContext, useContext } from "react";
import { useMainContext } from "../MainContext";
import { methodToken } from "@/utils/Token";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const { messageApi, handleShowModalAuth } = useMainContext();
    const navigate = useNavigate();

    const handleLogin = async (loginData, callback) => {
        try {
            const { email, password } = loginData || {};
            const payload = {
                email: email || "",
                password: password || "",
            };

            const res = await AuthServices.login(payload);

            if (res?.data?.data) {
                messageApi.success("Login success!");
                const { token: accessToken, refreshToken } = res.data.data;
                methodToken.set({ token: accessToken, refreshToken });
                handleShowModalAuth?.("");
            }
        } catch (error) {
            messageApi.error("Wrong account or password!");
        } finally {
            callback?.();
        }
    };
    const handleRegister = async (registerData, callback) => {
        try {
            const { email, password } = registerData || {};
            const payload = {
                firstName: email || "",
                lastName: "",
                email: email || "",
                password: password || "",
            };
            const res = await AuthServices.register(payload);
            console.log(res);

            if (res?.data?.data?.id) {
                messageApi.success("Register success!");
            }
        } catch (error) {
            messageApi.error("Register failed!");
        } finally {
            callback?.();
        }
    };
    const handleLogout = () => {
        methodToken.remove();
        navigate("/");
        messageApi.success("Logout success!");
    };

    return (
        <AuthContext.Provider value={{ handleRegister, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
