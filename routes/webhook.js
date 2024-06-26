const express = require('express');
const router = express.Router();

let io;

const setSocketIo = (socketIoInstance) => {
    io = socketIoInstance;
};

router.post('/notification', (req, res) => {
    const { value } = req.body;
    if (io) {
        io.emit('filePermissionChanged', value);
    }
    res.sendStatus(202);
});

module.exports = {
    router,
    setSocketIo,
};
