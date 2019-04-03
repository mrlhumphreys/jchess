import exists from './exists'
import Square from './square'
import Vector from './vector'

class SquareSet {
  constructor(args) { 
    this.squares = args.squares.map(function(s) {
      if (s.constructorName === 'Square') {
        return s;
      } else {
        return new Square(s);
      }
    });
  }

  asJson() {
    return {
      squares: this.squares.map(function(s) { return s.asJson(); })
    };
  }

  direction(playerNumber) { 
    return playerNumber === 1 ? -1 : 1;
  }

  opponent(playerNumber) { 
    return playerNumber === 1 ? 2 : 1;
  }

  dup() {
    let _squares = this.squares.map(function(s) { return s.dup(); });
    return new SquareSet({squares: _squares});
  }

  // enumerable functions

  // enumerable callbacks

  some(callback) { 
    if (callback) {
      return this.squares.some(callback);
    } else {
      return this.squares.length > 0;
    }
  }

  none(callback) { 
    return !this.some(callback);
  }

  every(callback) { 
    return this.squares.every(callback);
  }

  map(callback) { 
    return this.squares.map(callback);
  }

  filter(callback) { 
    let _squares = this.squares.filter(callback);
    return new SquareSet({squares: _squares});
  }

  // enumerable operations

  concat(other) { 
    let _squares = this.squares.concat(other.squares);
    return new SquareSet({squares: _squares});
  }

  diff(other) { 
    return this.filter(function(square) { return other.excludes(square); });
  }

  intersection(other) { 
    return this.filter(function(square) { return other.includes(square); });
  }

  uniq() {
    return this.filter(function(e, i, a) { return a.indexOf(e) === i; });
  }

  push(square) { 
    if (exists(square)) {
      this.squares.push(square);
      return new SquareSet({squares: this.squares});
    } else {
      return this;
    }
  }

  length() {
    return this.squares.length;
  }

  // enumerable queries

  includes(square) { 
    return this.squares.some(function(s) { return s.id === square.id; });
  }

  excludes(square) { 
    return !this.includes(square);
  }

  // finders

  first() {
    return this.squares[0];
  }

  selectedSquare() {
    return this.filter(function(s) { return exists(s.piece) && s.piece.selected; }).first();
  }

  findSquare(id) { 
    return this.filter(function(s) { return s.id === id; }).first();
  }

  findSquareByXandY(x, y) { 
    return this.filter(function(s) { return s.x === x && s.y === y; }).first();
  }

  findSquareByPieceId(pieceId) { 
    return this.filter(function(s) { return exists(s.piece) && s.piece.id === pieceId; }).first();
  }

  findKingForPlayer(playerNumber) { 
    return this.occupiedByPiece('king').occupiedByPlayer(playerNumber).first();
  }

  // filters

  inRange(square, distance) { 
    return this.filter(function(s) { 
      return (new Vector(square, s)).magnitude() <= distance;
    });
  }

  atRange(square, distance) { 
    return this.filter(function(s) {
      return (new Vector(square, s)).magnitude() === distance;
    });
  }

  inDirection(square, playerNumber) { 
    return this.filter((s) => { 
      return (new Vector(square, s)).directionY() === this.direction(playerNumber);
    });
  }

  orthogonal(square) { 
    return this.filter(function(s) {
      return (new Vector(square, s)).orthogonal();
    });
  }

  diagonal(square) { 
    return this.filter(function(s) {
      return (new Vector(square, s)).diagonal();
    });
  }

  sideways(square) { 
    return this.filter(function(s) { return square.y === s.y; });
  }

  orthogonalOrDiagonal(square) { 
    return this.filter(function(s) { 
      return (new Vector(square, s)).orthogonalOrDiagonal();
    });
  }

  notOrthogonalOrDiagonal(square) { 
    return this.filter(function(s) {
      return (new Vector(square, s)).notOrthogonalOrDiagonal();
    });
  }

  unoccupied() {
    return this.filter(function(s) { return s.unoccupied(); });
  }

  occupiedByPlayer(playerNumber) { 
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.playerNumber === playerNumber; 
    });
  }

  occupiedByOpponent(playerNumber) {
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.playerNumber != playerNumber;
    });
  }

  unoccupiedOrOccupiedByOpponent(playerNumber) { 
    return this.filter(function(s) {
      return !exists(s.piece) || s.piece.playerNumber != playerNumber;
    });
  }

  occupiedByPiece(pieceType) { 
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.type === pieceType;
    });
  }

  excludingPiece(pieceType) { 
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.type != pieceType;
    });
  }

  unblocked(origin, board) { 
    return this.filter(function(destination) {
      return board.between(origin, destination).every(function(s) {
        return s.unoccupied();
      });
    });
  }

  unmoved() {
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.hasNotMoved();
    });
  }

  between(origin, destination) {
    let vector = new Vector(origin, destination);
    let _squares = [];

    if (vector.diagonal() || vector.orthogonal()) {
      let pointCounter = origin.point();
      let direction = vector.direction();
      let square = null;

      while (pointCounter.notEq(destination.point())) {
        pointCounter = pointCounter.add(direction);
        square = this.findSquareByXandY(pointCounter.x, pointCounter.y);
        if (exists(square) && square.point().notEq(destination.point())) {
          _squares.push(square);
        }
      }
    }

    return new SquareSet({squares: _squares});
  }

  threatenedBy(playerNumber, gameState) { 
    let destinations = this.occupiedByPlayer(playerNumber).excludingPiece('king').map((s) => {
      return s.piece.captureSquares(s, gameState).squares;
    });

    let _squares = [].concat.apply([], destinations);

    return new SquareSet({squares: _squares}).uniq();
  }

  doesntCauseCheck(from, gameState) { 
    return this.filter((to) => {
      let dup = gameState.dup();
      dup.move(from.id, to.id);
      return !dup.inCheck(gameState.currentPlayerNumber);
    });
  }
}

export default SquareSet
