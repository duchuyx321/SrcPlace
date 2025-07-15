import { createSlice } from "@reduxjs/toolkit";

const init = { items: [], total: 0, result: { status: 200, message: "" } };

const cartSlice = createSlice({
    name: "cart",
    initialState: init,
    reducers: {
        // thêm sản phẩm vào giỏ hàng
        addToCart(state, action) {
            const product = state.items.find(
                (product) => product._id === action.payload._id
            );
            if (product) {
                state.result = {
                    status: 403,
                    message: "Đơn hàng đã có trong giỏ hàng!",
                };
                return;
            }
            state.items.push({
                _id: action.payload._id || "1234567890",
                title: action.payload.title || "Đồ Án Test Của SrcPlace",
                thumbnail: action.payload.image_url || "",
                price: action.payload.price || 500000,
            });
            state.result = {
                status: 200,
                message: "Đã Thêm Vào Giỏ Hàng Thành Công",
            };
        },
        // xóa thông báo
        clearMessage(state) {
            state.result = null;
        },
        // Xóa sản phẩm có thể xóa nhiều
        removeItems(state, action) {
            const idsToRemove = action.payload;
            state.items = state.items.filter(
                (product) => !idsToRemove.includes(product._id)
            );
            state.result = {
                status: 202,
                message: "Đã xoá sản phẩm khỏi giỏ hàng!",
            };
        },
        // xóa tất cả trong giỏ hàng
        clearCart(state, action) {
            state.items = [];
            state.total = 0;
            state.result = {
                status: 202,
                message: "Đã xoá tất cả sản phẩm khỏi giỏ hàng!",
            };
        },
        // tính tổng tiền trong giỏ hàng
        calculateTotal(state) {
            state.total = state.items.reduce((total, product) => {
                return total + product.price;
            }, 0);
        },
    },
});

export const {
    addToCart,
    removeItems,
    clearCart,
    calculateTotal,
    clearMessage,
} = cartSlice.actions;
export default cartSlice.reducer;
