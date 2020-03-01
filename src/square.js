import { exists } from './utils'
import Point from './point'
import PieceFactory from './piece_factory'

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
  }

  /**
   * The square serialized as an object.
   * @return {Object}
   */
  get asJson() {
    let pieceJson = exists(this.piece) ? this.piece.asJson : null;
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      piece: pieceJson 
    };
  }

  /**
   * Is the square occupied?
   * @return {boolean}
   */
  get occupied() {
    return exists(this.piece); 
  }

  /**
   * Is the square unoccupied?
   * @return {boolean}
   */
  get unoccupied() {
    return !exists(this.piece); 
  }

  /**
   * Is the square occupied by player?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  occupiedByPlayer(playerNumber) { 
    return this.occupied && this.piece.playerNumber === playerNumber;
  }

  /**
   * Is the square occupied by the opponent?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  occupiedByOpponentOf(playerNumber) {
    return this.occupied && this.piece.playerNumber != playerNumber;
  }

  /**
   * Is the square unoccupied or occupied by the opponent?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  unoccupiedOrOccupiedByOpponentOf(playerNumber) {
    return this.unoccupied || this.occupiedByOpponentOf(playerNumber);
  }

  /**
   * Is the square occupied by a piece of given type?
   * @param {string} pieceType - The type of the piece.
   * @return {boolean}
   */
  occupiedByPiece(pieceType) {
    return this.occupied && this.piece.type === pieceType;
  }

  /**
   * Is the square not occupied by a piece of given type?
   * @param {string} pieceType - The type of the piece.
   * @return {boolean}
   */
  notOccupiedByPiece(pieceType) {
    return this.occupied && this.piece.type != pieceType;
  }

  /**
   * The point representation of the square's position.
   * @return {Point}
   */
  get point() {
    return new Point(this.x, this.y);
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

  /**
   * A duplicate of the square.
   * @return {Square}
   */
  get dup() {
    let _piece = null;

    if (exists(this.piece)) {
      _piece = this.piece.dup;
    }

    let args = {
      id: this.id,
      x: this.x,
      y: this.y
    };

    let _square = new Square(args);
    _square.piece = _piece;
    return _square;
  }

  // actions

  /**
   * Select the square.
   * Returns false if no piece.
   * @return {boolean}
   */
  select() {
    if (exists(this.piece)) {
      return this.piece.select();
    } else {
      return false;
    }
  }

  /**
   * Deselect the square.
   * Returns false if no piece.
   * @return {boolean}
   */
  deselect() {
    if (exists(this.piece)) {
      return this.piece.deselect();
    } else {
      return false;
    }
  }

  /**
   * Remove the piece from the square.
   * Returns false if no piece.
   * @return {boolean};
   */
  removePiece() {
    if (exists(this.piece)) {
      this.piece = null;
      return true;
    } else {
      return false;
    }
  }

  /** 
   * Add piece to the square.
   * @param {Piece} piece - The piece to be added to the square.
   * @return {boolean};
   */
  addPiece(piece) {
    this.piece = piece;
    return true;
  }

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
