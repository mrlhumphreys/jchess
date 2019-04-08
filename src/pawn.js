import exists from './exists'
import Piece from './piece'
import Vector from './vector'

class Pawn extends Piece {
  destinations(square, gameState) { 
    return this.moveSquares(square, gameState).concat(this.captureSquares(square, gameState)).push(this.enPassantSquare(square, gameState));
  }

  moveSquares(square, gameState) { 
    return gameState.squares.inRange(square, this.moveableDistance(square)).inDirection(square, this.playerNumber).orthogonal(square).unoccupied.unblocked(square, gameState.squares);
  }

  captureSquares(square, gameState) { 
    return gameState.squares.inRange(square, 1).inDirection(square, this.playerNumber).diagonal(square).occupiedByOpponent(this.playerNumber);
  }

  enPassantSquare(square, gameState) { 
    if (square.rankNumber(this.playerNumber) === 5 && exists(gameState.lastDoubleStepPawnId)) {
      let doubleStep = gameState.squares.findSquareByPieceId(gameState.lastDoubleStepPawnId);
      let vector = new Vector(square, doubleStep);
      if (vector.magnitude === 1) {
        let x = doubleStep.x;
        let y = square.y + this.direction;
        return gameState.squares.findSquareByXandY(x, y);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  moveableDistance(square) { 
    return square.startingFor(this.playerNumber) ? 2 : 1;
  }

  get direction() {
    return this.playerNumber === 1 ? -1 : 1;
  }
}

export default Pawn

