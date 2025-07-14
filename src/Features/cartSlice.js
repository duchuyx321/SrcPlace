import { createSlice } from "@reduxjs/toolkit";

const init = [{}];

const cartSlice = createSlice({
    name: "cart",
    initialState: init,
    reducers: {
        addToCart(state, action) {},
    },
});
