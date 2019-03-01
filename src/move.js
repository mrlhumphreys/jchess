import exists from './exists'

class Move {
  constructor(args) {
    this.from = args.from;
    this.to = args.to;
    this.gameState = args.gameState;
    this.error = null;
  }

  possible() {
    if (!exists(this.from)) {
      this.error = { name: 'NoSquareError', message: 'Square must be specified' }; 
    } else if (!exists(this.from.piece)) {
      this.error = { name: 'NoPieceError', message: 'Square must have a piece on it' };
    } else if (!this.from.piece.canMoveFrom(this.from, this.gameState)) {
      this.error = { name: 'CannotMoveError', message: 'Piece cannot move' };
    } else {
      this.error = null;
    }

    return this.error === null;
  }

  valid() {
    if (!exists(this.from)) {
      this.error = { name: 'NoSquareError', message: 'Square must be specified' };
    } else if (!exists(this.from.piece)) {
      this.error = { name: 'NoPieceError', message: 'Square must have a piece on it' };
    } else if (!this.from.piece.canMove(this.from, this.to, this.gameState)) {
      this.error = { name: 'CannotMoveError', message: 'Piece cannot move that way' };
    } else {
      this.error = null;
    }

    return this.error === null;
  }
}

export default Move
