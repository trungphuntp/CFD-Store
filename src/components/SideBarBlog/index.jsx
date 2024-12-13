import BlogPopular from "@/components/BlogPopular";

const BLOG_POPULAR = 4;

const SideBarBlog = ({ blogs, category, tags, handleChangeCategory, blogSlug }) => {
    const onClickCategory = (e, cateID) => {
        e?.preventDefault();
        e?.stopPropagation();
        handleChangeCategory(cateID);
    };

    return (
        <aside className="col-lg-3">
            <div className="sidebar">
                <div className="widget widget-search">
                    <h3 className="widget-title">Search</h3>
                    <form action="#">
                        <label htmlFor="ws" className="sr-only">
                            Search in blog
                        </label>
                        <input
                            type="search"
                            className="form-control"
                            name="ws"
                            id="ws"
                            placeholder="Search in blog"
                            required
                        />
                        <button type="submit" className="btn">
                            <i className="icon-search" />
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
                <div className="widget widget-cats">
                    <h3 className="widget-title">Categories</h3>
                    <ul>
                        {!!category &&
                            category?.map((cate, index) => {
                                return (
                                    <li key={cate?.id || new Date().getTime() + index}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                onClickCategory(e, cate?.id || "");
                                            }}
                                        >
                                            {cate?.name || ""}{" "}
                                            <span>
                                                {
                                                    blogs?.filter(
                                                        (blog) => blog?.category?.id === cate?.id
                                                    )?.length
                                                }
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Popular Posts</h3>
                    <ul className="posts-list">
                        {blogs
                            ?.filter((blog) => {
                                if (blogSlug) {
                                    return blog?.isPopular === true && blog?.slug !== blogSlug;
                                } else {
                                    return blog?.isPopular === true;
                                }
                            })
                            ?.slice(0, BLOG_POPULAR)
                            ?.map((blog, index) => {
                                return (
                                    <BlogPopular
                                        key={blog?.id || new Date().getTime() + index}
                                        {...blog}
                                    />
                                );
                            })}
                    </ul>
                </div>
                <div className="widget widget-banner-sidebar">
                    <div className="banner-sidebar-title">ad box 280 x 280</div>
                    <div className="banner-sidebar banner-overlay">
                        <a href="#">
                            <img src="/assets/images/blog/sidebar/banner.jpg" alt="banner" />
                        </a>
                    </div>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Browse Tags</h3>
                    <div className="tagcloud">
                        {!!tags &&
                            tags?.map((tag, index) => {
                                return (
                                    <a key={tag?.id || new Date().getTime() + index} href="#">
                                        {tag?.name || ""}
                                    </a>
                                );
                            })}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBarBlog;
