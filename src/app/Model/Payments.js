const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const PaymentsSchema = new Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, required: true },
        paymentMethod_ID: { type: Schema.Types.ObjectId, required: true },
        status: {
            type: String,
            required: true,
            enum: ['pending', ' success', ' failed'],
        },
        order_ID: { type: Schema.Types.ObjectId, required: true },
        transactionCode: { type: String, required: true },
        price: { type: Number, required: true },
        paidAt: { type: Date, required: true },
    },
    { timeseries: true, collection: 'Payments' },
);

// plugin
PaymentsSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Payments', PaymentsSchema);
