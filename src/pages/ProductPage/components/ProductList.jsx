import ProductCard from "@/components/ProductCard";
import { Skeleton } from "antd";

const ProductList = ({ loading, error, products }) => {
    if ((!loading && products?.length < 1) || error) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">There is no products</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {new Array(9).fill("").map((_, index) => {
                        return (
                            <div
                                className="col-6 col-md-4 col-lg-4"
                                key={index}
                                style={{ flexDirection: "column", gap: 5, marginTop: 10 }}
                            >
                                <Skeleton.Image
                                    active={true}
                                    style={{ width: "100%", height: 275 }}
                                />
                                <Skeleton.Input active />
                                <Skeleton.Input block active />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="products mb-3">
            <div className="row justify-content-center">
                {products?.map((product, index) => {
                    const { id } = product;
                    return (
                        <div
                            className="col-6 col-md-4 col-lg-4"
                            key={id || new Date().getTime() + index}
                        >
                            <ProductCard {...product} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
