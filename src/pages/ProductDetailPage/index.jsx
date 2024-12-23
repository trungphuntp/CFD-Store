import Breadcrumb from "@/components/Breadcrumb";
import ComponentLoading from "@/components/ComponentLoading";
import { PATH } from "@/constants/Pathjs";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import ProductServices from "@/services/ProductServices";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDetailBottom from "./components/ProductDetailBottom";
import ProductDetailTop from "./components/ProductDetailTop";
import AuthServices from "@/services/AuthServices";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleGetProfile } from "@/store/reducers/authReducer";

const ProductDetailPage = () => {
    const { profile } = useSelector((state) => state.auth) || [];
    const dispatch = useDispatch();
    const { productSlug } = useParams();
    // product Detail API
    const { data: dataProductDetail, loading: loadingProductDetail } = useQuery(
        () => ProductServices.getProductsBySlug(productSlug),
        [productSlug]
    );

    const {
        color,
        id,
        title,
        rating,
        price,
        category,
        images,
        stock,
        description,
        shippingReturn,
        discount,
        slug,
    } = dataProductDetail || [];

    // product review API
    const {
        data: dataReview,
        loading: loadingReview,
        execute: fetchReview,
    } = useMutation((query) => ProductServices.getProductReview(query));

    useEffect(() => {
        if (!!dataProductDetail) {
            fetchReview(id);
        }
    }, [dataProductDetail]);

    const handleWishlish = async (idProduct) => {
        const myWishlist = profile?.whiteList;
        const addedWishlist = myWishlist?.find((wishlish) => wishlish.id === idProduct);
        if (addedWishlist) {
            message.error("This product has been added to the wishlist previously");
            return;
        }
        try {
            const payload = {
                product: idProduct,
            };
            const res = await AuthServices.addWishlist(payload);
            if (res?.data?.data) {
                dispatch(handleGetProfile());
                message.success("Add to Wishlist successfully!");
            } else {
                message.error("Add to Wishlist failed!");
            }
        } catch (error) {
            message.error("Add to Wishlist failed!");
        }
    };
    console.log(stock);

    // product top props
    const productTopProps = {
        id,
        color,
        title,
        rating,
        reviews: dataReview?.length || 0,
        widthStar: ((rating || 0) / 5) * 100 || 0,
        discount,
        price,
        category,
        images,
        stock,
        description,
        handleWishlish,
    };

    // product bottom props
    const productBottomProps = {
        reviews: dataReview,
        countReviews: dataReview?.length || 0,
        description,
        shippingReturn,
    };

    const loadingAPI = loadingProductDetail || loadingReview;
    const loadingPage = useDebounce(loadingAPI, 300);

    return (
        <main className="main">
            {loadingPage && <ComponentLoading />}
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container d-flex align-items-center">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={PATH.INDEX}>Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={PATH.PRODUCTS.INDEX}>Product</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item isActive={true}>{title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <ProductDetailTop {...productTopProps} />
                    <ProductDetailBottom {...productBottomProps} />
                </div>
            </div>
        </main>
    );
};

export default ProductDetailPage;
