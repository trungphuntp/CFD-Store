import { PATH } from "@/constants/Pathjs";
import { useMainContext } from "@/contexts/MainContext";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuStyled } from "../StyledComponents";
import classNames from "classnames";
import styled from "styled-components";
import useQuery from "@/hooks/useQuery";
import ProductServices from "@/services/ProductServices";

const MENU = {
    menu: "menu",
    category: "category",
};

const MobileMenu = () => {
    const { handleCloseMobileMenu } = useMainContext();
    const [selectMenuMobile, setSelectMenuMobile] = useState(MENU.menu);

    const handleSelectMenuMenu = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        setSelectMenuMobile(MENU.menu);
    };
    const handleSelectMenuCategory = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        setSelectMenuMobile(MENU.category);
    };

    const { data: categoryProduct } = useQuery(ProductServices.getProductCategories);
    const categories = categoryProduct?.products || [];

    return (
        <div className="mobile-menu-container">
            <div className="mobile-menu-wrapper">
                <span className="mobile-menu-close" onClick={handleCloseMobileMenu}>
                    <i className="icon-close" />
                </span>
                <form action="#" method="get" className="mobile-search">
                    <label htmlFor="mobile-search" className="sr-only">
                        Search
                    </label>
                    <input
                        type="search"
                        className="form-control"
                        name="mobile-search"
                        id="mobile-search"
                        placeholder="Search in..."
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        <i className="icon-search" />
                    </button>
                </form>
                <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
                    <li className="nav-item">
                        <a
                            className={classNames("nav-link", {
                                " active": selectMenuMobile === MENU.menu,
                            })}
                            href="#mobile-menu-tab"
                            // data-toggle="tab"
                            // id="mobile-menu-link"
                            // role="tab"
                            // aria-controls="mobile-menu-tab"
                            // aria-selected="true"
                            onClick={handleSelectMenuMenu}
                        >
                            Menu
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={classNames("nav-link", {
                                " active": selectMenuMobile === MENU.category,
                            })}
                            href="#mobile-cats-tab"
                            // data-toggle="tab"
                            // id="mobile-cats-link"
                            // role="tab"
                            // aria-controls="mobile-cats-tab"
                            // aria-selected="false"
                            onClick={handleSelectMenuCategory}
                        >
                            Categories
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div
                        id="mobile-menu-tab"
                        role="tabpanel"
                        aria-labelledby="mobile-menu-link"
                        className={classNames("tab-pane", {
                            " show active": selectMenuMobile === MENU.menu,
                        })}
                    >
                        <MenuStyled className="mobile-nav ">
                            <ul className="mobile-menu">
                                <li>
                                    <NavLink to={PATH.INDEX}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.ABOUT}>About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.PRODUCTS.INDEX}>Product</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.BLOG.INDEX}>Blog</NavLink>
                                </li>
                                <li>
                                    <NavLink to={PATH.CONTACT}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </MenuStyled>
                        {/* End .mobile-nav */}
                    </div>
                    {/* .End .tab-pane */}
                    <div
                        id="mobile-cats-tab"
                        role="tabpanel"
                        aria-labelledby="mobile-cats-link"
                        className={classNames("tab-pane", {
                            " show active": selectMenuMobile === MENU.category,
                        })}
                    >
                        <nav className="mobile-cats-nav">
                            <ul className="mobile-cats-menu">
                                {categories?.map((cate, index) => {
                                    const { id, name, slug } = cate;
                                    return (
                                        <li key={id || index}>
                                            <Link
                                                to={PATH.PRODUCTS.INDEX + `?category=${id}`}
                                                className="mobile-cats-lead"
                                                href="#"
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* End .mobile-cats-menu */}
                        </nav>
                        {/* End .mobile-cats-nav */}
                    </div>
                    {/* .End .tab-pane */}
                </div>
                {/* End .tab-content */}
                <div className="social-icons">
                    <a href="#" className="social-icon" target="_blank" title="Facebook">
                        <i className="icon-facebook-f" />
                    </a>
                    <a href="#" className="social-icon" target="_blank" title="Twitter">
                        <i className="icon-twitter" />
                    </a>
                    <a href="#" className="social-icon" target="_blank" title="Instagram">
                        <i className="icon-instagram" />
                    </a>
                    <a href="#" className="social-icon" target="_blank" title="Youtube">
                        <i className="icon-youtube" />
                    </a>
                </div>
                {/* End .social-icons */}
            </div>
            {/* End .mobile-menu-wrapper */}
        </div>
    );
};

export default MobileMenu;
