import Piece from './piece'

/** A knight piece that can jump in l-shapes. */
class Knight extends Piece {
  /**
   * Destinations that a knight can move to from a square on a board.
   * @param {Square} square - The square the knight is on.
   * @param {GameState} gameState - The game state.
   * @return {SquareSet}
   */
  destinations(square, gameState) { 
    return gameState.squares.notOrthogonalOrDiagonal(square).atRange(square,2).unoccupiedOrOccupiedByOpponent(this.playerNumber);
  }
}

export default Knight
