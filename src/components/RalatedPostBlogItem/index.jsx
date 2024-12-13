import { FORMAT_DATE } from "@/constants/Format";
import { PATH } from "@/constants/Pathjs";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TitleStyled = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

const RalatedPostBlogItem = ({ name, author, updatedAt, image, slug }) => {
    const linkDetailBlog = PATH.BLOG.INDEX + `/${slug}`;
    return (
        <article className="entry entry-grid">
            <figure className="entry-media">
                <Link to={linkDetailBlog}>
                    <img src={image || ""} alt="image desc" />
                </Link>
            </figure>
            <div className="entry-body">
                <div className="entry-meta">
                    <span>{formatDate(updatedAt, FORMAT_DATE.SECOND)}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                        by <a href="#">{author || "Anonymous"}</a>
                    </span>
                </div>
                <TitleStyled className="entry-title">
                    <Link to={linkDetailBlog}>{name || ""}</Link>
                </TitleStyled>
            </div>
        </article>
    );
};

export default RalatedPostBlogItem;
