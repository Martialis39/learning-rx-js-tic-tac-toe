import {fromEvent, of, combineLatest} from 'rxjs'

import { flatMap, map, tap, withLatestFrom, scan, take } from 'rxjs/operators'

import { getTarget, getIndex, drawSymbol, getSide } from './helpers'

const boardElement = document.querySelector('#board');

const buttonsElement = document.querySelector('#buttons')

const board = Array(9).fill('')

export const boardStream = of(board)

export const buttonsStream = fromEvent(buttonsElement, 'click'). pipe(
  map(getTarget),
  map(getSide),
  take(2)
)

export const inputStream = fromEvent(boardElement, 'click').
  pipe(
    map(getTarget),
    // tap(drawSymbol),
    map(getIndex),
    withLatestFrom(boardStream, buttonsStream),
    scan((acc, curr, i) => {
      console.log('acc is ', acc)
      console.log('curr is ', curr)
      const side = curr[2];
      const board = i === 0 ? curr[1] : acc
      const [index] = curr
      console.log('index is ', index)
      console.log('board is ', board)
      let newBoard = board
      newBoard[index] = side;
      return newBoard
    }, [])
  )

// export const gameStream = combineLatest(inputStream, buttonsStream)

export const gameStream = buttonsStream.pipe(
  withLatestFrom(inputStream)
)
inputStream.subscribe(valu => console.log(valu))

