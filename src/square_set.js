import { exists } from './utils'
import {
  squaresAsJson,
  squaresDup,
  some,
  none,
  every,
  map,
  filter,
  push,
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
  unoccupiedOrOccupiedByOpponent,
  occupiedByPiece,
  excludingPiece,
  unblocked,
  between,
  Vector
} from '@mrlhumphreys/jboardgame';
import Square from './square'

/** A Set of squares */
class SquareSet {
  /** 
   * Create a square set.
   * @param {Object} args - The properties of a square set.
   * @param {Object[]} args.squares - An array of square properties.
   */
  constructor(args) { 
    /** @member {Square[]} */
    this.squares = args.squares.filter(function(s) { return s !== undefined; }).map(function(s) {
      if (s.constructorName === 'Square') {
        return s;
      } else {
        return new Square(s);
      }
    });

    /** @member {Function} */
    this.asJson = squaresAsJson; 

    /** @member {Function} */
    this.dup = squaresDup;

    /** @member {Function} */
    this.some = some;

    /** @member {Function} */
    this.none = none;

    /** @member {Function} */
    this.every = every;

    /** @member {Function} */
    this.map = map;

    /** @member {Function} */
    this.filter = filter;

    /** @member {Function} */
    this.push = push;

    /** @member {Function} */
    this.concat = concat;

    /** @member {Function} */
    this.difference = difference;

    /** @member {Function} */
    this.intersection = intersection;

    /** @member {Function} */
    this.uniq = uniq;

    /** @member {Function} */
    this.length = length;

    /** @member {Function} */
    this.includes = includes;

    /** @member {Function} */
    this.excludes = excludes;

    /** @member {Function} */
    this.first = first;

    /** @member {Function} */
    this.selected = selected;

    /** @member {Function} */
    this.findById = findById;

    /** @member {Function} */
    this.findByCoordinate = findByCoordinate;

    /** @member {Function} */
    this.findByPieceId = findByPieceId;

    /** @member {Function} */
    this.inRange = inRange;

    /** @member {Function} */
    this.atRange = atRange;

    /** @member {Function} */
    this.inDirection = inDirection;

    /** @member {Function} */
    this.orthogonal = orthogonal;

    /** @member {Function} */
    this.diagonal = diagonal;

    /** @member {Function} */
    this.sideways = sideways;

    /** @member {Function} */
    this.orthogonalOrDiagonal = orthogonalOrDiagonal;

    /** @member {Function} */
    this.notOrthogonalOrDiagonal = notOrthogonalOrDiagonal;

    /** @member {Function} */
    this.unoccupied = unoccupied;

    /** @member {Function} */
    this.occupiedByPlayer = occupiedByPlayer;

    /** @member {Function} */
    this.occupiedByOpponentOf = occupiedByOpponentOf;

    /** @member {Function} */
    this.unoccupiedOrOccupiedByOpponent = unoccupiedOrOccupiedByOpponent;

    /** @member {Function} */
    this.occupiedByPiece = occupiedByPiece;

    /** @member {Function} */
    this.excludingPiece = excludingPiece;
    
    /** @member {Function} */
    this.unblocked = unblocked;

    /** @member {Function} */
    this.between = between;
  }

  /**
   * Clone the SquareSet
   * @return {SquareSet}
   */
  clone() {
    return new SquareSet({
      squares: this.squares.map((s) => { return s.clone(); })
    });
  }

  // finders

  /**
   * Find the square with the king owned by the player.
   * @param {number} playerNumber - The number of the player.
   * @return {(Square|null)}
   */
  findKingForPlayer(playerNumber) { 
    return this.occupiedByPiece('king').occupiedByPlayer(playerNumber).first();
  }

  // filters

  /**
   * Filter all squares with pieces that have not moved.
   * @return {SquareSet}
   */
  get unmoved() {
    return this.filter(function(s) {
      return exists(s.piece) && s.piece.hasNotMoved;
    });
  }

  /**
   * Filter all squares threatened by player.
   * @param {number} playerNumber - The number of the player.
   * @param {GameState} gameState - The games state.
   * @return {SquareSet}
   */
  threatenedBy(playerNumber, gameState) { 
    let destinations = this.occupiedByPlayer(playerNumber).excludingPiece('king').map((s) => {
      return s.piece.captureSquares(s, gameState).squares;
    });

    let _squares = [].concat.apply([], destinations);

    return new SquareSet({squares: _squares}).uniq();
  }

  /**
   * Filter all squares that doesn't cause check.
   * @param {Square} from - The square the piece is moving from.
   * @param {GameState} gameState - The state of the game.
   * @return {SquareSet}
   */
  doesntCauseCheck(from, gameState) { 
    return this.filter((to) => {
      let dup = gameState.dup;
      dup.move(from.id, to.id);
      return !dup.inCheck(gameState.currentPlayerNumber);
    });
  }
}

export default SquareSet
