const Message = require('../models/messageModel');

exports.sendMessage = (request, response, next) => {
    const message = new Message({
        message_text: request.body.message_text,
        message_image: request.body.message_image,
        message_date: request.body.message_date,
        message_sender: request.body.message_sender,
        message_recipient: request.body.message_recipient,
        conversation_id: request.body.conversation_id,
    });
    message
        .save()
        .then(() => response.status(201).json({ message: 'Message créé !' }))
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.getAllMessages = (request, response) => {
    Message.find({ conversation_id: request.params.id })
        .then((messages) =>
            response.status(200).json({
                messages,
            })
        )
        .catch((error) => {
            response.status(400).json({ error });
        });
};

// exports.getAllMessages = (request, response) => {
//     Message.find({
//         message_sender: request.params.message_sender,
//         message_recipient: request.params.message_recipient,
//     })
//         .then((messages) =>
//             response.status(200).json({
//                 messages,
//             })
//         )
//         .catch((error) => {
//             response.status(400).json({ error });
//         });
// };

exports.deleteMessage = (request, response) => {
    Message.deleteMany()
        .then(() => response({ message: 'yess' }))
        .catch((error) => response.json(error));
};
