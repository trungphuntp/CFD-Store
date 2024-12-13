import CartServices from "@/services/CartServices";
import { methodToken } from "@/utils/Token";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartInfor: null,
    loading: {
        cart: false,
    },
};

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {},
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
export const handleUpdateCart = createAsyncThunk(
    "cart/handleUpdateCart",
    async (dataCart, thunkAPI) => {
        try {
            const { addedID, addedColor, addedQuantity, addedPrice } = dataCart;
            const { cartInfor } = thunkAPI?.getState()?.cart || {};
            console.log(cartInfor);

            const addPayload = {};

            if (cartInfor.id) {
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);
