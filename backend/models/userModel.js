const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const user_schema = mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_profile_picture: { type: String },
});
// Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.

user_schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', user_schema);
