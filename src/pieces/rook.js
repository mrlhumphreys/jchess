import Piece from './piece'

/** A rook piece */
class Rook extends Piece {
  /**
   * All the destinations a rook can move to.
   * @param {Square} square - The square the rook is moving from.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet}
   */
  destinations(square, gameState) {
    return gameState.squares.orthogonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  } 
}

export default Rook
