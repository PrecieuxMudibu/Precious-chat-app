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
        origin: [process.env.FRONT_END_URL],
    },
});

console.log('FRONT', process.env.FRONT_END_URL);
io.on('connection', (socket) => {
    console.log('SOCKET ID', socket.id);

    socket.on('join-room', (conversationId) => {
        socket.join(conversationId);
        console.log('ROOM JOINED', conversationId);
    });

    socket.on('send-message', (message, tableSocketMessages) => {
        socket
            .to(message.room)
            .emit('receive-message', message, tableSocketMessages);
        // Envoyer à tos le monde sauf l'expéditeur
        // socket.broadcast.emit('receive-message', message, tableSocketMessages);
    });
});
server.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
