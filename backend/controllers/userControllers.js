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
                    'https://www.super-blagues.fr/assets/images/profil/profil_defaut.png',
            });
            user.save()
                .then(() =>
                    response.status(201).json({ message: 'Utilisateur créé !' })
                )
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
            message: 'Mis à jour avec succès', response.status(200).json(user);
        })
        .catch((error) => response.status(500).json(error));
};
// const filter = { name: 'Jean-Luc Picard' };
// const update = { age: 59 };

// // `doc` is the document _after_ `update` was applied because of
// // `new: true`
// let doc = await Character.findOneAndUpdate(filter, update, {
//   new: true
// });
// doc.name; // 'Jean-Luc Picard'
// doc.age; // 59
