import { TYPE_MODAL } from "@/constants/General";
import { PATH } from "@/constants/Pathjs";
import useDebounce from "@/hooks/useDebounce";
import { handleLogout, handleShowModal } from "@/store/reducers/authReducer";
import { methodToken } from "@/utils/Token";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HeaderTop = () => {
    const navigate = useNavigate();
    const { profile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const _onShowModal = (e, type) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleShowModal(type));
    };

    const _onLogout = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleLogout());
        navigate("/");
    };
    const { firstName, whiteList, email } = profile || [];

    return (
        <div className="header-top">
            <div className="container">
                <div className="header-left">
                    <a href="tel:0989596912">
                        <i className="icon-phone" /> Hotline: 098 9596 912
                    </a>
                </div>
                <div className="header-right">
                    {!methodToken.get() && !profile ? (
                        //   Not LogIn
                        <ul class="top-menu top-link-menu">
                            <li>
                                <a
                                    href="#signin-modal"
                                    class="top-menu-login"
                                    onClick={(e) => {
                                        _onShowModal(e, TYPE_MODAL.login);
                                    }}
                                >
                                    <i class="icon-user"></i>Login | Resgister{" "}
                                </a>
                            </li>
                        </ul> // Logged In
                    ) : (
                        <ul className="top-menu">
                            <li>
                                <a
                                    href="#"
                                    className="top-link-menu"
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <i className="icon-user" />
                                    {firstName || email || "Guest"}
                                </a>
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                                <Link to={PATH.DASHBOARD.INDEX}>
                                                    Account Details
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={PATH.DASHBOARD.ODER}>Your Orders</Link>
                                            </li>
                                            <li>
                                                <Link to={PATH.DASHBOARD.WISHLIST}>
                                                    Wishlist{" "}
                                                    <span>
                                                        {whiteList?.length > 0
                                                            ? `(${whiteList?.length})`
                                                            : `(0)`}
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <a onClick={_onLogout} href="#">
                                                    Sign Out
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;
