const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public")); // __dirname 을 이용해서 절대경로로 수정

io.on('connection',(socket) => { // 소켓 io을 연결함
    console.log('소켓 io가 연결되었습니다');
    socket.on('test',(msg)=>{ // 클라이언트에서 보낸것을 불러옴
        io.emit('test',msg); // 서버에서 클라이언트로 보내줌
    });
});

server.listen(PORT,()=>{
    console.log(`서버가 ${PORT}로 실행되었습니다`);
});