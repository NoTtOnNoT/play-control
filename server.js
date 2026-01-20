const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ยอมให้เข้าถึงไฟล์ในโฟลเดอร์งานได้ทั้งหมด
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('play-sound', (id) => { io.emit('do-play', id); });
    socket.on('volume-set', (val) => { io.emit('do-volume', val); });
    socket.on('control-cmd', (cmd) => { io.emit('do-control', cmd); });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});