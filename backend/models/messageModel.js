const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// const message_schema = mongoose.Schema({
//     message_text: { type: String },
//     message_image: { type: String },
//     message_date: { type: Date },
//     message_sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     message_recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

const message_schema = mongoose.Schema(
    {
        message_text: { type: String },
        message_image: { type: String },
        // message_date: { type: Date },
        message_sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message_recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        conversation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', message_schema);
