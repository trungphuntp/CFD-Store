import { useEffect, useState } from "react";
import BrandHome from "./components/BrandHome";
import DealOutletHome from "./components/DealOutletHome";
import SlideProductHome from "./components/SlideProductHome";
import FeaturedProduct from "./components/FeaturedProduct";
import IconsHome from "./components/IconsHome";
import Subscridehome from "./components/Subscridehome";
import HeroHome from "./components/HeroHome";
import useMutation from "@/hooks/useMutation";
import ProductServices from "@/services/ProductServices";
import useDebounce from "@/hooks/useDebounce";
import ComponentLoading from "@/components/ComponentLoading";

const SLIDE_PRODCUT = {
    featured: "featured",
    onSale: "onsale",
    topRate: "toprate",
};
const LIMIT_CATEGORY = 6;

const HomePage = () => {
    // API product
    const {
        data: dataProduct,
        loading: loadingProduct,
        execute: fetchSlideProduct,
    } = useMutation((query) => ProductServices.getProducts(query));
    // API category
    const {
        data: dataCategory,
        loading: loadingCategory,
        execute: fetchSlideCategory,
    } = useMutation((query) => ProductServices.getProductCategories(query));

    // CALL API
    useEffect(() => {
        fetchSlideProduct();
        fetchSlideCategory(`?limit=${LIMIT_CATEGORY}`);
    }, []);
    // =================== Slide Product ===================
    const [slideProduct, setSlideProduct] = useState(SLIDE_PRODCUT.featured);
    const handleSetSliderProduct = (type) => {
        setSlideProduct(type);
    };
    // =================== Featured Product ===================
    const [featuredProductActive, setFeaturedProductActive] = useState("");
    const handleSetFeaturedProduct = (type) => {
        setFeaturedProductActive(type);
    };
    // =================== Libs ===================
    useEffect(() => {
        if (!!dataProduct) {
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
    }, [dataProduct]);

    const loadingAPI = loadingProduct || loadingCategory;
    const loadingPage = useDebounce(loadingAPI, 300);
    return (
        <main className="main">
            {!!loadingPage && <ComponentLoading />}
            <HeroHome />
            <SlideProductHome
                slideProduct={slideProduct}
                SLIDE_PRODCUT={SLIDE_PRODCUT}
                handleSetSliderProduct={handleSetSliderProduct}
                products={dataProduct?.products}
            />
            <div className="mb-7 mb-lg-11" />
            <DealOutletHome products={dataProduct?.products} />
            <BrandHome />
            <div className="container">
                <hr className="mt-3 mb-6" />
            </div>
            <div className="container">
                <hr className="mt-5 mb-6" />
            </div>
            <FeaturedProduct
                categories={dataCategory?.products}
                products={dataProduct?.products}
                featuredProductActive={featuredProductActive}
                handleSetFeaturedProduct={handleSetFeaturedProduct}
            />
            <div className="container">
                <hr className="mt-5 mb-0" />
            </div>
            <IconsHome />
            <Subscridehome />
        </main>
    );
};

export default HomePage;
