/*global io*/
let socket = io();
let numOfUsers = document.querySelector('#num-users');
let messages = document.querySelector('#messages');
let form = document.querySelector('#form');

socket.on('user', data => {
  let msg = data.username + (data.connected ? ' has joined the chat.' : ' has left the chat.');

  numOfUsers.innertext = `${data.currentUsers} users online`;
  messages.append(`<li>'<b>'${msg}</b></li>`);
});

socket.on('chat message', data => {
  console.log('socket.on 1')
  messages.append(`<li> ${data.username}: ${data.message}</li>`);
})

form.addEventListener('submit', e => {
  let messageToSend = document.querySelector('#message-to-send');

  socket.emit('chat message', messageToSend.value);
  messageToSend.value = '';
  e.preventDefault();
});
