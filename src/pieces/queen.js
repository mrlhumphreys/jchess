import Piece from './piece'

/** A queen piece */
class Queen extends Piece {
  /**
   * All the destinations a queen can move to.
   * @param {Square} square - The square the queen is moving from.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet}
   */
  destinations(square, gameState) { 
    return gameState.squares.orthogonalOrDiagonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  }
}

export default Queen
