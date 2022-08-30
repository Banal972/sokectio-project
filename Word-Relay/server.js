const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io');

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('hello');
});

server.listen(PORT,()=>{
    console.log(`서버가 ${PORT}로 실행되었습니다`);
});