import { exists } from './utils'
import { Point } from '@mrlhumphreys/jboardgame'
import PieceFactory from './piece_factory'

import {
  squareAsJson,
  squareDup,
  squareOccupied,
  squareUnoccupied,
  squareOccupiedByPlayer,
  squareOccupiedByOpponentOf,
  squareUnoccupiedOrOccupiedByOpponentOf,
  squareOccupiedByPiece,
  squareNotOccupiedByPiece,
  point,
  select,
  deselect,
  addPiece,
  removePiece
} from '@mrlhumphreys/jboardgame';

/** A square on a grid */
class Square {
  /** 
   * Create a square 
   * @param {Object} args - The properties of the square.
   * @param {string} args.id - The unique identifier of the square.
   * @param {number} args.x - The x co-ordinate of the square.
   * @param {number} args.y - The y co-ordinate of the square.
   * @param {(Object|null)} args.piece - The piece on the square.
   */
  constructor(args) { 
    /** @member {string} */
    this.constructorName = 'Square';

    /** @member {string} */
    this.id = args.id;

    /** @member {number} */
    this.x = args.x;

    /** @member {number} */
    this.y = args.y;

    if (!exists(args.piece)) {
      this.piece = null;
    } else {
      let pieceFactory = new PieceFactory(args.piece);
      /** @member {(Piece|null)} */
      this.piece = pieceFactory.build;
    }

    this.asJson = squareAsJson;
    this.dup = squareDup;
    this.occupied = squareOccupied;
    this.unoccupied = squareUnoccupied;
    this.occupiedByPlayer = squareOccupiedByPlayer;
    this.occupiedByOpponentOf = squareOccupiedByOpponentOf;
    this.unoccupiedOrOccupiedByOpponentOf = squareUnoccupiedOrOccupiedByOpponentOf;
    this.occupiedByPiece = squareOccupiedByPiece;
    this.notOccupiedByPiece = squareNotOccupiedByPiece;
    this.point = point;
    this.select = select;
    this.deselect = deselect;
    this.addPiece = addPiece;
    this.removePiece = removePiece;
  }

  /**
   * Clone the square
   * @return {Square}
   */
  clone() {
    return new Square({
      id: this.id,
      x: this.x,
      y: this.y,
      piece: exists(this.piece) ? this.piece.clone() : null
    });
  }

  /**
   * Is the square in the pawn row for that player?
   * @param {number} playerNumber
   * @return {boolean}
   */
  startingFor(playerNumber) { 
    return this.rankNumber(playerNumber) === 2;
  }

  /**
   * The rank number of the square for that player.
   * @param {number} playerNumber
   * @return {number}
   */
  rankNumber(playerNumber) { 
    if (playerNumber === 1) {
      return (8 - this.y);
    } else {
      return (this.y + 1);
    }
  }

  /**
   * Is the square in the last rank for that player?
   * @param {number} playerNumber
   * @return {boolean}
   */
  lastRank(playerNumber) { 
    return this.rankNumber(playerNumber) === 8;
  }

  // actions

  /**
   * Promote the piece to the specified type.
   * @param {string} pieceType - What the piece will be promoted to.
   * @return {boolean}
   */
  promote(pieceType) {
    if (exists(this.piece)) {
      let args = Object.assign({}, this.piece.asJson, { type: pieceType });
      let pieceFactory = new PieceFactory(args);
      this.piece = pieceFactory.build;
      return true;
    } else {
      return false;
    }
  }
}

export default Square
