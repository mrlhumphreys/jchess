import exists from './exists'
import GameState from './game_state'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.currentMove = exists(args.current_move) ? args.current_move : {};
    this.promotion = exists(args.promotion) ? args.promotion : false;
    this.lastAction = exists(args.last_action) ? args.last_action : {};
  }

  asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson(),
      players: this.players,
      winner: this.winner,
      current_move: this.currentMove,
      promotion: this.promotion,
      last_action: this.lastAction   
    };
  }

  selectedSquare() {
    return this.gameState.selectedSquare();
  }

  findSquare(id) { 
    return this.gameState.findSquare(id);
  }

  currentPlayerName() {
    return this.playersName(this.gameState.currentPlayerNumber);
  }

  playersName(number) { 
    let index = number - 1;
    return this.players[index].name;
  }

  playersTurn(playerNumber) { 
    return this.gameState.playersTurn(playerNumber);
  }

  winnerName() {
    if (this.winner) {
      return this.playersName(this.winner);
    } else {
      return null;
    }
  }

  canMoveFrom(square) { 
    return this.gameState.canMoveFrom(square);
  }

  canMove(from, to) { 
    return this.gameState.canMove(from, to);
  }

  capturedSquareId(from, to)  {
    return this.gameState.capturedSquareId(from, to);
  }

  rookCastleMove(from, to) { 
    return this.gameState.rookCastleMove(from, to);
  }

  pawnMoveToLastRank(from, to) { 
    return this.gameState.pawnMoveToLastRank(from, to);
  }

  // actions

  selectPiece(squareId) {
    this.gameState.selectPiece(squareId);
  }

  deselectPiece(squareId) {
    this.gameState.deselectPiece(squareId);
  }

  move(fromId, toId) {
    this.gameState.move(fromId, toId);
  }

  setupPromotion(fromId, toId) {
    this.currentMove = { fromId: fromId, toId: toId };
    this.promotion = true;
  }

  teardownPromotion() {
    this.currentMove = {};
    this.promotion = false;
  }

  promote(squareId, pieceType) {
    this.gameState.promote(squareId, pieceType);   
  }

  addMoveToLastAction(fromId, toId, pieceType) {
    if (exists(pieceType)) {
      this.lastAction = { kind: 'move', data: { fromId: fromId, toId: toId, pieceType: pieceType } };
    } else {
      this.lastAction = { kind: 'move', data: { fromId: fromId, toId: toId } };
    }
  }

  notify(message) {
    this.lastAction = { kind: 'notification', data: { message : message } };
  }

  // user actions

  touchSquare(squareId, playerNumber) {
    let selectedSquare = this.selectedSquare();
    let touchedSquare = this.findSquare(squareId);

    if (exists(this.winner)) {
      this.notify('Game is over.'); 
    } else if (!this.playersTurn(playerNumber)) {
      this.notify('It is not your turn.');
    } else {
      if (exists(selectedSquare)) {
        if (this.canMove(selectedSquare, touchedSquare)) {
          let dup = this.gameState.dup();
          dup.move(selectedSquare.id, touchedSquare.id);

          if (dup.inCheck(this.gameState.currentPlayerNumber)) {
            this.notify('Move puts king in check.');
          } else {
            if (this.pawnMoveToLastRank(selectedSquare, touchedSquare)) {
              this.move(selectedSquare.id, touchedSquare.id);
              this.setupPromotion(selectedSquare.id, touchedSquare.id);
            } else {
              this.move(selectedSquare.id, touchedSquare.id);
              this.addMoveToLastAction(selectedSquare.id, touchedSquare.id);
            }
          }
        } else {
          this.notify('Invalid move.');
          this.deselectPiece(selectedSquare.id);
        }
      } else {
        if (touchedSquare.unoccupied()) {
          this.notify('The square is empty.');
        } else if (!touchedSquare.occupiedBy(playerNumber)) {
          this.notify('That piece is not yours.');
        } else if (this.canMoveFrom(touchedSquare)) {
          this.selectPiece(touchedSquare.id);
        } else {
          this.notify('Piece cannot move.');
        }
      }
    }
  }

  touchPromotionPiece(pieceType, playerNumber) {
    this.promote(this.currentMove.toId, pieceType);
    this.addMoveToLastAction(this.currentMove.fromId, this.currentMove.toId, pieceType);
    this.teardownPromotion();
  }
}

export default Match
