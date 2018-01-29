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

io.attach(server);

io.on('connection', (socket) => {
 console.log('a user has connected!');
 io.emit('connectMsg', { for:'everyone', msg : `${socket.id} is here!`});

socket.on('disconnected', () =>{
  console.log('a user has disconnected!');
});

});
