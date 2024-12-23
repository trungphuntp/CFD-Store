import { PATH } from "@/constants/Pathjs";
import useAddress from "@/hooks/useAddress";
import useQuery from "@/hooks/useQuery";
import AuthServices from "@/services/AuthServices";
import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const MyAddress = () => {
    const { profile } = useSelector((state) => state.auth);
    const { firstName, email, phone, province, district, ward, street } = profile || [];
    const formatPhone =
        `${phone?.substring(0, 3)} ${phone?.substring(3, 7)} ${phone?.substring(7)}` || "";

    const { data: dataProvince } = useQuery(
        (query) => AuthServices.getProvinceById(province),
        [profile]
    );
    const { data: dataDistrict } = useQuery(
        (query) => AuthServices.getDistrictById(district),
        [profile]
    );
    const { data: dataWard } = useQuery((query) => AuthServices.getWardById(ward), [profile]);

    console.log(dataWard);

    return (
        <NavLink
            className={({ isActive }) => classNames("tab-pane fade", { "active show": isActive })}
            id="tab-address"
        >
            <p>The following addresses will be used on the checkout page by default.</p>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Billing Address</h3>
                            <p>
                                <strong>Fullname:</strong> {firstName || email || ""} <br />
                                <strong>Email:</strong> {email || ""} <br />
                                <strong>Phone number:</strong> {formatPhone} <br />
                                <br />
                                <Link to={PATH.DASHBOARD.INDEX}>
                                    Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card card-dashboard">
                        <div className="card-body">
                            <h3 className="card-title">Shipping Address</h3>
                            <p>
                                {`${street || ""}, ${dataWard?.name || ""}, ${
                                    dataDistrict?.name || ""
                                } - ${dataProvince?.name || ""}`}
                                <br />
                                <Link to={PATH.DASHBOARD.INDEX}>
                                    Edit <i className="icon-edit" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default MyAddress;
