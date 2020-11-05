// import {} from 'rxjs/operators'
// import {} from './observables'
// import {} from './helpers'
//
// Socks!
//
import io from 'socket.io-client';

// Connect to the Express server
const socket = io("ws://localhost:3000")

// Add a function to Window to send a message
window.testSocket = () => {
  socket.emit('greeting', 'Hi!')
}

// Whenever a message of type "response" is emitted from the server,
// log that message

socket.on('response', msg => {
  console.log("Got a message back: ", msg);
})
