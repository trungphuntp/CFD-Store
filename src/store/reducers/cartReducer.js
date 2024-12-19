import CartServices from "@/services/CartServices";
import { methodToken } from "@/utils/Token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleShowModal } from "./authReducer";
import { TYPE_MODAL } from "@/constants/General";

const initialState = {
    cartInfor: null,
    loading: {
        cart: false,
    },
};

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        handleUpdateCacheCart: (state, action) => {
            state.cartInfor = action.payload || state.cartInfor;
        },
        handleClearCart: (state) => {
            state.cartInfor = {};
        },
    },
    extraReducers: (builder) => {
        // cart
        builder.addCase(handleGetCart.fulfilled, (state, action) => {
            state.cartInfor = action.payload;
            state.loading.cart = false;
        });
        builder.addCase(handleGetCart.rejected, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleGetCart.pending, (state, action) => {
            state.loading.cart = true;
        });
        // add cart
        builder.addCase(handleAddCart.fulfilled, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleAddCart.rejected, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleAddCart.pending, (state, action) => {
            state.loading.cart = true;
        });

        // remove cart
        builder.addCase(handleRemoveCart.fulfilled, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleRemoveCart.rejected, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleRemoveCart.pending, (state, action) => {
            state.loading.cart = true;
        });

        // update cart
        builder.addCase(handleUpdateCart.fulfilled, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleUpdateCart.rejected, (state, action) => {
            state.loading.cart = false;
        });
        builder.addCase(handleUpdateCart.pending, (state, action) => {
            state.loading.cart = true;
        });
    },
});

const { actions, reducer: cartReducer } = cartSlice;
export const { handleUpdateCacheCart, handleClearCart } = actions || {};
export default cartReducer;

export const handleGetCart = createAsyncThunk("cart/handleGetCart", async (_, thunkAPI) => {
    if (methodToken.get()) {
        try {
            const res = await CartServices.getCart();
            return res?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
});
export const handleAddCart = createAsyncThunk("cart/handleAddCart", async (dataCart, thunkAPI) => {
    if (!methodToken.get()) {
        thunkAPI.dispatch(handleShowModal(TYPE_MODAL.login));
    } else {
        try {
            const { addedID, addedColor, addedQuantity, addedPrice } = dataCart;
            const { cartInfor } = thunkAPI.getState()?.cart || {};
            let addPayload = {};

            if (!!cartInfor.id) {
                const isExistProduct = cartInfor?.product?.findIndex((product) => {
                    return product?.id === addedID;
                });

                const newProduct = cartInfor?.product?.map((product) => {
                    return product?.id;
                });
                const newVariant = [...(cartInfor?.variant ?? [])];
                const newQuantity = [...(cartInfor?.quantity ?? [])];
                const newTotalProduct = [...(cartInfor?.totalProduct ?? [])];

                if (isExistProduct > -1) {
                    // ======= case: cùng product  ==============

                    // matchIdProducts: index sản phẩm cùng id
                    const matchIdProducts = cartInfor?.product?.map((product, index) => {
                        return index;
                    });

                    if (!!matchIdProducts?.length > 0) {
                        const matchId = matchIdProducts?.find((indexProduct) => {
                            return (
                                newProduct[indexProduct] === addedID &&
                                newVariant[indexProduct] === addedColor
                            );
                        });
                        console.log(matchId);

                        newQuantity[matchId] = Number(newQuantity[matchId]) + Number(addedQuantity);
                        newTotalProduct[matchId] =
                            Number(newTotalProduct[matchId]) + Number(addedPrice * addedQuantity);

                        // ============== case: cùng ID product nhưng khác variant ==============
                        if (!matchId && matchId != 0) {
                            newProduct.push(addedID);
                            newVariant.push(addedColor);
                            newQuantity.push(addedQuantity);
                            newTotalProduct.push(addedPrice * addedQuantity);
                        }
                    }
                } else {
                    // ======= case: khác product =======
                    newProduct.push(addedID);
                    newVariant.push(addedColor);
                    newQuantity.push(addedQuantity);
                    newTotalProduct.push(addedPrice * addedQuantity);
                }

                const newSubTotal =
                    newTotalProduct?.reduce((current, total) => {
                        return Number(current) + Number(total);
                    }, 0) || 0;

                const newTotal =
                    newSubTotal -
                    Number(cartInfor?.discount ?? 0) -
                    Number(cartInfor?.shipping?.price ?? 0);

                addPayload = {
                    ...cartInfor,
                    product: newProduct,
                    quantity: newQuantity,
                    variant: newVariant,
                    totalProduct: newTotalProduct,
                    subTotal: newSubTotal,
                    total: newTotal,
                };
            } else {
                // ================== Đợi làm profiles xử lí ==================
                // address: {
                //     phone: "string",
                //     email: "string",
                //     fullName: "string",
                //     street: "string",
                // },
                // shipping: {
                //     typeShip: "string",
                //     price: 0,
                // },
                //total:  addedPrice * addedQuantity - discount ( hien tai chua co discount )
                addPayload = {
                    product: [addedID],
                    quantity: [addedQuantity],
                    variant: [addedColor],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: "",
                };
            }
            message.success("Add to cart successfully!");
            const resCart = await CartServices.updateCart(addPayload);
            thunkAPI.dispatch(handleGetCart());
            return resCart?.data?.data;
        } catch (error) {
            message.error("Add to cart failed!");
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
});

export const handleRemoveCart = createAsyncThunk(
    "cart/handleRemoveCart",
    async (dataProductRemove, thunkAPI) => {
        try {
            const { cartInfor } = thunkAPI.getState()?.cart || {};
            const newProduct = cartInfor?.product
                ?.map((product) => {
                    return product?.id;
                })
                ?.filter((product, index) => {
                    return index !== dataProductRemove;
                });
            const newVariant = [...(cartInfor?.variant ?? [])]?.filter((variant, index) => {
                return index !== dataProductRemove;
            });
            const newQuantity = [...(cartInfor?.quantity ?? [])].filter((quantity, index) => {
                return index !== dataProductRemove;
            });
            const newTotalProduct = [...(cartInfor?.totalProduct ?? [])].filter(
                (totalProduct, index) => {
                    return index !== dataProductRemove;
                }
            );

            const newSubTotal =
                newTotalProduct?.reduce((current, total) => {
                    return Number(current) + Number(total);
                }, 0) || 0;

            const newTotal =
                newSubTotal -
                Number(cartInfor?.discount ?? 0) -
                Number(cartInfor?.shipping?.price ?? 0);

            const removePayload = {
                ...cartInfor,
                product: newProduct,
                variant: newVariant,
                quantity: newQuantity,
                totalProduct: newTotalProduct,
                subTotal: newSubTotal,
                total: newTotal,
            };

            const resRemovejCart = await CartServices.updateCart(removePayload);

            console.log(resRemovejCart);

            if (resRemovejCart?.data?.data?.id) {
                message.success("Remove item successfully!");
                thunkAPI.dispatch(handleGetCart());
            } else {
                throw error;
            }

            return resRemovejCart?.data?.data;
        } catch (error) {
            message.error("Remove item failed!");
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

// handle update cart (dung chung)
export const handleUpdateCart = createAsyncThunk(
    "cart/handleUpdateCart",
    async (dataUpdate, thunkAPI) => {
        try {
            const resCart = await CartServices.updateCart(dataUpdate);
            thunkAPI.dispatch(handleGetCart());
            message.success("Update cart successfully!");
            return resCart?.data?.data;
        } catch (error) {
            message.error("Update cart failed!");
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);
