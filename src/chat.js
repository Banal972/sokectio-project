"use strict"

const socket = io();

const chatInput = document.querySelector('.talkBox .bbx textarea');
const send = document.querySelector('.talkBox .bbx #send');
const tbx = document.querySelector('.talkBox .tbx');
const NAME = prompt('채팅방에 사용할 이름을 적어주세요');

if(NAME){
    socket.emit("new connect",NAME);
}

socket.on('new connect',name => {

    const addPeople = document.querySelector('.addPeople');
    const h2 = document.querySelector('.addPeople h2');

    h2.innerHTML = `${name}님이 접속하셨습니다.`;

    setTimeout(function(){
        addPeople.classList.add('on');
        addPeople.style.transition = 'transform .6s';
    },100);

    setTimeout(function(){
        addPeople.classList.remove('on');
    },3000);

});

function chatSend(){ // 채팅보내기

    if(chatInput.value == '') return;

    const param = {
        name : NAME,
        msg : chatInput.value
    }
    socket.emit('chatting',param);

    chatInput.value = null;
}

chatInput.addEventListener('keypress',(event)=>{
    if(event.keyCode === 13){
        chatSend();
    }
});

send.addEventListener('click',chatSend);

socket.on("chatting",data => { // 채팅 데이터

    const {name, msg, time} = data;
    const itme = new chatModel(name, msg, time);
    itme.makeChat();
    tbx.scrollTo(0,tbx.scrollHeight);
    
});

class chatModel {
    constructor(name,msg,time){
        this.name = name;
        this.msg = msg;
        this.time = time
    }
    makeChat(){
        const div = document.createElement("div");
        const dom = `
            <div class="chatinBar ${NAME === this.name ? 'asdsad' : 'right'}">
                <h2>${this.name}</h2>
                <p>${this.msg}</p>
            </div>`;
        div.innerHTML = dom;
        tbx.appendChild(div);
    }
}