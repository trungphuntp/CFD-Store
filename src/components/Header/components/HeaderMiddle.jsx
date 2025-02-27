import { MenuStyled } from "@/components/StyledComponents";
import { PATH } from "@/constants/Pathjs";
import { useMainContext } from "@/contexts/MainContext";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import DropdownCart from "./DropdownCart";

const HeaderMiddle = () => {
    const { handleOpenMobileMenu } = useMainContext();

    useEffect(() => {
        var $searchWrapper = $(".header-search-wrapper"),
            $body = $("body"),
            $searchToggle = $(".search-toggle");

        $searchToggle.on("click", function (e) {
            $searchWrapper.toggleClass("show");
            $(this).toggleClass("active");
            $searchWrapper.find("input").focus();
            e.preventDefault();
        });

        $body.on("click", function (e) {
            if ($searchWrapper.hasClass("show")) {
                $searchWrapper.removeClass("show");
                $searchToggle.removeClass("active");
                $body.removeClass("is-search-active");
            }
        });

        $(".header-search").on("click", function (e) {
            e.stopPropagation();
        });

        var catDropdown = $(".category-dropdown"),
            catInitVal = catDropdown.data("visible");

        if ($(".sticky-header").length && $(window).width() >= 992) {
            var sticky = new Waypoint.Sticky({
                element: $(".sticky-header")[0],
                stuckClass: "fixed",
                offset: -300,
                handler: function (direction) {
                    // Show category dropdown
                    if (catInitVal && direction == "up") {
                        catDropdown.addClass("show").find(".dropdown-menu").addClass("show");
                        catDropdown.find(".dropdown-toggle").attr("aria-expanded", "true");
                        return false;
                    }

                    // Hide category dropdown on fixed header
                    if (catDropdown.hasClass("show")) {
                        catDropdown.removeClass("show").find(".dropdown-menu").removeClass("show");
                        catDropdown.find(".dropdown-toggle").attr("aria-expanded", "false");
                    }
                },
            });
        }
    }, []);

    return (
        <div className="header-middle sticky-header">
            <div className="container">
                <div className="header-left">
                    <button className="mobile-menu-toggler" onClick={handleOpenMobileMenu}>
                        <span className="sr-only">Toggle mobile menu</span>
                        <i className="icon-bars" />
                    </button>
                    <Link to={PATH.INDEX} className="logo">
                        <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
                    </Link>
                </div>
                <nav className="main-nav">
                    <MenuStyled className="menu">
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
                    </MenuStyled>
                </nav>
                <div className="header-right">
                    <div className="header-search">
                        <a href="#" className="search-toggle" title="Search">
                            <i className="icon-search" />
                        </a>
                        <form action="#" method="get">
                            <div className="header-search-wrapper">
                                <label htmlFor="q" className="sr-only">
                                    Search
                                </label>
                                <input
                                    type="search"
                                    className="form-control"
                                    name="q"
                                    id="q"
                                    placeholder="Search in..."
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownCart />
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;
