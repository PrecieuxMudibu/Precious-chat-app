const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (request, response, next) => {
    bcrypt
        .hash(request.body.user_password, 10)
        .then((hash) => {
            const user = new User({
                user_name: request.body.user_name,
                user_email: request.body.user_email,
                user_password: hash,
                user_profile_picture:
                    'https://res.cloudinary.com/dzci2uq4z/image/upload/v1667309524/testFolder/avatar-removebg-preview_tkr7b0.png',
            });
            user.save()
                .then(() => {
                    const payload = {
                        user_name: user.user_name,
                        id: user._id,
                    };

                    const token = jwt.sign(payload, 'NEVER GIVE UP', {
                        expiresIn: '1d',
                    });

                    return response.status(200).json({
                        message: 'Votre compte a été créé avec succès.',
                        token: 'Bearer ' + token,
                        id: payload.id,
                    });
                })
                .catch((error) => {
                    response.status(400).json({ error });
                });
        })
        .catch((error) => {
            response.status(500).json({ error });
        });
};

exports.login = (request, response) => {
    User.findOne({
        user_email: request.body.user_email,
    }).then((user) => {
        if (!user) {
            return response
                .status(401)
                .json({ message: '1 Paire login/mot de passe incorrecte' });
        }

        if (
            !bcrypt.compareSync(request.body.user_password, user.user_password)
        ) {
            return response
                .status(401)
                .json({ message: 'Mot de passe incorrect' });
        }

        const payload = {
            user_name: user.user_name,
            id: user._id,
        };

        const token = jwt.sign(payload, 'NEVER GIVE UP', { expiresIn: '1d' });

        return response.status(200).json({
            message: 'Vous êtes connecté !',
            token: 'Bearer ' + token,
            id: payload.id,
        });
        // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
        // var token = jwt.sign(payload, secretOrPrivateKey, [options, callback]);
    });
};

// exports.getAllUsers = (request, response) => {
//     User.find()
//         .then((users) =>
//             response.status(200).json({
//                 users,
//             })
//         )
//         .catch((error) => {
//             response.status(400).json({ error });
//         });
// };

exports.getAllUsersExceptCurrentUser = (request, response) => {
    User.find({ _id: { $nin: [request.params.id] } })
        .then((users) => {
            response.status(200).json({
                users,
            });
        })
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then((users) => response.status(200).json(users))
        .catch((error) => {
            response.status(400).json({ error });
        });
};

exports.updateUser = (request, response) => {
    const filter = { _id: request.params.id };
    const update = {
        user_profile_picture: request.body.user_profile_picture,
    };
    User.findOneAndUpdate(filter, update, {
        new: true,
    })
        .then((user) => {
            message: 'Votre profil a été mis à jour avec succès',
                response.status(200).json(user);
        })
        .catch((error) => response.status(500).json(error));
};

exports.searchUsers = (request, response) => {
    const filter = {
        user_name: { $regex: '^' + request.body.user_name, $options: 'i' },
    };

    User.find(filter)
        .then((users) => {
            response
                .status(200)
                .json({ message: 'Les utilisateurs ont été trouvés', users });
        })
        .catch((error) => response.status(500).json(error));
};

// exports.getAllMessages = (request, response) => {
//     Message.find({ conversation_id: request.params.id })
//         .then((messages) =>
//             response.status(200).json({
//                 messages,
//             })
//         )
//         .catch((error) => {
//             response.status(400).json({ error });
//         });
// };
