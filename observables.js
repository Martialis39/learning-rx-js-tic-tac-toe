import {fromEvent, of} from 'rxjs'

const boardElement = document.querySelector('#board')
const buttonsElement = document.querySelector('#buttons')

export const input = fromEvent(boardElement, 'click')
export const chooseSide = fromEvent(buttonsElement, 'click')

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
export const winStates = of(winningCombinations)

export const board = of(Array(9).fill(''))
