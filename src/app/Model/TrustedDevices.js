const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const TrustedDevicesSchema = new Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, required: true },
        device_ID: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        userAgent: { type: String },
        ip: { type: String },
        expiresAt: { type: Date },
        lastUsedAt: { type: Date },
    },
    { timeseries: true, collection: 'TrustedDevices' },
);

// plugin
TrustedDevicesSchema.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('TrustedDevices', TrustedDevicesSchema);
