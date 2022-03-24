import { compact } from '../utils'
import Piece from './piece'
import SquareSet from '../square_set'
import { Vector } from '@mrlhumphreys/jboardgame'

/** A king piece */
class King extends Piece {
  /**
   * The destinations that a king can move to from a square given the board.
   * @param {Square} square - The square the king is on.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet} 
   */
  destinations(square, gameState) { 
    let base = this.baseDestinations(square, gameState);
    let castle = this.castle(square, gameState);
    let checked = this.checkedSquares(square, gameState);
    let shared = this.sharedKingSquares(gameState);
    return base.concat(castle).difference(checked).difference(shared);
  }

  /**
   * The destinations based on how a king moves.
   * @param {Square} square - The square the king is on.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet} 
   */
  baseDestinations(square, gameState) { 
    return gameState.squares.atRange(square, 1).unoccupiedOrOccupiedByOpponent(this.playerNumber);
  }

  /**
   * The destinations of a king when castling.
   * @param {Square} square - The square the king is on.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet} 
   */
  castle(square, gameState) { 
    let rooks = gameState.squares.occupiedByPiece('rook').occupiedByPlayer(this.playerNumber).unmoved

    if (this.hasNotMoved && rooks.some()) {
      let _squares = compact(rooks.map((s) => {
        let vector = new Vector(square, s);
        let x = square.x + (2 * vector.directionX);
        let y = square.y;
        return gameState.squares.findByCoordinate(x, y);
      }));

      let potential = new SquareSet({squares: _squares});

      return potential.unoccupied().unblocked(square, gameState.squares);
    } else {
      return new SquareSet({squares: []});
    }
  }

  /**
   * The squares that are threatened and would lead to check.
   * @param {Square} square - The square the king is on.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet} 
   */
  checkedSquares(square, gameState) { 
    return gameState.squares.threatenedBy(this.opponent, gameState);
  }

  /**
   * Shared destinations with the other king that would lead to checkmate.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet} 
   */
  sharedKingSquares(gameState) { 
    let all = gameState.squares.occupiedByPiece('king').map(function(s) {
      return s.piece.baseDestinations(s, gameState); 
    });

    if (all.length > 1) {
      return all.reduce(function(memo, set) { 
        return memo ? memo.intersection(set) : set;
      });
    } else {
      return new SquareSet({squares: []});
    }
  }
}

export default King
