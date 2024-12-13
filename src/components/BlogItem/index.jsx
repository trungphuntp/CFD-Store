import { FORMAT_DATE } from "@/constants/Format";
import { PATH } from "@/constants/Pathjs";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DescStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
`;

const BlogItemStyled = styled.div`
    h1,
    .h1,
    h3,
    .h3,
    h4,
    .h4,
    h5,
    .h5,
    h6,
    .h6 {
        font-size: initial !important;
        margin-bottom: initial !important;
        color: #777 !important;
    }
    strong {
        font-weight: 300 !important;
    }
`;

const BlogItem = ({ author, name, image, description, updatedAt, slug, className }) => {
    const linkDetailBlog = PATH.BLOG.INDEX + `/${slug}`;

    return (
        <BlogItemStyled className={`entry-item ${className}`}>
            <article className="entry entry-grid">
                <figure className="entry-media">
                    <Link to={linkDetailBlog}>
                        <img src={image || ""} alt="image desc" />
                    </Link>
                </figure>
                <div className="entry-body">
                    <div className="entry-meta">
                        <span>{formatDate(updatedAt || "1/1/2024", FORMAT_DATE.SECOND)}</span>
                        <span className="meta-separator">|</span>
                        <span className="entry-author">
                            {" "}
                            by <Link to={linkDetailBlog}>{author || "Anonymous"}</Link>
                        </span>
                    </div>
                    <h2 className="entry-title">
                        <Link to={linkDetailBlog}>{name || ""}</Link>
                    </h2>
                    <div className="entry-content">
                        <DescStyled dangerouslySetInnerHTML={{ __html: description }}></DescStyled>

                        <Link to={linkDetailBlog} className="read-more">
                            Read More
                        </Link>
                    </div>
                </div>
            </article>
        </BlogItemStyled>
    );
};

export default BlogItem;
