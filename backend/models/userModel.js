const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_schema = mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_profile_picture: { type: String },
});

user_schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', user_schema);
