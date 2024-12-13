import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import { PATH } from "@/constants/Pathjs";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import BlogServices from "@/services/BlogServices";
import ScrollTop from "@/utils/ScrollTop";
import queryString from "query-string";
import { useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import BlogList from "./components/BlogList";
import SideBarBlog from "@/components/SideBarBlog";

const BLOG_LIMIT = 6;

const BlogPage = () => {
    const { search } = useLocation();
    const queryStringObject = queryString.parse(search);

    const [currentParams, setSearchParams] = useSearchParams();
    // ============ Blogs ============
    const {
        data: dataBlog,
        loading: loadingBlog,
        execute: fetchBlog,
    } = useMutation((query) => BlogServices.getBlog(query || `?limit=${BLOG_LIMIT}`));
    const blogs = dataBlog?.blogs || [];
    const blogPagination = dataBlog?.pagination || [];

    const {
        data: dataBlogAll,
        loading: loadingBlogAll,
        execute: fetchBlogAll,
    } = useMutation(BlogServices.getBlog);
    const blogsAll = dataBlogAll?.blogs || [];

    // ============ Blog Category ============
    const {
        data: dataCategoryBlog,
        loading: loadingCategoryBlog,
        execute: fetchCategoryBlog,
    } = useMutation(BlogServices.getBlogCategory);
    const categoryBlog = dataCategoryBlog?.blogs || [];

    // ============ Blog Tags ============
    const {
        data: dataBlogsTag,
        loading: loadingBlogsTag,
        execute: fetchBlogsTag,
    } = useMutation(BlogServices.getBlogTag);
    const blogTags = dataBlogsTag?.blogs || [];

    const updateBlogSearch = (newQueryObject) => {
        const newQueryString = queryString.stringify({
            ...newQueryObject,
            limit: BLOG_LIMIT,
        });
        setSearchParams(new URLSearchParams(newQueryString));
    };

    // ============ CALL API ============
    useEffect(() => {
        updateBlogSearch({
            ...queryStringObject,
            page: 1,
            limit: BLOG_LIMIT,
        });
        fetchBlogAll();
        fetchCategoryBlog();
        fetchBlogsTag();
    }, []);

    useEffect(() => {
        fetchBlog(search);
    }, [search]);

    // ============ FUNCTION  ============
    const onChangePagination = (page) => {
        ScrollTop();
        updateBlogSearch({ ...queryStringObject, page: page });
    };

    const handleChangeCategory = (cateID) => {
        updateBlogSearch({ ...queryStringObject, category: cateID, page: 1 });
    };

    // pagination props
    const paginationProps = {
        page: Number(blogPagination?.page || queryStringObject?.page || 1),
        limit: Number(blogPagination?.limit || BLOG_LIMIT),
        total: Number(blogPagination?.total || 0),
        onChangePagination,
    };

    // Side bar props
    const sidebarProps = {
        category: categoryBlog,
        blogs: blogsAll,
        tags: blogTags,
        handleChangeCategory,
    };

    // Loading
    const loadingAPI = loadingBlogsTag || loadingCategoryBlog || loadingBlogAll || loadingBlog;
    const loadingPage = useDebounce(loadingAPI, 500);

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Blog</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATH.INDEX}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive={true}> Blog</Breadcrumb.Item>
            </Breadcrumb>

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <BlogList blogs={blogs} loading={loadingPage} />
                            <Pagination {...paginationProps} />
                        </div>
                        <SideBarBlog {...sidebarProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPage;
