import { TYPE_MODAL } from "@/constants/General";
import { handleShowModal } from "@/store/reducers/authReducer";
import { methodToken } from "@/utils/Token";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/" }) => {
    const dispatch = useDispatch();
    if (!!!methodToken.get()) {
        dispatch(handleShowModal(TYPE_MODAL.login));
        return <Navigate to={redirectPath} />;
    }
    return (
        <>
            <Outlet />
        </>
    );
};

export default PrivateRoute;
