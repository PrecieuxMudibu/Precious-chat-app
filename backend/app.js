const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(passport.initialize());
require('./middlewares/passport');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

app.use('/api', userRoutes);
app.use('/api', conversationRoutes);
app.use('/api', messageRoutes);

module.exports = app;
