import {fromEvent, of, Observable} from 'rxjs';

import {map, tap, withLatestFrom, scan, take, filter } from 'rxjs/operators';

import { getTarget, getIndex, getSide, markMoveOnBoard, drawSymbolsOnBoard } from './helpers';

const boardElement = document.querySelector('#board');

const squareElements = [...document.querySelectorAll('.square')];

const buttonsElement = document.querySelector('#buttons');

const board = Array(9).fill('');

export const squareElementsStream = of(squareElements);

export const boardStream = of(board);

export const buildReceiveMoveObsersable = socket => {
  return new Observable(observer => {
    socket.on('move_from_server', board => {
      observer.next(board);
    });
  });
};

export const buttonsStream = fromEvent(buttonsElement, 'click').pipe(
  map(getTarget),
  map(getSide),
  take(1)
);

export const createUpdateBoardStream = inputObservable => {
  return inputObservable
    .pipe(
      withLatestFrom(boardStream, (input, board) => {
        const {move, source} = input;
        const side = source === 'remote' ? 'O' : 'X';
        return {move, board, side}
      }),
      scan(markMoveOnBoard, []),
      withLatestFrom(squareElementsStream, ({board}, squares) => {
        return {board, squares}
      }),
      tap(drawSymbolsOnBoard)
    )
}

// localInputStream
//
// Gets input from the local player
//
export const localInputStream = fromEvent(boardElement, 'click')
  .pipe(
    map(getTarget),
    filter(element => element.textContent === ''),
    map(getIndex),
    map(move => ({move, source: "local"}))
  );
