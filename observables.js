import {fromEvent, of, Observable } from 'rxjs';

import {map, flatMap, withLatestFrom, scan, take } from 'rxjs/operators';

import { getTarget, getIndex, getSide, markMoveOnBoard } from './helpers';

const boardElement = document.querySelector('#board');

const squareElements = document.querySelectorAll('.square');

const buttonsElement = document.querySelector('#buttons');

const board = Array(9).fill('');

export const squareElementsStream = of(squareElements);

export const boardStream = of(board);

export const buildReceiveBoardObservable = socket => {
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

export const localInputStream = fromEvent(boardElement, 'click').
  pipe(
    map(getTarget),
    map(getIndex),
    withLatestFrom(boardStream, buttonsStream),
    scan(markMoveOnBoard, []),
    map(board => ({board, source: "local"}))
  );
