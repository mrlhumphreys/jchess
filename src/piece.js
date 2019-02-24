const mockSquareSet = {
  some: function() { return false; },
  none: function() { return true; },
  includes: function() { return false; }
};

class Piece {
  constructor(args) {
    this.constructorName = 'Piece';
    this.playerNumber = args.player_number;
    this.selected = args.selected ? args.selected : false;
    this.id = args.id;
    this.hasMoved = args.has_moved;
    this.type = args.type;
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

  hasNotMoved() {
    return !this.hasMoved;
  }

  opponent() {
    return (this.playerNumber === 1 ? 2 : 1);
  }

  dup() {
    let _piece = {
      type: this.type,
      player_number: this.playerNumber,
      selected: this.selected,
      id: this.id,
      has_moved: this.hasMoved
    }
    // let pieceFactory = new PieceFactory(_piece);
    // return pieceFactory.build();
    return new this.constructor(_piece);
  }
}

export default Piece
