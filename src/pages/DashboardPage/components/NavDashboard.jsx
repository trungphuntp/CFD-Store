import { PATH } from "@/constants/Pathjs";
import { handleLogout } from "@/store/reducers/authReducer";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavDashBoardStyled = styled.ul`
    li.active {
        a {
            color: #fcb941;
        }
    }
`;

const NavDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        console.log(1);

        dispatch(handleLogout());
        navigate("/");
    };

    return (
        <aside className="col-md-4 col-lg-3">
            <NavDashBoardStyled
                className="nav nav-dashboard flex-column mb-3 mb-md-0"
                role="tablist"
            >
                <li className="nav-item">
                    <NavLink
                        to={PATH.DASHBOARD.INDEX}
                        end
                        className="nav-link"
                        id="tab-account-link"
                    >
                        Account Details
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={PATH.DASHBOARD.ODER} className="nav-link" id="tab-orders-link">
                        Orders
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={PATH.DASHBOARD.ADDRESS} className="nav-link" id="tab-address-link">
                        Adresses
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={PATH.DASHBOARD.WISHLIST}
                        className="nav-link"
                        id="tab-wishlist-link"
                    >
                        Wishlist
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleLogOut}>
                        Sign Out
                    </a>
                </li>
            </NavDashBoardStyled>
        </aside>
    );
};

export default NavDashboard;
