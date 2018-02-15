(() => {
  const socket = io('/music');

  let messageList = document.querySelector('ul'),
      chatForm = document.querySelector('form'),
      nameInput = document.querySelector('.nickname'),
      chatMessage = chatForm.querySelector('.message'),
      nickName = null;


function setNickname(){
  //debugger;
  nickName = this.value;
}

function handleSendMessage(e) {
  e.preventDefault(); //prevent the default behaivour - a submit triggers a page
  //reload, which we dont want
  //debugger;

  //ternary --> check to see if the variable exists, and handle if it does, or if
  //it doesn't. true is to the left of the colon, flase is to the right.
  nickName = (nickName && nickName.length > 0) ? nickName : 'user';

  //grab the text from the input field at the bottom of the page
  msg = `${nickName} says ${chatMessage.value}`;

  //emit a chat event so that we can pass it through to the server (and everyone else)
  socket.emit('chat message', msg);
  chatMessage.value = '';
  return false;
}

$("#channel").change(function(){
  socket.emit('changeRoom',$("#channel").val());
}); //finnally I tried to create this fucntion to change room.

function appendMessage(msg) {
  //debugger;
  let newMsg = `<li>${msg.message}</li>`;
  messageList.innerHTML += newMsg;

}

function appendDMessage(msg) {
  //debugger;
  let newMsg = `<li>${msg}</li>`;
  messageList.innerHTML += newMsg;
}

//listening event to run change room function. clean message and display welcome message.
socket.on('changeRoom', function(channel){
  $("#message").html('').append($('<li>').text('system : Welcome:' +channel));
})


nameInput.addEventListener('change', setNickname, false);
chatForm.addEventListener('submit', handleSendMessage, false);
socket.addEventListener('chat message', appendMessage, false);
socket.addEventListener('disconnect message', appendDMessage, false);

})();
