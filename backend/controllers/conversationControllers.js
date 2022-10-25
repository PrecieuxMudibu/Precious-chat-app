const { response } = require('express');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

async function createConversation(req, res) {
    // const conversation = Conversation.create({
    //     conversation_participants: [req.message_sender, req.message_recipient],
    // });
    const conversation = new Conversation({
        conversation_participants: [req.message_sender, req.message_recipient],
    });

    // return res.send(conversation);
    // if (!conversation) {
    //     return res.status(500);
    // } else {
    //     return res.status(201).json(conversation);
    // }
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
        conversation_participants: { $in: [request.params.current_user] },
        // conversation_participants: [request.body.current_user],
    })
        .then((conversation) => response.status(200).json(conversation))
        // .then((conversation) => {
        //     tableConversation = [...conversation];
        //     console.log('tableConversation', tableConversation);

            
        //     // if (tableConversation.length !== 0) {
        //     //     tableConversation.forEach((item) => {
        //     //         let conversation = {
        //     //             _id: item._id,
        //     //         };


        //     //         if (
        //     //             item.conversation_participants[0] ===
        //     //             request.body.current_user
        //     //         ) {
        //     //             conversation.contact = conversation_participants[1];
        //     //         } else {
        //     //             conversation.contact = conversation_participants[0];
        //     //         }
        //     //         tableConversationFinal.push(conversation);
        //     //     });
        //     //     console.log('tableConversation', tableConversationFinal);
        //     // }
        // })
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
