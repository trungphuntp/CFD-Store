import { PATH } from "@/constants/Pathjs";
import ColorProduct from "@/pages/ProductDetailPage/components/ColorProduct";
import QuanlityProduct from "@/pages/ProductDetailPage/components/QuanlityProduct";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNoData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CartTable = ({
    product,
    totalProduct,
    quantity,
    variant,
    discount,
    shipping,
    handleChangeQuantity,
    onRemoveProduct,
    quantityRef,
}) => {
    return (
        <div className="col-lg-9">
            {!!product?.length <= 0 && (
                <StyledNoData>
                    <p>
                        There is no any product in cart -{" "}
                        <Link to={PATH.PRODUCTS.INDEX}> Go to shop</Link>
                    </p>
                </StyledNoData>
            )}
            {
                !!product?.length > 0 && (
                    <table className="table table-cart table-mobile">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {product?.map((product, index) => {
                                const { name, images, price, discount } = product;
                                let imageProduct = images[0];
                                if (imageProduct?.split("https")?.length > 2) {
                                    imageProduct = imageProduct?.split("https");
                                    imageProduct = "https" + imageProduct[imageProduct?.length - 1];
                                }
                                return (
                                    <tr key={product?.id + index}>
                                        <td className="product-col">
                                            <div className="product">
                                                <figure className="product-media">
                                                    <a href="#">
                                                        <img
                                                            src={imageProduct}
                                                            alt="Product image"
                                                        />
                                                    </a>
                                                </figure>
                                                <div>
                                                    <h3 className="product-title">
                                                        <a href="#">{name || ""}</a>
                                                    </h3>
                                                    <div
                                                        className="product-color"
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 10,
                                                        }}
                                                    >
                                                        <p>Color: </p>
                                                        <ColorProduct colors={[variant[index]]} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="price-col">
                                            ${formatCurrency(price - discount || 0)}
                                        </td>
                                        <td
                                            className="quantity"
                                            style={{ padding: "30px  20px 30px 0px" }}
                                        >
                                            <QuanlityProduct
                                                max={100}
                                                defaultValue={quantity[index]}
                                                ref={(thisRef) => {
                                                    quantityRef.current[index] = thisRef;
                                                }}
                                                onChange={(updateQuantity) => {
                                                    handleChangeQuantity?.(updateQuantity, index);
                                                }}
                                            />
                                        </td>
                                        <td className="total-col">
                                            ${formatCurrency(totalProduct[index] || 0)}
                                        </td>
                                        <td
                                            className="remove-col"
                                            onClick={(e) => {
                                                onRemoveProduct?.(e, index);
                                            }}
                                        >
                                            <button className="btn-remove">
                                                <i className="icon-close" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )
                /* <div className="cart-bottom">
              <div className="cart-discount">
                  <form action="#">
                      <div className="input-group">
                          <input
                              type="text"
                              className="form-control input-error"
                              required
                              placeholder="Coupon code"
                          />
                          <div className="input-group-append">
                              <button className="btn btn-outline-primary-2" type="submit">
                                  <i className="icon-long-arrow-right" />
                              </button>
                          </div>
                      </div>
                      <p className="form-error">Please fill in this field</p>
                  </form>
              </div>
              <a href="#" className="btn btn-outline-dark-2">
                  <span>UPDATE CART</span>
                  <i className="icon-refresh" />
              </a>
          </div> */
            }
        </div>
    );
};

export default CartTable;
