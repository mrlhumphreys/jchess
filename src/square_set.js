import { exists } from './utils'
import {
  squaresAsJson,
  some,
  none,
  every,
  map,
  filter,
  concat,
  difference,
  intersection,
  uniq,
  length,
  includes,
  excludes,
  first,
  selected,
  findById,
  findByCoordinate,
  findByPieceId,
  inRange,
  atRange,
  inDirection,
  orthogonal,
  diagonal,
  sideways,
  orthogonalOrDiagonal,
  notOrthogonalOrDiagonal,
  unoccupied,
  occupiedByPlayer,
  occupiedByOpponentOf,
  unblocked,
  between
} from '@mrlhumphreys/jboardgame';
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
    this.asJson = squaresAsJson; 
    this.some = some;
    this.none = none;
    this.every = every;
    this.map = map;
    this.filter = filter;
    this.concat = concat;
    this.difference = difference;
    this.intersection = intersection;
    this.uniq = uniq;
    this.length = length;
    this.includes = includes;
    this.excludes = excludes;
    this.first = first;
    this.selected = selected;
    this.findById = findById;
    this.findByCoordinate = findByCoordinate;
    this.findByPieceId = findByPieceId;
    this.inRange = inRange;
    this.atRange = atRange;
    this.inDirection = inDirection;
    this.orthogonal = orthogonal;
    this.diagonal = diagonal;
    this.sideways = sideways;
    this.orthogonalOrDiagonal = orthogonalOrDiagonal;
    this.notOrthogonalOrDiagonal = notOrthogonalOrDiagonal;
    this.unoccupied = unoccupied;
    this.occupiedByPlayer = occupiedByPlayer;
    this.occupiedByOpponentOf = occupiedByOpponentOf;
    this.unblocked = unblocked;
    this.between = between;
  }

  get dup() {
    let _squares = this.squares.map(function(s) { return s.dup; });
    return new SquareSet({squares: _squares});
  }

  // enumerable functions

  // enumerable operations

  push(square) { 
    if (exists(square)) {
      this.squares.push(square);
      return new SquareSet({squares: this.squares});
    } else {
      return this;
    }
  }

  // finders

  findKingForPlayer(playerNumber) { 
    return this.occupiedByPiece('king').occupiedByPlayer(playerNumber).first();
  }

  // filters

  unoccupiedOrOccupiedByOpponent(playerNumber) { 
    return this.filter(function(s) {
      return s.unoccupiedOrOccupiedByOpponentOf(playerNumber);
    });
  }

  occupiedByPiece(pieceType) { 
    return this.filter(function(s) {
      return s.occupiedByPiece(pieceType);
    });
  }

  excludingPiece(pieceType) { 
    return this.filter(function(s) {
      return s.notOccupiedByPiece(pieceType);
    });
  }

  get unmoved() {
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.hasNotMoved;
    });
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
      let dup = gameState.dup;
      dup.move(from.id, to.id);
      return !dup.inCheck(gameState.currentPlayerNumber);
    });
  }
}

export default SquareSet
