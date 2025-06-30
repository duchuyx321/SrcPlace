const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VoucherSchema = new Schema(
    {
        code: { type: String, require: true, unique: true },
        voucher_type: {
            type: String,
            enum: ['percent', 'money'],
            default: 'money',
        },
        value: { type: Number, require: true },
        maxUsers: { type: Number, require: true }, // có thể để nó là null nếu nó là tất cả
        unlimited: { type: Boolean, default: false }, // nếu gửi tất cả thì phải thêm unlimited
        used: { type: Number, require: true },
        maxPerUser: { type: Number, default: 1 }, // Mỗi user chỉ được dùng tối đa x lần nếu không giới hạn thì là null
        perUserUnlimited: { type: Boolean, default: false }, // nếu như không giới hạn số lượt sử dụng thì là true
        proviso: {
            minOrderAmount: { type: Number, default: 0 }, // đơn hàng tối thiểu để để sử dụng voucher
            onlyForUserIDs: [{ type: Schema.Types.ObjectId, ref: 'User' }], // chỉ định user cụ thể
            applyToCategories_IDs: [{ type: Schema.Types.ObjectId }], // chỉ định một số danh mục sản phẩm theo id
            applyToProductIDs: [{ type: Schema.Types.ObjectId }], // hoặc cho 1 số sản phẩm theo id
            firstTimeUserOnly: { type: Boolean, default: false }, // chỉ user lần đầu mua
            newUserOnly: { type: Boolean, default: false }, // chỉ cho user mới đăng nhập trong vòng 48h
            validHours: {
                start: { type: String }, // ví dụ: "08:00"
                end: { type: String }, // "22:00"
            },
        },
        isActive: { type: Boolean, default: true }, // có thể bật tắt nó
    },
    { timestamps: true, collection: 'Vouchers' },
);

module.exports = mongoose.model('Vouchers', VoucherSchema);
