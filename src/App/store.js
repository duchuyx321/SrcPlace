import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "~/Features/Cart/cartSlice";
import checkoutReducer from "~/Features/Checkout/checkoutSlice";
const store = configureStore({
    reducer: {
        //giỏ hàng
        cart: cartReducer,
        // checkout
        checkout: checkoutReducer,
    },
});
export default store;
