import { winStates } from "./observables";

export const getTarget = element => element.target

export const getAttributeFromDataset = attribute => element => element.dataset[attribute];

export const checkForWin = (board, winStates) => {
  return winStates.map(
    combination => combination.map(
      square => Boolean(board[square])
    ).every(Boolean)
  ).some(Boolean)
}
