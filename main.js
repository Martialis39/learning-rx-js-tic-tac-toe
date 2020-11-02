import { map, take, flatMap, tap, withLatestFrom, scan, filter } from 'rxjs/operators'
import {input, chooseSide, board, winStates, testStream, anotherTestStream} from './observables'
import {getTarget, getAttributeFromDataset, checkForWin} from './helpers'

const inputStream = input
  .pipe(
    map(getTarget),
    map(getAttributeFromDataset('index'))
  )

winStates.subscribe(console.log.bind(null, 'Got this: '))

const chooseSideStream = chooseSide
  .pipe(
      map(getTarget),
      map(getAttributeFromDataset('side')),
      take(1)
    )

const gameStream = inputStream
  .pipe(
    withLatestFrom(chooseSideStream),
    withLatestFrom(board),
    map(([[index, side], board]) => ({index, side, board})),
    scan((oldState, newState, iteration) => {
      const {index, side} = newState;
      const board = iteration === 0 ? newState.board : oldState.board;
      board[index] = side;
      return {board}
    }, {}),
    withLatestFrom(winStates),
    map(([board, winStates]) => checkForWin(board, winStates))
  )

gameStream.subscribe(console.log.bind(null, 'gameStream Got this: '))
