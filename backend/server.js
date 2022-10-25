const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();
// app.set('port', process.env.PORT);
const PORT = process.env.PORT;
const server = http.createServer(app);

// Je crée un serveur socket io qui se base sur mon serveur express
const io = require('socket.io')(server, {
    cors: {
        // origin: ['http://localhost:3000'],
        origin: [process.env.FRONT_END_URL],
    },
});

console.log('FRONT',process.env.FRONT_END_URL)
io.on('connection', (socket) => {
    // Afficher les id des clients connectés
    console.log('SOCKET ID', socket.id);

    // Créer une room
    socket.on('join-room', (conversationId) => {
        socket.join(conversationId);
        console.log('ROOM JOINED', conversationId);
    });

    socket.on('send-message', (message, tableSocketMessages) => {
        // Envoyer le message à toutes les personnes sr le socket meme l'expediteur
        // io.emit('receive-message', messageText)

        socket
            .to(message.room)
            .emit('receive-message', message, tableSocketMessages);
        // console.log('SERVEUR',message.room)
        ////////NICE//////////////////////////////////////////////////////
        // Envoyer à tos le monde sauf l'expéditeur
        // socket.broadcast.emit('receive-message', message, tableSocketMessages);
    });
});
// server.listen(process.env.PORT || 3000);
server.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
