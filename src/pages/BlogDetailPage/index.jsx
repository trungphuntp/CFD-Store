import useMutation from "@/hooks/useMutation";
import BlogServices from "@/services/BlogServices";
import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReplyBlog from "./components/ReplyBlog";
import RelatedPostBlog from "./components/RelatedPostBlog";
import NavDetailBlog from "./components/NavDetailBlog";
import MainContentBlog from "./components/MainContentBlog";
import SideBarBlog from "@/components/SideBarBlog";
import { PATH } from "@/constants/Pathjs";
import { Breadcrumb } from "antd";
import { formatDate } from "@/utils/format";
import { FORMAT_DATE } from "@/constants/Format";
import CommentsBlog from "./components/CommentsBlog";
import useDebounce from "@/hooks/useDebounce";
import ComponentLoading from "@/components/ComponentLoading";

let BLOG_RELATED = 6;

const BlogDetailPage = () => {
    const { blogSlug } = useParams();
    const navigate = useNavigate();

    // ============ Blog detail ============
    const {
        data: dataBlogDetail,
        loading: loadingBlogDetail,
        execute: fetchBlogDetail,
    } = useMutation((slug) => BlogServices.getBlogBySlug(slug));

    // ============ Blog ALL============
    const {
        data: dataBlogAll,
        loading: loadingBlogAll,
        execute: fetchBlogAll,
    } = useMutation(BlogServices.getBlog);
    const blogsAll = dataBlogAll?.blogs || [];

    // ============ Blog Tags ============
    const {
        data: dataBlogsTag,
        loading: loadingBlogsTag,
        execute: fetchBlogsTag,
    } = useMutation(BlogServices.getBlogTag);
    const blogTags = dataBlogsTag?.blogs || [];

    // ============ Blog Category ============
    const {
        data: dataCategoryBlog,
        loading: loadingCategoryBlog,
        execute: fetchCategoryBlog,
    } = useMutation(BlogServices.getBlogCategory);
    const categoryBlog = dataCategoryBlog?.blogs || [];

    // Call API
    useEffect(() => {
        fetchBlogDetail(blogSlug);
    }, [blogSlug]);

    useEffect(() => {
        fetchBlogsTag();
        fetchCategoryBlog();
        fetchBlogAll();
    }, []);

    const { author, description, image, name, updatedAt, tags, id } = dataBlogDetail;
    // tags blog detail
    const tagsDetailBlog = useMemo(() => {
        return blogTags?.filter((blogtag) => {
            return tags?.includes(blogtag?.id);
        });
    }, [dataBlogDetail]);

    const BlogRandom = useMemo(() => {
        if (!!blogsAll?.length > 0) {
            const result = [];
            while (result.length < BLOG_RELATED) {
                const randomIndex = Math.floor(Math.random() * blogsAll?.length);
                if (
                    result?.every((blog) => {
                        return blog.id !== blogsAll[randomIndex].id;
                    }) &&
                    blogsAll[randomIndex]?.id !== id
                ) {
                    result.push(blogsAll[randomIndex]);
                }
            }
            return result;
        }
    }, [blogsAll]);

    const handleChangeCategory = (cateID) => {
        navigate(PATH.BLOG.INDEX + `?category=${cateID}`);
    };

    // Main content props
    const mainContentProps = {
        image,
        name,
        description,
        author,
        date: formatDate(updatedAt, FORMAT_DATE.SECOND),
        tags: tagsDetailBlog,
    };

    // Side bar props
    const sidebarProps = {
        category: categoryBlog,
        blogs: blogsAll,
        tags: blogTags,
        handleChangeCategory,
        blogSlug,
    };

    const relatedBlogProps = { blogs: BlogRandom };

    const navBlogProps = {
        blogs: blogsAll?.filter((blog) => blog?.id !== id).sort(() => Math.random() - 0.5),
    };

    // =================== Libs ===================
    useEffect(() => {
        if (!!BlogRandom) {
            $("body").on("click", ".btn-fullscreen", function (e) {
                var galleryArr = [];
                $(this)
                    .parents(".owl-stage-outer")
                    .find(".owl-item:not(.cloned)")
                    .each(function () {
                        var $this = $(this).find("img"),
                            imgSrc = $this.attr("src"),
                            imgTitle = $this.attr("alt"),
                            obj = { src: imgSrc, title: imgTitle };
                        galleryArr.push(obj);
                    });

                var ajaxUrl = $(this).attr("href");

                var mpInstance = $.magnificPopup.instance;
                if (mpInstance.isOpen) mpInstance.close();

                setTimeout(function () {
                    $.magnificPopup.open(
                        {
                            type: "ajax",
                            mainClass: "mfp-ajax-product",
                            tLoading: "",
                            preloader: false,
                            removalDelay: 350,
                            items: {
                                src: ajaxUrl,
                            },
                            callbacks: {
                                ajaxContentAdded: function () {
                                    owlCarousels($(".quickView-content"), {
                                        onTranslate: function (e) {
                                            var $this = $(e.target),
                                                currentIndex =
                                                    ($this.data("owl.carousel").current() +
                                                        e.item.count -
                                                        Math.ceil(e.item.count / 2)) %
                                                    e.item.count;
                                            $(".quickView-content .carousel-dot")
                                                .eq(currentIndex)
                                                .addClass("active")
                                                .siblings()
                                                .removeClass("active");
                                            $(".curidx").html(currentIndex + 1);
                                        },
                                    });
                                    quantityInputs();
                                },
                                open: function () {
                                    $("body").css("overflow-x", "visible");
                                    $(".sticky-header.fixed").css("padding-right", "1.7rem");
                                },
                                close: function () {
                                    $("body").css("overflow-x", "hidden");
                                    $(".sticky-header.fixed").css("padding-right", "0");
                                },
                            },

                            ajax: {
                                tError: "",
                            },
                        },
                        0
                    );
                }, 500);

                e.preventDefault();
            });
            function owlCarousels($wrap, options) {
                if ($.fn.owlCarousel) {
                    var owlSettings = {
                        items: 1,
                        loop: true,
                        margin: 0,
                        responsiveClass: true,
                        nav: true,
                        navText: ['<i class="icon-angle-left">', '<i class="icon-angle-right">'],
                        dots: true,
                        smartSpeed: 400,
                        autoplay: false,
                        autoplayTimeout: 15000,
                    };
                    if (typeof $wrap == "undefined") {
                        $wrap = $("body");
                    }
                    if (options) {
                        owlSettings = $.extend({}, owlSettings, options);
                    }

                    // Init all carousel
                    $wrap.find('[data-toggle="owl"]').each(function () {
                        var $this = $(this),
                            newOwlSettings = $.extend({}, owlSettings, $this.data("owl-options"));

                        $this.owlCarousel(newOwlSettings);
                    });
                }
            }
            owlCarousels();
        }
    }, [BlogRandom]);

    // =================== Loading ===================
    const loadingAPI =
        loadingBlogDetail || loadingBlogAll || loadingBlogsTag || loadingCategoryBlog;
    const loadingPage = useDebounce(loadingAPI, 300);

    return (
        <main className="main">
            {!!loadingPage && <ComponentLoading />}
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={PATH.INDEX}>Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={PATH.BLOG.INDEX}>Blog</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item isActive={true}> {name || ""}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <MainContentBlog {...mainContentProps} />
                            <NavDetailBlog {...navBlogProps} />
                            <RelatedPostBlog {...relatedBlogProps} />
                            <CommentsBlog />
                            <ReplyBlog />
                        </div>
                        <SideBarBlog {...sidebarProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogDetailPage;
