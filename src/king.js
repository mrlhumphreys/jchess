import { compact } from './utils'
import Piece from './piece'
import SquareSet from './square_set'
import Vector from './vector'

class King extends Piece {
  destinations(square, gameState) { 
    let base = this.baseDestinations(square, gameState);
    let castle = this.castle(square, gameState);
    let checked = this.checkedSquares(square, gameState);
    let shared = this.sharedKingSquares(gameState);
    return base.concat(castle).difference(checked).difference(shared);
  }

  baseDestinations(square, gameState) { 
    return gameState.squares.atRange(square, 1).unoccupiedOrOccupiedByOpponent(this.playerNumber);
  }

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

  checkedSquares(square, gameState) { 
    return gameState.squares.threatenedBy(this.opponent, gameState);
  }

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
