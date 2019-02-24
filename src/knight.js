import Piece from './piece'

class Knight extends Piece {
  destinations(square, gameState) { 
    return gameState.squares.notOrthogonalOrDiagonal(square).atRange(square,2).unoccupiedOrOccupiedByOpponent(this.playerNumber);
  }
}

export default Knight
