import { exists } from './utils'
import SquareSet from './square_set'
import Vector from './vector'

/** A Chess Game State */
class GameState {
  /**
   * Create a game state.
   * @param {Object} args - The properties of the game state.
   * @param {number} args.current_player_number - The number of the current player.
   * @param {Object[]} args.squares - An array of square properties.
   * @param {(number|null)} {args.last_double_step_pawn_id} - The unique id of the last pawn to move two squares. Used for en passant.
   */
  constructor(args) { 
    /** @member {number} */
    this.currentPlayerNumber = args.current_player_number;

    /** @member {number} */
    this.squares = new SquareSet({squares: args.squares});

    /** @member {(number|null)} */
    this.lastDoubleStepPawnId = exists(args.last_double_step_pawn_id) ? args.last_double_step_pawn_id : null;
  }

  /**
   * The game state serialized as simple objects.
   * @return {Object}
   */
  get asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.asJson().squares,
      last_double_step_pawn_id: this.lastDoubleStepPawnId
    };
  }

  /**
   * The square that's selected.
   * @return {(Square|null)}
   */
  get selectedSquare() {
    return this.squares.selected();
  }

  /**
   * Find square with id.
   * @param {number} id - The id of the suqare.
   * @return {(Square|null)}
   */
  findSquare(id) { 
    return this.squares.findById(id);
  }

  /**
   * Is it the player's turn?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  playersTurn(playerNumber) { 
    return this.currentPlayerNumber === playerNumber;
  }

  /**
   * Get the captured square.
   * Normally it's the to square.
   * In en-passant it's the square being passed by the pawn.
   * Can be null if pawn is not passing a piece.
   * @param {Square} from - The origin square.
   * @param {Square} to - The destination square.
   * @return {(Square|null)}
   */
  capturedSquare(from, to) { 
    if (to.occupied) {
      return to;
    } else {
      let enPassant = exists(from) && exists(from.piece) && from.piece.type === 'pawn' && from.piece.enPassantSquare(from, this);
      if (enPassant) {
        return this.squares.findByPieceId(this.lastDoubleStepPawnId);
      } else {
        return null;
      }
    }
  }

  /**
   * If a piece is being captured, get the id of the square it's on.
   * @param {Square} from - The origin square.
   * @param {Square} to - The destination square.
   * @return {(Square|null)}
   */
  capturedSquareId(from, to) { 
    let square = this.capturedSquare(from, to);
    return exists(square) ? square.id : null;
  }

  /**
   * If there's a castle move, return the details of how the rook moves
   * @param {Square} from - The origin square.
   * @param {Square} to - The destination square.
   * @return {Object} Object with fromId and toId 
   */
  rookCastleMove(from, to) { 
    if (from.occupied && from.piece.type === 'king' && from.piece.castle(from, this).includes(to)) {
      let vector = new Vector(from, to);

      let rookFromX = vector.directionX > 0 ? 7 : 0;
      let rookFromY = from.y;
      let rookFrom = this.squares.findByCoordinate(rookFromX, rookFromY);

      let rookToX = vector.directionX > 0 ? (from.x + 1) : (from.x - 1);
      let rookToY = from.y;
      let rookTo = this.squares.findByCoordinate(rookToX, rookToY);

      return { fromId: rookFrom.id, toId: rookTo.id };
    } else {
      return null;
    }
  }

  /**
   * Has the pawn moved to the last rank?
   * @param {Square} from - The origin square.
   * @param {Square} to - The destination square.
   * @return {boolean}
   */
  pawnMoveToLastRank(from, to) { 
    return exists(from.piece) && from.piece.type === 'pawn' && to.lastRank(from.piece.playerNumber);
  }

  /**
   * Is the player in checkmate?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  inCheckmate(playerNumber) {
    return (this.inCheck(playerNumber) || this.nonKingPiecesCannotMove(playerNumber)) && this.kingCannotMove(playerNumber);
  } 

  /**
   * Is the player in check?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  inCheck(playerNumber) { 
    let kingSquare = this.squares.findKingForPlayer(playerNumber);
    let threatenedBy = this.squares.threatenedBy(this.opponentOf(playerNumber), this);
    return threatenedBy.includes(kingSquare);
  }

  /**
   * Are non king pieces owned by the player unable to move?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  nonKingPiecesCannotMove(playerNumber) {
    return this.squares.occupiedByPlayer(playerNumber).excludingPiece('king').every((s) => { 
      return s.piece.destinations(s, this).none();
    });
  }

  /** 
   * Is the player's king unable to move?
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
  kingCannotMove(playerNumber) {
    let kingSquare = this.squares.findKingForPlayer(playerNumber);
    let destinations = kingSquare.piece.destinations(kingSquare, this);
    return destinations.every((d) => {
      let duplicate = this.dup;
      duplicate.move(kingSquare.id, d.id);
      return duplicate.inCheck(playerNumber);
    });
  }

  /**
   * The winner of the game.
   * Returns null if no winner.
   * @return {(number|null)}
   */
  get winner() {
    if (this.inCheckmate(1)) {
      return 2;
    } else if (this.inCheckmate(2)) {
      return 1;
    } else {
      return null;
    }
  }

  /**
   * Duplicate the game state.
   * @return {GameState}
   */
  get dup() {
    return new GameState({
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.dup,
      last_double_step_pawn_id: this.lastDoubleStepPawnId
    });
  }

  /**
   * Get the opponent of the player.
   * @return {number}
   */
  opponentOf(playerNumber) { 
    return playerNumber === 1 ? 2 : 1;
  }

  /** 
   * Get the opponent of the current player.
   * @return {number}
   */
  get opponent() {
    return this.opponentOf(this.currentPlayerNumber);
  }

  // actions

  /**
   * Perform a simple move.
   * @param {Square} from - The origin square.
   * @param {Square} to - The destination square.
   * @param {Square} captured - The captured piece's square.
   * @return {boolean}
   */
  performMove(from, to, captured) { 
    if (from.id != to.id) {
      if (exists(captured)) {
        captured.removePiece();
      }
      let fromPiece = from.piece;
      to.addPiece(fromPiece);
      from.removePiece();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Perform a complete move.
   * @param {string} fromId - The origin square id.
   * @param {string} toId - The destination square id.
   * @return {boolean}
   */
  move(fromId, toId) { 
    let from = this.squares.findById(fromId);
    let to = this.squares.findById(toId);

    if (exists(from) && exists(to)) {
      let rookCastleMove = this.rookCastleMove(from, to);

      if (exists(rookCastleMove)) {
        let rookFrom = this.squares.findById(rookCastleMove.fromId);
        let rookTo = this.squares.findById(rookCastleMove.toId);
        this.performMove(rookFrom, rookTo, null);
      }
    
      let capturedSquare = this.capturedSquare(from, to);
      this.performMove(from, to, capturedSquare);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Select a piece on the square.
   * @param {string} squareId - The id of the square.
   * @return {boolean}
   */
  selectPiece(squareId) {
    let square = this.findSquare(squareId); 
    if (exists(square)) {
      return square.select();
    } else {
      return false;
    }
  }

  /**
   * Deselect a piece on the square.
   * @param {string} squareId - The id of the square.
   * @return {boolean}
   */
  deselectPiece(squareId) {
    let square = this.findSquare(squareId);
    if (exists(square)) {
      return square.deselect();
    } else {
      return false;
    }
  }

  /**
   * Promote a piece on the square.
   * @param {string} squareId - The id of the square.
   * @param {string} pieceType - The type of piece to promote to. (queen|rook|bishop|knight) 
   */
  promote(squareId, pieceType) {
    let square = this.findSquare(squareId);
    if (exists(square)) {
      return square.promote(pieceType);
    } else {
      return false;
    }
  }

  /**
   * Pass the turn to the other player.
   * @return {boolean}
   */
  passTurn() {
    if (this.currentPlayerNumber == 1) {
      this.currentPlayerNumber = 2;
    } else {
      this.currentPlayerNumber = 1;
    }
    return true;
  }
}

export default GameState
