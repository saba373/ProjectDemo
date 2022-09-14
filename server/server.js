const express = require('express');
const path = require('path');
const http = require('http');
const SocketIO = require('socket.io');
const {generateMessage,generateMessageLocation} = require('./utils/message');
const PublicPath = path.join(__dirname,'../public');

const app = express();


const port = process.env.port || 3000;

var server = http.createServer(app);

var io = SocketIO(server);

app.use(express.static(PublicPath));

io.on('connection', (socket)=>{
    
    console.log('new user joined ')

    socket.emit('newMessage', generateMessage('Admin','Wellcome to chat App'))

socket.broadcast.emit('newMessage', generateMessage('Admin','new user joined'))
   
socket.on('createLocationMessage', (coords)=>{
  console.log(coords);
   io.emit('newLocationMessage', generateMessageLocation('Admin',coords.latitude,coords.longitude))
   
})

// socket.emit('newEmail',{  
    // from: ' muddabir',
    // to: 'sabir',
    // createdAt: '2/6/2018'
    // }),
    
    // socket.emit('newMessage',{  
    //     from: ' ahmed',
    //     msgtext: 'working for me',
    //    createdAt: '22/3/18'
    //     }),

  socket.on('createMessage', (message,callBack)=>{

    //sends to all including the sender
      io.emit('newMessage', generateMessage(message.from, message.mytext))
      callBack('this is from the server')
    //sends a copy to all other except the sender itself
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.msgtext,
    //     createdAt: new Date().getTime()
    // })
  })
})


server.listen(port, ()=>{
    console.log('working on 3000')
})



