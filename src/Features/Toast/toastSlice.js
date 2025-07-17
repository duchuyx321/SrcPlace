import { createSlice } from "@reduxjs/toolkit";

const init = {};

const toastSlice = createSlice({
    name: "toast",
    initialState: init,
    reducers: {
        // add toast
        addToast(state, action) {},
        // thêm toast
        // xóa toast
    },
});
