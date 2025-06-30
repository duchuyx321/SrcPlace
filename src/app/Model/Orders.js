const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, required: true },
        payment_ID: { type: Schema.Types.ObjectId, required: true },
        project_IDs: [{ type: Schema.Types.ObjectId, required: true }],
        paymentMethod_ID: { type: Schema.Types.ObjectId, required: true },
        price: { type: Number, required: true },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'cancelled'],
        },
    },
    { timestamps: true, collection: 'Orders' },
);

// plugin
OrdersSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Orders', OrdersSchema);
