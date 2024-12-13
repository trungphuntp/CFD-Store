import { FORMAT_DATE } from "@/constants/Format";
import { PATH } from "@/constants/Pathjs";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogNamePopularStyled = styled.h4`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

const ImgPopularBlog = styled.figure`
    height: 80px;
    width: 80px;
    a {
        width: 100%;
        height: 100%;
    }
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const BlogPopular = ({ updatedAt, image, name, slug }) => {
    const linkDetail = PATH.BLOG.INDEX + `/${slug}`;
    return (
        <li>
            <ImgPopularBlog>
                <Link to={linkDetail}>
                    <img src={image || ""} alt="post" />
                </Link>
            </ImgPopularBlog>
            <div>
                <p>{formatDate(updatedAt || "1/1/2024", FORMAT_DATE.SECOND)}</p>
                <BlogNamePopularStyled>
                    <Link to={linkDetail}>{name || ""}</Link>
                </BlogNamePopularStyled>
            </div>
        </li>
    );
};

export default BlogPopular;
