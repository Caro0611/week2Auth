const express = require('express'); //just like an include or
const app = express(); //create an instance of our aplication
const io = require('socket.io')();

app.use(express.static('public'));

// set up routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

const server = app.listen(3000, () => {
  console.log ('app running on port 3000!');
});

io.attach(server); //music.attach(server); 

//music space
const music = io.of('/music');







music.on('connection', (socket) => { //function(socket) { ...}
 console.log('a user has connected!');

 music.emit('chat message', { for:'everyone', message : `${socket.id} is here!`});

//handle messages sent from the client
socket.on('chat message', msg => {
  music.emit('chat message', { for:'everyone', message : msg});
});


socket.on('disconnect', () => {
  console.log('a user has disconnected!');

  music.emit('disconnect message', `${socket.id} has left the building`);
});




});
