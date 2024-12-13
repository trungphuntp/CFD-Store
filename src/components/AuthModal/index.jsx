import { TYPE_MODAL } from "@/constants/General";
import { handleCloseModal, handleShowModal } from "@/store/reducers/authReducer";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AuthLogin from "./components/AuthLogin";
import AuthRegister from "./components/AuthRegister";

const StyledModal = styled.div`
    transition: opacity 0.3s, visibility 0.3s;
    opacity: ${(props) => {
        return props?.$isShow ? " 1" : "0";
    }};
    visibility: ${(props) => {
        return props?.$isShow ? " visible" : "hidden";
    }};
    display: block;
    width: 100%;
    max-width: 575px;
    height: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const StyledOpacity = styled.div`
    opacity: ${(props) => {
        return props?.$isShow ? " 0.8" : "0";
    }};
    visibility: ${(props) => {
        return props?.$isShow ? " visible" : "hidden";
    }};
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    transition: opacity 0.3s, visibility 0.3s;
`;

const AuthModal = () => {
    const { showModal } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const _handleChangeModal = (e, type) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleShowModal(type));
    };
    const _handleCloseModal = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        dispatch(handleCloseModal());
    };

    return (
        <>
            <StyledModal
                className={classNames("modal fade", {
                    show: !!showModal,
                })}
                // id="signin-modal"
                // tabIndex={-1}
                // role="dialog"
                // aria-hidden="true"
                $
                $isShow={!!showModal}
            >
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                // data-dismiss="modal"
                                // aria-label="Close"
                                onClick={(e) => {
                                    _handleCloseModal(e);
                                }}
                            >
                                <span aria-hidden="true">
                                    <i className="icon-close" />
                                </span>
                            </button>
                            <div className="form-box">
                                <div className="form-tab">
                                    <ul
                                        className="nav nav-pills nav-fill nav-border-anim"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${
                                                    showModal === TYPE_MODAL.login ? "active" : ""
                                                }`}
                                                href="#signin"
                                                onClick={(e) => {
                                                    _handleChangeModal(e, TYPE_MODAL.login);
                                                }}
                                            >
                                                Sign In
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${
                                                    showModal === TYPE_MODAL.register
                                                        ? "active"
                                                        : ""
                                                }`}
                                                href="#register"
                                                onClick={(e) => {
                                                    _handleChangeModal(e, TYPE_MODAL.register);
                                                }}
                                            >
                                                Register
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="tab-content-5">
                                        <div
                                            className="tab-pane fade show active"
                                            id="signin"
                                            role="tabpanel"
                                            aria-labelledby="signin-tab"
                                        >
                                            {showModal === TYPE_MODAL.login && <AuthLogin />}
                                            {showModal === TYPE_MODAL.register && <AuthRegister />}

                                            {/* End .form-choice */}
                                        </div>
                                        {/* .End .tab-pane */}
                                    </div>
                                    {/* End .tab-content */}
                                </div>
                                {/* End .form-tab */}
                            </div>
                            {/* End .form-box */}
                        </div>
                        {/* End .modal-body */}
                    </div>
                    {/* End .modal-content */}
                </div>
                {/* End .modal-dialog */}
            </StyledModal>
            <StyledOpacity
                onClick={(e) => {
                    _handleCloseModal(e);
                }}
                $
                $isShow={!!showModal}
            ></StyledOpacity>
        </>
    );
};

export default AuthModal;
