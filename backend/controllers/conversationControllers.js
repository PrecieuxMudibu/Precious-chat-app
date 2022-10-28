const { response } = require('express');
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
            // console.log(error);
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
    let tableConversation = [];
    let tableConversationFinal = [];

    Conversation.find({
        conversation_participants: { $in: [request.params._id] },
        // conversation_participants: [request.body.current_user],
    })
        .populate('conversation_participants')
        .populate('conversation_last_message')
        
        // .then((conversation) => response.status(200).json(conversation))
        .then((conversation) => {
            let tableConversation = conversation;
            console.log(conversation);

            // const colors = ['red', 'green', 'blue', 'yellow'];
            // colors.splice(2, 1);

            // console.log(colors);
            // // Output: ['red', 'green', 'yellow']

            for (let i = 0; i < tableConversation.length; i++) {
                if (tableConversation[i].conversation_participants[0]._id===request.params._id) {
                    // console.log(tableConversation[i].conversation_participants[0]._id)
                    tableConversation[i].conversation_participants.splice(0,1)
                } else {
                    tableConversation[i].conversation_participants.splice(1,1)
                }
            }
            response.status(200).json(tableConversation);
        })
        // .then((conversation) => response.status(200).json(conversation[0].conversation_participants))

        .catch((error) =>
            response.status(500).json({
                message: 'Erreur lors de la recherche',
                error,
            })
        );

    // User.findOne({ _id: request.body.contact_id })
    // .then((users) =>
    //     response.status(200).json({
    //         users,
    //     })
    // )
    // .catch((error) => {
    //     response.status(400).json({ error });
    // });
};

////////////////
// exports.findConversation = (request, response) => {

//     Conversation.find(
//         {
//             conversation_participants: [
//                 request.params.message_sender,
//                 request.params.message_recipient,
//             ],
//         },
//         (error, data) => {
//             if (error) {
//                 return response.status(500).json(error);
//             } else {
//                 if (data.length === 0) {
//                     return response
//                         .status(200)
//                         .json({ message: 'Rien trouvé', finded: false });
//                 } else
//                     return response.status(200).json({
//                         message: 'Une conversation trouvée',
//                         finded: true,
//                         data,
//                     });
//             }
//         }
//     );
// };

// exports.findConversation = (request, response) => {
//     Conversation.find(
//         {
//             conversation_participants: [
//                 request.body.message_sender,
//                 request.body.message_recipient,
//             ],
//         },
//         (error, data) => {
//             if (error) {
//                 return response.status(500).json(error);
//             } else {
//                 if (data.length == 0) {
//                     Conversation.find(
//                         {
//                             conversation_participants: [
//                                 request.body.message_recipient,
//                                 request.body.message_sender,
//                             ],
//                         },
//                         (error, data) => {
//                             if (error) {
//                                 return response.status(500).json(error);
//                             } else {
//                                 if (data.length == 0) {
//                                     return response.status(404).json({
//                                         message: "Il n'y a rien",
//                                         finded: false,
//                                     });
//                                 }
//                             }
//                         }
//                     );
//                 } else {
//                     return response.status(200).json({ data });
//                 }
//             }
//         }
//     );
// };