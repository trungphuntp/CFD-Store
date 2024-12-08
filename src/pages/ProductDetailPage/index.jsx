import Breadcrumb from "@/components/Breadcrumb";
import { PATH } from "@/constants/Pathjs";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import ProductServices from "@/services/ProductServices";
import { formatCurrency } from "@/utils/format";
import { Link, useParams } from "react-router-dom";
import ProductDetailBottom from "./components/ProductDetailBottom";
import ProductDetailTop from "./components/ProductDetailTop";
import useMutation from "@/hooks/useMutation";
import { useEffect } from "react";

const ProductDetailPage = () => {
    const { productSlug } = useParams();

    // product Detail API
    const {
        data: dataProductDetail,
        error: errorProductDetail,
        loading: loadingProductDetail,
    } = useQuery(() => ProductServices.getProductsBySlug(productSlug), [productSlug]);

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
    } = dataProductDetail || [];

    const {
        data: dataReview,
        error: errorReview,
        loading: loadingReview,
        execute: fetchReview,
    } = useMutation((query) => ProductServices.getProductReview(query));

    useEffect(() => {
        fetchReview(id);
    }, [id]);

    // console.log(dataProductDetail);
    // console.log(dataReview);

    const handleAddCart = () => {};
    const handleWishlish = () => {};

    const productTopProps = {
        id,
        color,
        title,
        rating,
        reviews: dataReview?.length || 0,
        widthStar: ((rating || 0) / 5) * 100 || 0,
        price: formatCurrency(price),
        category,
        images,
        handleAddCart,
        handleWishlish,
        stock,
        description,
    };

    const productBottomProps = {
        reviews: dataReview,
        countReviews: dataReview?.length || 0,
        description,
        shippingReturn,
    };

    const loadingPage = useDebounce();

    return (
        <main className="main">
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
