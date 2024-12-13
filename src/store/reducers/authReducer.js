import AuthServices from "@/services/AuthServices";
import { methodToken } from "@/utils/Token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleGetCart } from "./cartReducer";

const initialState = {
    showModal: "",
    profile: null,
    loading: {
        login: false,
        register: false,
        getProfile: false,
    },
};

const authSlice = createSlice({
    initialState,
    name: "auth",
    // reducer trùng với action
    reducers: {
        handleShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        handleCloseModal: (state) => {
            state.showModal = "";
        },
        handleLogout: (state) => {
            state.showModal = "";
            state.profile = null;
            methodToken.remove();
            message.success("Logout success!");
        },
    },
    // extra reducer để nhận extra function
    extraReducers: (builder) => {
        // profile
        builder.addCase(handleGetProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading.getProfile = false;
        });
        builder.addCase(handleGetProfile.rejected, (state, action) => {
            state.loading.getProfile = false;
        });
        builder.addCase(handleGetProfile.pending, (state, action) => {
            state.loading.getProfile = true;
        });

        // login
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.loading.login = false;
            state.showModal = "";
        });
        builder.addCase(handleLogin.rejected, (state, action) => {
            state.loading.login = false;
        });
        builder.addCase(handleLogin.pending, (state, action) => {
            state.loading.login = true;
        });

        // register
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.loading.register = false;
        });
        builder.addCase(handleRegister.rejected, (state, action) => {
            state.loading.register = false;
        });
        builder.addCase(handleRegister.pending, (state, action) => {
            state.loading.register = true;
        });
    },
});
// authSlice trả về obj có actions và reducer
const { actions, reducer: authReducer } = authSlice;

// action  ĐỒNG BỘ
export const { handleShowModal, handleCloseModal, handleLogout } = actions;
export default authReducer;

// action  BẤT ĐỒNG BỘ => sử dụng  Async Thunk
// createAsyncThunk tự tạo ra 3 function tự động gọi {pending, fulfilled, and rejected } => extra function
// Tượng chưng 3 trạng thái:
// - pending: ngay khi async function vừa được gọi
// - fulfilled: khi được return thành công
// - rejected: khi catch error trong trycatch

export const handleLogin = createAsyncThunk("auth/handleLogin", async (dataLogin, thunkAPI) => {
    try {
        // payload
        const { email, password } = dataLogin || {};
        const payload = {
            email: email || "",
            password: password || "",
        };
        // call api
        const res = await AuthServices.login(payload);
        if (res?.data?.data) {
            message.success("Login success!");
            const { token: accessToken, refreshToken } = res.data.data;
            methodToken.set({ token: accessToken, refreshToken });
            thunkAPI.dispatch(handleGetProfile());
            thunkAPI.dispatch(handleGetCart());

            return res.data.data;
        }
    } catch (error) {
        const errorsInfor = error?.response?.data;
        if (errorsInfor?.error === "Not Found") {
            message.error("Email or Password incorrect");
        }
        return thunkAPI.rejectWithValue(errorsInfor);
    }
});
export const handleRegister = createAsyncThunk(
    "auth/handleRegister",
    async (registerData, thunkAPI) => {
        try {
            // payload
            const { email, password } = registerData || {};
            const payload = {
                firstName: email || "",
                lastName: "",
                email: email || "",
                password: password || "",
            };

            const res = await AuthServices.register(payload);

            if (res?.data?.data?.id) {
                messageApi.success("Register success!");
                thunkAPI.dispatch(
                    handleLogin({ email: payload.email, password: payload.password })
                );
                return true;
            } else {
                throw false;
            }
        } catch (error) {
            const errorsInfor = error?.response?.data;
            if (errorsInfor?.error === "Forbidden") {
                message.error("Email already exists");
            }
            return thunkAPI.rejectWithValue(errorsInfor);
        }
    }
);
export const handleGetProfile = createAsyncThunk("auth/handleGetProfile", async (_, thunkAPI) => {
    if (methodToken.get()) {
        try {
            const res = await AuthServices.getProfile();
            return res?.data?.data;
        } catch (error) {
            const errorsInfor = error?.response?.data;
            return thunkAPI.rejectWithValue(errorsInfor);
        }
    }
});
