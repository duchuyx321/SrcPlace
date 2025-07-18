import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "~/Features/Cart/cartSlice";
import checkoutReducer from "~/Features/Checkout/checkoutSlice";
import toastReducer from "~/Features/Toast/toastSlice";
const store = configureStore({
    reducer: {
        //giỏ hàng
        cart: cartReducer,
        // checkout
        checkout: checkoutReducer,
        // toast
        toast: toastReducer,
    },
});
export default store;
