import InputSearch from "@/components/InputSearch";
import React from "react";

const Subscridehome = () => {
    return (
        <div className="container">
            <div
                className="cta cta-separator cta-border-image cta-half mb-0"
                style={{ backgroundImage: "url(/assets/images/demos/demo-3/bg-2.jpg)" }}
            >
                <div className="cta-border-wrapper bg-white">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="cta-wrapper cta-text text-center">
                                <h3 className="cta-title">Shop Social</h3>
                                <p className="cta-desc">
                                    Donec nec justo eget felis facilisis fermentum. Aliquam
                                    porttitor mauris sit amet orci.
                                </p>
                                <div className="social-icons social-icons-colored justify-content-center">
                                    <a
                                        href="https://www.facebook.com/trungphuntp/"
                                        className="social-icon social-facebook"
                                        title="Facebook"
                                        target="_blank"
                                    >
                                        <i className="icon-facebook-f" />
                                    </a>
                                    <a
                                        href="#"
                                        className="social-icon social-twitter"
                                        title="Twitter"
                                        target="_blank"
                                    >
                                        <i className="icon-twitter" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/trungphuntp/"
                                        className="social-icon social-instagram"
                                        title="Instagram"
                                        target="_blank"
                                    >
                                        <i className="icon-instagram" />
                                    </a>
                                    <a
                                        href="#"
                                        className="social-icon social-youtube"
                                        title="Youtube"
                                        target="_blank"
                                    >
                                        <i className="icon-youtube" />
                                    </a>
                                    <a
                                        href="#"
                                        className="social-icon social-pinterest"
                                        title="Pinterest"
                                        target="_blank"
                                    >
                                        <i className="icon-pinterest" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="cta-wrapper text-center">
                                <h3 className="cta-title">Get the Latest Deals</h3>
                                <p className="cta-desc">
                                    and <br />
                                    receive
                                    <span className="text-primary">{` $20 coupon`}</span> for first
                                    shopping
                                </p>
                                <InputSearch />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscridehome;
