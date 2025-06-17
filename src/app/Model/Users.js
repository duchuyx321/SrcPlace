const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true, enum: ['User', ' Admin'] },
        avatar: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        is_blocked: { type: Boolean, default: false },
    },
    { timeseries: true, collection: 'Users' },
);

//  plugin
UsersSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Users', UsersSchema);
