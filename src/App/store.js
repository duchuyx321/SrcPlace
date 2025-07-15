import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "~/Features/Cart/cartSlice";
const store = configureStore({
    reducer: {
        //giỏ hàng
        cart: cartReducer,
    },
});
export default store;
