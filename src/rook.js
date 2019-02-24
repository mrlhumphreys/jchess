import Piece from './piece'

class Rook extends Piece {
  destinations(square, gameState) {
    return gameState.squares.orthogonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  } 
}

export default Rook
