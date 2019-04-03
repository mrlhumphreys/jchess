import exists from './exists'
import SquareSet from './square_set'
import Vector from './vector'
import Move from './move'

class GameState {
  constructor(args) { 
    this.currentPlayerNumber = args.current_player_number;
    this.squares = new SquareSet({squares: args.squares});
    this.lastDoubleStepPawnId = args.last_double_step_pawn_id;
  }

  asJson() {
    return {
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.asJson().squares,
      last_double_step_pawn_id: this.lastDoubleStepPawnId
    };
  }

  selectedSquare() {
    return this.squares.selectedSquare();
  }

  findSquare(id) { 
    return this.squares.findSquare(id);
  }

  playersTurn(playerNumber) { 
    return this.currentPlayerNumber == playerNumber;
  }

  canMoveFrom(square) { 
    let move = new Move({from: square, gameState: this});
    return move.possible();
  }

  canMove(from, to) { 
    let move = new Move({from: from, to: to, gameState: this});
    return move.valid();
  }

  capturedSquare(from, to) { 
    if (to.occupied()) {
      return to;
    } else {
      let enPassant = exists(from) && exists(from.piece) && from.piece.type == 'pawn' && from.piece.enPassantSquare(from, this);
      if (enPassant) {
        return this.squares.findSquareByPieceId(this.lastDoubleStepPawnId);
      } else {
        return null;
      }
    }
  }

  capturedSquareId(from, to) { 
    let square = this.capturedSquare(from, to);
    return exists(square) ? square.id : null;
  }

  rookCastleMove(from, to) { 
    if (from.occupied() && from.piece.type == 'king' && from.piece.castle(from, this).includes(to)) {
      let vector = new Vector(from, to);

      let rookFromX = vector.directionX() > 0 ? 7 : 0;
      let rookFromY = from.y;
      let rookFrom = this.squares.findSquareByXandY(rookFromX, rookFromY);

      let rookToX = vector.directionX() > 0 ? (from.x + 1) : (from.x - 1);
      let rookToY = from.y;
      let rookTo = this.squares.findSquareByXandY(rookToX, rookToY);

      return { fromId: rookFrom.id, toId: rookTo.id };
    } else {
      return null;
    }
  }

  pawnMoveToLastRank(from, to) { 
    return exists(from.piece) && from.piece.type == 'pawn' && to.lastRank(from.piece.playerNumber);
  }

  inCheck(playerNumber) { 
    let kingSquare = this.squares.findKingForPlayer(playerNumber);
    let threatenedBy = this.squares.threatenedBy(this.opponentOf(playerNumber), this);
    return threatenedBy.includes(kingSquare);
  }

  inCheckmate(playerNumber) {

  } 

  dup() {
    return new GameState({
      current_player_number: this.currentPlayerNumber,
      squares: this.squares.dup(),
      last_double_step_pawn_id: this.lastDoubleStepPawnId
    });
  }


  opponentOf(playerNumber) { 
    return playerNumber == 1 ? 2 : 1;
  }

  opponent() {
    return this.opponentOf(this.currentPlayerNumber);
  }

  // actions

  performMove(from, to, captured) { 
    if (from.id != to.id) {
      if (exists(captured)) {
        captured.removePiece();
      }
      let fromPiece = from.piece;
      to.addPiece(fromPiece);
      from.removePiece();
    }
  }

  move(fromId, toId) { 
    let from = this.squares.findSquare(fromId);
    let to = this.squares.findSquare(toId);

    let rookCastleMove = this.rookCastleMove(from, to);

    if (exists(rookCastleMove)) {
      let rookFrom = this.squares.findSquare(rookCastleMove.fromId);
      let rookTo = this.squares.findSquare(rookCastleMove.toId);
      this.performMove(rookFrom, rookTo, null);
    }
    
    let capturedSquare = this.capturedSquare(from, to);
    this.performMove(from, to, capturedSquare);
  }

  selectPiece(squareId) {
    let square = this.findSquare(squareId); 
    if (exists(square)) {
      square.select();
    }
  }

  deselectPiece(squareId) {
    let square = this.findSquare(squareId);
    if (exists(square)) {
      square.deselect();
    }
  }

  promote(squareId, pieceType) {
    let square = this.findSquare(squareId);
    if (exists(square)) {
      square.promote(pieceType);
    }
  }
}

export default GameState
