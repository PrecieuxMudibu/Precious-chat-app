// const { response } = require('express');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

async function createConversation(req, res) {
    const conversation = new Conversation({
        conversation_participants: [req.message_sender, req.message_recipient],
    });
    conversation
        .save()
        .then((conversation) =>
            res
                .status(201)
                .json({ message: 'Conversation créée', conversation })
        )
        .catch((error) => {
            res.status(500).json({ error });
        });
}

exports.findOrCreateConversation = (request, response) => {
    Conversation.find(
        {
            $or: [
                {
                    conversation_participants: [
                        request.body.message_sender,
                        request.body.message_recipient,
                    ],
                },
                {
                    conversation_participants: [
                        request.body.message_recipient,
                        request.body.message_sender,
                    ],
                },
            ],
        },

        (error, data) => {
            if (error) {
                return response.status(500).json(error);
            } else {
                if (data.length === 0) {
                    createConversation(request.body, response);
                } else
                    return response.status(200).json({
                        message: 'Conversation trouvée',
                        data,
                    });
            }
        }
    );
};

exports.getRecentConversation = (request, response) => {
    Conversation.find({
        conversation_participants: { $in: [request.params._id] },
    })
        .populate('conversation_participants')
        .populate('conversation_last_message')

        .then((conversation) => response.status(200).json(conversation))

        .catch((error) =>
            response.status(500).json({
                message: 'Erreur lors de la recherche',
                error,
            })
        );
};
