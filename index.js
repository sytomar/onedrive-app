const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const authRouter = require('./routes/auth');
const driveRouter = require('./routes/drive');
const { router: webhookRouter, setSocketIo } = require('./routes/webhook');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/drive', driveRouter);
setSocketIo(io);
app.use('/webhook', webhookRouter);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
