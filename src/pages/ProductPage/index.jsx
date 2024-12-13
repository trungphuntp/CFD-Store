import ComponentLoading from "@/components/ComponentLoading";
import Pagination from "@/components/Pagination";
import { SORT_TYPE } from "@/constants/General";
import { PATH } from "@/constants/Pathjs";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import ProductServices from "@/services/ProductServices";
import queryString from "query-string";
import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";
import ProductToolbox from "./components/ProductToolbox";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollTop from "@/utils/ScrollTop";

const LIMIT_PRODUCT = 9;

const ProductPage = () => {
    const { search } = useLocation();
    const querryObjectPage = queryString.parse(search);

    // useSearchParams trả về param hiện tại và hàm set search trên param
    const [currentParams, setSearchParams] = useSearchParams();

    // update params
    const updateQuerystring = (queryObject) => {
        const queryStringPage = queryString.stringify({
            ...queryObject,
            limit: LIMIT_PRODUCT,
        });
        setSearchParams(new URLSearchParams(queryStringPage));
    };

    // API products
    const {
        data: dataProducts,
        error: errorProduct,
        loading: loadingProducts,
        execute: fetchProducts,
    } = useMutation((query) => {
        return ProductServices.getProducts(query || `?limit=${LIMIT_PRODUCT}`);
    });

    // API products
    const {
        data: dataProductsAll,
        error: errorProductAll,
        loading: loadingProductsAll,
        execute: fetchProductsAll,
    } = useMutation((query) => {
        return ProductServices.getProducts(query);
    });

    // API categories
    const {
        data: dataCategories,
        error: errorCategories,
        loading: loadingCategories,
    } = useQuery(ProductServices.getProductCategories);
    const categories = dataCategories?.products || [];

    // Call API products
    useEffect(() => {
        fetchProducts(search);
        fetchProductsAll();
    }, [search]);

    // ===== PRODUCT ==========
    const products = dataProducts?.products || [];
    const productPagination = dataProducts?.pagination || [];

    // product props
    const productListProps = {
        loading: loadingProducts,
        error: !!errorProduct,
        products,
    };

    // ===== TOOLBOX ==========

    // change Toolbox
    const onChangeToolbox = (sortType) => {
        const queryObjectChange = SORT_TYPE[sortType].queryStringType;
        updateQuerystring({
            ...querryObjectPage,
            ...queryObjectChange,
            page: 1,
        });
    };

    // active toolbox
    const activeToolbox = useMemo(() => {
        return (
            Object.values(SORT_TYPE).find((option) => {
                return (
                    option?.queryStringType?.orderBy === querryObjectPage?.orderBy &&
                    option?.queryStringType?.order === querryObjectPage?.order
                );
            })?.value || SORT_TYPE.popular.value
        );
    }, [querryObjectPage]);

    // toolbox props
    const toolboxProductsProps = {
        numbProduct: products?.length || 0,
        numbTotal: productPagination?.total || 0,
        activeToolbox,
        onChangeToolbox,
    };

    // ===== PAGINATION ==========
    // change pagination
    const onChangePagination = (page) => {
        ScrollTop();
        updateQuerystring({ ...querryObjectPage, page: page });
    };
    // pagination props
    const paginationProps = {
        page: Number(productPagination?.page || querryObjectPage?.page || 1),
        limit: Number(productPagination?.limit || 0),
        total: Number(productPagination?.total || 0),
        onChangePagination,
    };

    // ===== FILTER ==========
    // active category filter
    const activeFilter = useMemo(() => {
        const cateActiveArray = Array.isArray(querryObjectPage.category)
            ? categories?.filter((cate) => {
                  return querryObjectPage?.category?.includes(cate?.id);
              })
            : categories?.filter((cate) => {
                  return querryObjectPage?.category === cate?.id;
              });

        const activeArrayID = cateActiveArray?.map((cate) => cate.id) || [];
        return activeArrayID;
    }, [querryObjectPage, categories]);

    const handleChangeFilter = (cateId, isChecked) => {
        let newCategoryArray = Array.isArray(querryObjectPage?.category)
            ? [...querryObjectPage?.category, cateId]
            : [querryObjectPage?.category, cateId];

        if (!isChecked) {
            newCategoryArray = newCategoryArray?.filter((cate) => {
                return cate !== cateId;
            });
        }
        if (!cateId) {
            newCategoryArray = [];
        }

        updateQuerystring({
            ...querryObjectPage,
            category: newCategoryArray,
            page: 1,
        });
    };

    // custom 1 useDebounce thành function để sử dụng
    // dùng ref để lưu thời gian timmer tránh việc call API liên tục
    const priceFilterTimer = useRef();
    const handlePriceChange = (priceChange) => {
        if (priceChange?.length === 2) {
            updateQuerystring({
                ...querryObjectPage,
                minPrice: priceChange[0]?.substring(1) || 0,
                maxPrice: priceChange[2]?.substring(1) || 5000,
                page: 1,
            });
        }
    };

    // filter props
    const filterProps = {
        categories,
        products: dataProductsAll?.products,
        activeFilter,
        handleChangeFilter,
        handlePriceChange,
        currentPrice: [querryObjectPage.minPrice || 0, querryObjectPage.maxPrice || 5000],
    };

    const loadingAPI = loadingProducts || loadingProductsAll || loadingCategories;
    const loadingPage = useDebounce(loadingAPI, 300);

    return (
        <main className="main">
            {loadingPage && <ComponentLoading />}
            <div
                className="page-header text-center"
                style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
            >
                <div className="container">
                    <h1 className="page-title">Product</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATH.INDEX}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive={true}>Product</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <ProductToolbox {...toolboxProductsProps} />
                            <ProductList {...productListProps} />
                            <Pagination {...paginationProps} firstButton lastButton />
                        </div>
                        <ProductFilter {...filterProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
