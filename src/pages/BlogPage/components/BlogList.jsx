import BlogItem from "@/components/BlogItem";
import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

const SkeletonStyled = styled.div`
    & > div {
        width: 100% !important;
    }
`;

const BlogList = ({ blogs, loading }) => {
    if (loading) {
        return (
            <div className="entry-container max-col-2" data-layout="fitRows">
                {new Array(6).fill("").map((_, index) => {
                    return (
                        <>
                            <SkeletonStyled className={`entry-item col-sm-6`}>
                                <Skeleton.Image
                                    active={true}
                                    style={{ width: "100%", height: 275 }}
                                />
                                <Skeleton.Input active style={{ marginTop: 10 }} />
                                <Skeleton.Input
                                    active
                                    block
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                />
                            </SkeletonStyled>
                        </>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="entry-container max-col-2" data-layout="fitRows">
            {blogs?.map((blog, index) => {
                return <BlogItem key={blog?.id || index} {...blog} className={"col-sm-6"} />;
            })}
        </div>
    );
};

export default BlogList;
