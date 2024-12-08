import SubscribeServices from "@/services/SubscribeServices";
import ScrollTop from "@/utils/ScrollTop";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
    // scollTop
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        handleCloseMobileMenu();
        const myTimeOut = setTimeout(() => {
            ScrollTop();
        }, 100);

        return () => {
            clearTimeout(myTimeOut);
        };
    }, [pathname]);

    // close menu mobile
    const handleCloseMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        $("body").removeClass("mmenu-active");
    };

    // open menu mobile
    const handleOpenMobileMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        $("body").addClass("mmenu-active");
    };

    // handleSubscibe
    const handleSubscibe = async (dataSubscibe, callback) => {
        try {
            const { email, message, name, phone, subject } = dataSubscibe;
            const payload = {
                name,
                email,
                phone,
                description: message || "",
                title: subject || "",
            };

            const res = await SubscribeServices.subscribe(payload);

            if (res?.data?.data?.id) {
                messageApi.success("sent successfully!");
                navigate("/");
            }
        } catch (error) {
            messageApi.error("sent failed!");
        } finally {
            callback?.();
        }
    };

    return (
        <>
            {contextHolder}
            <MainContext.Provider
                value={{
                    handleCloseMobileMenu,
                    handleOpenMobileMenu,
                    handleSubscibe,
                    messageApi,
                }}
            >
                {children}
            </MainContext.Provider>
        </>
    );
};

export const useMainContext = () => useContext(MainContext);
