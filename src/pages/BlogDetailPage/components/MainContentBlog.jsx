import ShareLink from "@/components/ShareLink";
import React from "react";

const MainContentBlog = ({ image, name, description, author, date, tags }) => {
    return (
        <article className="entry single-entry">
            <div className="entry-body">
                <figure className="entry-media">
                    <img src={image || ""} alt="image desc" />
                </figure>
                <h1 className="entry-title entry-title-big"> {name || ""} </h1>
                <div className="entry-meta">
                    <span>{date || ""}</span>
                    <span className="meta-separator">|</span>
                    <span className="entry-author">
                        {" "}
                        by <a href="#">{author || "Anonymous"}</a>
                    </span>
                </div>
                <div
                    className="entry-content editor-content"
                    dangerouslySetInnerHTML={{ __html: description || "" }}
                ></div>
                <div className="entry-footer row no-gutters flex-column flex-md-row">
                    <div className="col-md">
                        <div className="entry-tags">
                            <span>Tags:</span>
                            {!!tags &&
                                tags?.map((tag, index) => {
                                    return (
                                        <a key={tag?.id || new Date().getTime() + index} href="#">
                                            {tag?.name}
                                        </a>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="col-md-auto mt-2 mt-md-0">
                        <div className="social-icons social-icons-color">
                            <span className="social-label">Share this post:</span>

                            <ShareLink
                                label={"Facebook"}
                                type={"Facebook"}
                                className=" social-facebook"
                            >
                                <i className="icon-facebook-f" />
                            </ShareLink>
                            <ShareLink
                                label={"Twitter"}
                                type={"Twitter"}
                                className="social-twitter"
                            >
                                <i className="icon-twitter" />
                            </ShareLink>

                            <ShareLink
                                label={"Printerest"}
                                type={"Printerest"}
                                className=" social-pinterest"
                            >
                                <i className="icon-pinterest" />
                            </ShareLink>
                            <ShareLink
                                label={"Linkedin"}
                                type={"Linkedin"}
                                className="social-linkedin"
                            >
                                <i className="icon-linkedin" />
                            </ShareLink>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default MainContentBlog;
