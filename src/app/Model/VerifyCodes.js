const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VerifyCodesSchema = new Schema(
    {
        user_ID: { type: Schema.Types.ObjectId, require, unique },
        code: { type: String, require },
        device_ID: { type: String, require },
        expiresAt: { type: Date },
    },
    { timeseries: true, collection: 'VerifyCodes' },
);

module.exports = mongoose.model('VerifyCodes', VerifyCodesSchema);
