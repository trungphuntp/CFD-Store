import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { EVN } from "@/utils/enviroment";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // configureStore sử dụng redux-thunk như default middleWare
    // middleware: [(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)],
    devTools: EVN === "development",
});

export default store;