import Piece from './piece'

class Queen extends Piece {
  destinations(square, gameState) { 
    return gameState.squares.orthogonalOrDiagonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  }
}

export default Queen
