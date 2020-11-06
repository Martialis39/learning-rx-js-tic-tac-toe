export const getTarget = event => event.target

export const getIndex = element => element.dataset.index
export const getSide = element => element.dataset.side

export const drawSymbol = htmlElement => {
  htmlElement.innerHTML = 'X'
}
