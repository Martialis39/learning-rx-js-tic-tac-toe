import io from 'socket.io-client';

import {merge} from 'rxjs';

import {filter, map, distinctUntilChanged} from 'rxjs/operators';

import {buildReceiveBoardObservable, localInputStream} from './observables';
import {emitBoardTo} from './helpers';
// import {} from './helpers'
//
// Socks!
//

// Connect to the Express server
const socket = io("ws://localhost:3000");

const emitBoardToSocket = emitBoardTo(socket);

let dummyBoard = Array(9).fill("")

const fillDummyBoard = () => {
  // Get the last free index on board
  const { index } = dummyBoard
    .map((e, index) => ({e, index}))
    .filter(({e, _}) => !Boolean(e))
    .pop()
  console.log(index)
  // Modify global variable
  dummyBoard[index] = "O";
  const copy = dummyBoard.slice();
  // Return copy of global variable
  return copy;
};

// Add a function to Window to send a message
window.testSocket = (b = dummyBoard) => emitBoardToSocket(fillDummyBoard(b))

// localInputStream.subscribe((value) => {
//   console.log(value)
// })
// 
// buttonsStream.subscribe((value) => {
//   console.log(value)
// })

const opponentInputStream = buildReceiveBoardObservable(socket).pipe(
  map(board => ({board, source: "remote"}))
)
const combinedStreams = merge(localInputStream, opponentInputStream)

combinedStreams.pipe(
  distinctUntilChanged((p, q) => p.source === q.source)
)
  .subscribe(console.log.bind(null, 'Combined streams ::: '))
