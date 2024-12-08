import axiosInstance from "@/utils/axiosInstance";

const ProductServices = {
    getProducts: (query = "") => {
        return axiosInstance.get(`/products${query}`);
    },
    getProductsBySlug: (slug = "") => {
        return axiosInstance.get(`/products/${slug}`);
    },
    getProductCategories: (query = "") => {
        return axiosInstance.get(`/product-categories${query}`);
    },
    getProductCategoriesBySlug: (slug = "") => {
        return axiosInstance.get(`/product-categories/${slug}`);
    },
    getProductReview: (query = "") => {
        return axiosInstance.get(`/reviews/product/${query}`);
    },
};
export default ProductServices;
