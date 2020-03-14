import { exists } from './utils'
import Piece from './piece'
import Vector from './vector'

/** A pawn piece. Moves forward 1 or two squares. */
class Pawn extends Piece {
  /**
   * The destinations that a Pawn can move to from a square on a board.
   * @param {Square} square - The origin square.
   * @param {GameState} gameState - The game state being played on.
   * @return {SquareSet}
   */
  destinations(square, gameState) { 
    return this.moveSquares(square, gameState).concat(this.captureSquares(square, gameState)).push(this.enPassantSquare(square, gameState));
  }

  /**
   * All the squares that a pawn can move to normally.
   * @param {Square} square - The origin square.
   * @param {GameState} gameState - The game state being played on.
   * @return {SquareSet}
   */
  moveSquares(square, gameState) { 
    return gameState.squares.inRange(square, this.moveableDistance(square)).inDirection(square, this.playerNumber).orthogonal(square).unoccupied().unblocked(square, gameState.squares);
  }

  /**
   * All the squares that a pawn can go to to capture.
   * @param {Square} square - The origin square.
   * @param {GameState} gameState - The game state being played on.
   * @return {SquareSet}
   */
  captureSquares(square, gameState) { 
    return gameState.squares.inRange(square, 1).inDirection(square, this.playerNumber).diagonal(square).occupiedByOpponentOf(this.playerNumber);
  }

  /**
   * The en passant squares a pawn can go to to capture.
   * Returns null if none.
   * @param {Square} square - The origin square.
   * @param {GameState} gameState - The game state being played on.
   * @return {(Square|null)}
   */
  enPassantSquare(square, gameState) { 
    let doubleStep = gameState.squares.findByPieceId(gameState.lastDoubleStepPawnId);
    if (square.rankNumber(this.playerNumber) === 5 && exists(doubleStep)) {
      let vector = new Vector(square, doubleStep);
      if (vector.magnitude === 1) {
        let x = doubleStep.x;
        let y = square.y + this.direction;
        return gameState.squares.findByCoordinate(x, y);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Number of squares this piece can move from square.
   * @param {Square} square - The square the piece is moving from.
   * @return {number}
   */
  moveableDistance(square) { 
    return square.startingFor(this.playerNumber) ? 2 : 1;
  }

  /**
   * The direction this piece can move.
   * Up if player 1, down if player 2.
   * @return {number}
   */
  get direction() {
    return this.playerNumber === 1 ? -1 : 1;
  }
}

export default Pawn

