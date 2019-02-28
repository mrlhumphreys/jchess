import exists from './exists'

class Move {
  constructor(args) {
    this.from = args.from;
    this.to = args.to;
    this.gameState = args.gameState;
  }

  possible() {
    return exists(this.from) && exists(this.from.piece) && this.from.piece.canMoveFrom(this.from, this.gameState);
  }

  valid() {
    return exists(this.from) && exists(this.from.piece) && this.from.piece.canMove(this.from, this.to, this.gameState);
  }
}

export default Move
