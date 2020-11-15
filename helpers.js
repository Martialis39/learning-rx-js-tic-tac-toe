export const getTarget = event => event.target

export const getIndex = element => element.dataset.index
export const getSide = element => element.dataset.side

export const drawSymbol = (htmlElement, symbol) => {
  htmlElement.innerHTML = symbol || '';
};

export const drawSymbolsOnBoard = ({board, squares}) => {
  squares.forEach((element, index) => {
    drawSymbol(element, board[index])
  })
}

export const emitBoardTo = socket => board => {
  socket.emit('move', board);
};

export const markMoveOnBoard = (prevState, newState, iteration) => {
    const {move, side} = newState;
    // on first iteration, take the new board
    // otherwise, use the board from the last go around (which is acc) to continue filling it out
    const board = iteration === 0 ? newState.board : prevState.board;
    let newBoard = board;
    newBoard[move] = side;
    return {board: newBoard};
}

