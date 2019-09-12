import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import exists from './exists'
import GameState from './game_state'
import Move from './move'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = buildPlayers(args.players);
    this.currentMove = exists(args.current_move) ? args.current_move : {};
    this.promotion = exists(args.promotion) ? args.promotion : false;
    this.lastAction = buildLastAction(args.last_action);
    this.notification = buildNotification(this, args.notification);
  }

  get asJson() {
    let baseJson = asJson(this);
    let extraJson = {
      current_move: this.currentMove,
      promotion: this.promotion
    };
    return Object.assign(baseJson, extraJson);
  }

  get winner() {
    return winner(this);
  }

  // user actions

  touchSquare(squareId, playerNumber) {
    let selectedSquare = this.gameState.selectedSquare;
    let touchedSquare = this.gameState.findSquare(squareId);

    this._clearLastAction();

    if (exists(this.winner)) {
      this._notify('Game is over.'); 
    } else if (!this.gameState.playersTurn(playerNumber)) {
      this._notify('It is not your turn.');
    } else {
      if (exists(selectedSquare)) {
        let move = new Move({
          fromId: selectedSquare.id,
          toId: touchedSquare.id,
          gameState: this.gameState
        });

        if (move.valid()) {
          let dup = this.gameState.dup;
          dup.move(selectedSquare.id, touchedSquare.id);

          if (dup.inCheck(this.gameState.currentPlayerNumber)) {
            this._notify('Move puts king in check.');
          } else {
            if (this._pawnMoveToLastRank(selectedSquare, touchedSquare)) {
              this.gameState.move(selectedSquare.id, touchedSquare.id);
              this._setupPromotion(selectedSquare.id, touchedSquare.id);
            } else {
              this.gameState.deselectPiece(selectedSquare.id);
              this.gameState.move(selectedSquare.id, touchedSquare.id);
              this.gameState.passTurn();
              this._addMoveToLastAction(selectedSquare.id, touchedSquare.id);
            }
          }
        } else {
          this._notify('Invalid move.');
          this.gameState.deselectPiece(selectedSquare.id);
        }
      } else {
        let move = new Move({
          fromId: touchedSquare.id,
          gameState: this.gameState
        });

        if (touchedSquare.unoccupied) {
          this._notify('The square is empty.');
        } else if (!touchedSquare.occupiedBy(playerNumber)) {
          this._notify('That piece is not yours.');
        } else if (move.possible()) {
          this.gameState.selectPiece(touchedSquare.id);
        } else {
          this._notify('Piece cannot move.');
        }
      }
    }
  }

  touchPromotionPiece(pieceType, playerNumber) {
    this.gameState.promote(this.currentMove.toId, pieceType);
    this._addMoveToLastAction(this.currentMove.fromId, this.currentMove.toId, pieceType);
    this._teardownPromotion();
  }

  // private getters
  
  _pawnMoveToLastRank(from, to) { 
    return this.gameState.pawnMoveToLastRank(from, to);
  }
  
  // private setters

  _setupPromotion(fromId, toId) {
    this.currentMove = { fromId: fromId, toId: toId };
    this.promotion = true;
  }

  _teardownPromotion() {
    this.currentMove = {};
    this.promotion = false;
  }

  _addMoveToLastAction(fromId, toId, pieceType) {
    if (exists(pieceType)) {
      this.lastAction = { kind: 'move', data: { fromId: fromId, toId: toId, pieceType: pieceType } };
    } else {
      this.lastAction = { kind: 'move', data: { fromId: fromId, toId: toId } };
    }
  }

  _clearLastAction() {
    this.lastAction = null;
  }

  _notify(message) {
    this.notification = message;
  }
}

export default Match
