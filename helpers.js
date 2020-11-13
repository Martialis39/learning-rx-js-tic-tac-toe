export const getTarget = event => event.target

export const getIndex = element => element.dataset.index
export const getSide = element => element.dataset.side

export const drawSymbol = htmlElement => {
  htmlElement.innerHTML = 'X'
}

export const emitBoardTo = socket => board => {
  socket.emit('move', board);
}

export const markMoveOnBoard = (prevState, newState, iteration) => {
    const side = newState[2];
    // on first iteration, take the new board
    // otherwise, use the board from the last go around (which is acc) to continue filling it out
    const board = iteration === 0 ? newState[1] : prevState.board;
    const [index] = newState;
    let newBoard = board;
    newBoard[index] = side;
    return {board: newBoard};
}
