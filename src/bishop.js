import Piece from './piece'

/** A piece that can move diagonally */
class Bishop extends Piece {
  /**
   * All the destinations a bishop can move to.
   * @param {Square} square - The square a bishop is on.
   * @param {GameState} game_state - The game state including the board the bishop is on. 
   * @return {SquareSet}
   */
  destinations(square, gameState) { 
    return gameState.squares.diagonal(square).unoccupiedOrOccupiedByOpponent(this.playerNumber).unblocked(square, gameState.squares);
  }
}

export default Bishop
