import io from 'socket.io-client';

import {merge} from 'rxjs';

import {map, distinctUntilChanged, tap} from 'rxjs/operators';

import {createUpdateBoardStream, buildReceiveMoveObsersable, localInputStream} from './observables';
import {emitBoardTo} from './helpers';
// import {} from './helpers'
//
// Socks!
//

// Connect to the Express server
const socket = io("ws://localhost:3000");

const emitBoardToSocket = emitBoardTo(socket);

const setupDummyBoard = board => {
  const dummyBoard = board;
  return () => {
    const { index } = dummyBoard
      .map((e, index) => ({e, index}))
      .filter(({e, _}) => !Boolean(e))
      .pop();
    //
    // Modify closure variable
    //
    dummyBoard[index] = "O";
    return index;
  };
};


const makeDummyMove = setupDummyBoard(Array(9).fill(""));

// Add a function to Window to send a message
window.makeTestMove = () => emitBoardToSocket(makeDummyMove())

// localInputStream.subscribe((value) => {
//   console.log(value)
// })
// 
// buttonsStream.subscribe((value) => {
//   console.log(value)
// })

const opponentInputStream = buildReceiveMoveObsersable(socket).pipe(
  map(move => ({move, source: "remote"}))
)
const combinedInputStreams = merge(localInputStream, opponentInputStream).pipe(
  distinctUntilChanged((p, q) => p.source === q.source)
)

const gameStream = createUpdateBoardStream(combinedInputStreams);

gameStream.subscribe(console.log.bind(null, 'Game stream: '))
