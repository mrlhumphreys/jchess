import exists from './exists'

class Move {
  constructor(args) {
    this.fromId = args.fromId;
    this.toId = args.toId;
    this.gameState = args.gameState;
    this.error = null;
  }

  possible() {
    if (!exists(this._from)) {
      this.error = { name: 'NoSquareError', message: 'Square must be specified' }; 
    } else if (!exists(this._from.piece)) {
      this.error = { name: 'NoPieceError', message: 'Square must have a piece on it' };
    } else if (!this._from.piece.canMoveFrom(this._from, this.gameState)) {
      this.error = { name: 'CannotMoveError', message: 'Piece cannot move' };
    } else {
      this.error = null;
    }

    return this.error === null;
  }

  valid() {
    if (!exists(this._from)) {
      this.error = { name: 'NoSquareError', message: 'Square must be specified' };
    } else if (!exists(this._from.piece)) {
      this.error = { name: 'NoPieceError', message: 'Square must have a piece on it' };
    } else if (!this._from.piece.canMove(this._from, this._to, this.gameState)) {
      this.error = { name: 'CannotMoveError', message: 'Piece cannot move that way' };
    } else {
      this.error = null;
    }

    return this.error === null;
  }

  get _from() {
    return this.gameState.findSquare(this.fromId);
  }

  get _to() {
    return this.gameState.findSquare(this.toId);
  }
}

export default Move
