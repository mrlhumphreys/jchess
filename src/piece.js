import exists from './exists'

const mockSquareSet = {
  some: function() { return false; },
  none: function() { return true; },
  includes: function() { return false; }
};

class Piece {
  constructor(args) {
    this.constructorName = 'Piece';
    this.playerNumber = args.player_number;
    this.selected = exists(args.selected) ? args.selected : false;
    this.id = args.id;
    this.hasMoved = exists(args.has_moved) ? args.has_moved : false;
    this.type = args.type;
  }

  get asJson() {
    return {
      player_number: this.playerNumber,
      selected: this.selected,
      id: this.id,
      has_moved: this.hasMoved,
      type: this.type
    };
  }

  canMoveFrom(square, gameState) {
    return this.destinations(square, gameState).some();
  }

  canMove(from, to, gameState) {
    return this.destinations(from, gameState).includes(to);
  }

  destinations(square, gameState) {
    return mockSquareSet;
  }

  captureSquares(square, gameState) {
    return this.destinations(square, gameState);
  }

  enPassantSquare() {
    return null;
  }

  get hasNotMoved() {
    return !this.hasMoved;
  }

  get opponent() {
    return (this.playerNumber === 1 ? 2 : 1);
  }

  get dup() {
    let _piece = {
      type: this.type,
      player_number: this.playerNumber,
      selected: this.selected,
      id: this.id,
      has_moved: this.hasMoved
    }
    return new this.constructor(_piece);
  }

  // actions

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}

export default Piece
