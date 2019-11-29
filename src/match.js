import { buildPlayers, buildLastAction, buildNotification, winner, matchAsJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'
import Move from './move'
import Promote from './promote'

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
    let baseJson = matchAsJson(this);
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

    this._clearLastAction();

    let move = new Move({
      touchedId: squareId,
      playerNumber: playerNumber,
      match: this 
    });

    let result = move.result;

    switch (result.name) {
      case 'MoveValid':
        this.gameState.deselectPiece(selectedSquare.id);
        this.gameState.move(selectedSquare.id, squareId);
        this.gameState.passTurn();
        this._addMoveToLastAction(selectedSquare.id, squareId);
        break;
      case 'PawnMovesToLastRank':
        this.gameState.move(selectedSquare.id, squareId);
        this._setupPromotion(selectedSquare.id, squareId);
        break;
      case 'MovePossible':
        this.gameState.selectPiece(squareId);
        break;
      case 'MoveInvalid':
        this._notify(result.message);
        this.gameState.deselectPiece(selectedSquare.id);
        break;
      case 'KingInCheck':
        this._notify(result.message);
        this.gameState.deselectPiece(selectedSquare.id);
        break;
      default:
        this._notify(result.message);
    }
  }

  touchPromotionPiece(pieceType, playerNumber) {
    let promote = new Promote({
      pieceType: pieceType,
      playerNumber: playerNumber,
      match: this
    });

    let result = promote.result;

    switch (result.name) {
      case 'ValidPromotion':
        this.gameState.promote(this.currentMove.toId, pieceType);
        this._addMoveToLastAction(this.currentMove.fromId, this.currentMove.toId, pieceType);
        this._teardownPromotion();
        break;
      default:
        this._notify(result.message);
    }
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
