import Piece from './piece'

class Bishop extends Piece {
  destinations(square, gameState) { 
    return gameState.squares.diagonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  }
}

export default Bishop
