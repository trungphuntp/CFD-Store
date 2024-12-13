import { PATH } from "@/constants/Pathjs";
import React from "react";
import { Link } from "react-router-dom";

const NavDetailBlog = ({ blogs = [] }) => {
    const linkDetailBlogPrev = PATH.BLOG.INDEX + `/${blogs[0]?.slug}`;
    const linkDetailBlogNext = PATH.BLOG.INDEX + `/${blogs[1]?.slug}`;

    return (
        <nav className="pager-nav" aria-label="Page navigation">
            {!!blogs && (
                <>
                    <Link to={linkDetailBlogPrev} className="pager-link pager-link-prev">
                        {" "}
                        Previous Post <span className="pager-link-title">{blogs[0]?.name}</span>
                    </Link>
                    <Link className="pager-link pager-link-next" to={linkDetailBlogNext}>
                        {" "}
                        Next Post <span className="pager-link-title">{blogs[1]?.name}</span>
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavDetailBlog;
