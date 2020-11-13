import io from 'socket.io-client';

import { gameStream, buildReceiveBoardObservable, inputStream } from './observables';
import {emitBoardTo} from './helpers';
// import {} from './helpers'
//
// Socks!
//

// Connect to the Express server
const socket = io("ws://localhost:3000");

const emitBoardToSocket = emitBoardTo(socket);

// Add a function to Window to send a message
window.testSocket = (b = [1,2,3]) => emitBoardToSocket(b)

// inputStream.subscribe((value) => {
//   console.log(value)
// })
// 
// buttonsStream.subscribe((value) => {
//   console.log(value)
// })

const boardFromServerObservable = buildReceiveBoardObservable(socket)

inputStream.subscribe(console.log.bind(null, "Game stream"))

boardFromServerObservable.subscribe(console.log.bind(null, 'Got it::: '))

// Whenever a message of type "response" is emitted from the server,
// log that message

// Our app
