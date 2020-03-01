import { buildPlayers, buildLastAction, buildNotification, winner, matchAsJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils'
import GameState from './game_state'
import Move from './move'
import Promote from './promote'

/** A Chess match between two players */
class Match {
  /** Create a chess match.
   * @param {Object} args - The properties of the match.
   * @param {number} args.id - The unique identifier of the match.
   * @param {Object} args.game_state - The properties of the game state.
   * @param {Object[]} args.players - The properties of the players of the game.
   * @param {Object} [args.current_move={}] - Details of the current move.
   * @param {Object} [args.promotion=false] - Has a promotion move just been made? 
   * @param {Object} [args.last_action=null] - The last action taken. Has kind and data attributes. 
   * @param {string} [args.notification} - A notification to the player.
   */
  constructor(args) { 
    /** @member {number} */
    this.id = args.id;

    /** @member {GameState} */
    this.gameState = new GameState(args.game_state);

    /** @member {Player[]} */
    this.players = buildPlayers(args.players);

    /** @member {Object} */
    this.currentMove = exists(args.current_move) ? args.current_move : {};

    /** @member {boolean} */
    this.promotion = exists(args.promotion) ? args.promotion : false;

    /** @member {Object} */
    this.lastAction = buildLastAction(args.last_action);

    /** @member {string} */
    this.notification = buildNotification(this, args.notification);
  }

  /**
   * The match serialized as a series of objects.
   * @return {Object}
   */
  get asJson() {
    let baseJson = matchAsJson(this);
    let extraJson = {
      current_move: this.currentMove,
      promotion: this.promotion
    };
    return Object.assign(baseJson, extraJson);
  }

  /**
   * The winner of the match.
   * Returns null if no winner.
   * @return {(number|null)}
   */
  get winner() {
    return winner(this);
  }

  // user actions

  /**
   * Touch a square to select a piece or move a piece.
   * @param {string} squareId - The id of the square.
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
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
        return true;
      case 'PawnMovesToLastRank':
        this.gameState.move(selectedSquare.id, squareId);
        this._setupPromotion(selectedSquare.id, squareId);
        return true;
      case 'MovePossible':
        this.gameState.selectPiece(squareId);
        return true;
      case 'MoveInvalid':
        this._notify(result.message);
        this.gameState.deselectPiece(selectedSquare.id);
        return false;
      case 'KingInCheck':
        this._notify(result.message);
        this.gameState.deselectPiece(selectedSquare.id);
        return false;
      default:
        this._notify(result.message);
        return false;
    }
  }

  /**
   * Touch the promotion piece to promote a piece to that type.
   * @param {string} pieceType - The type of piece to promote to (queen|rook|bishop|knight)
   * @param {number} playerNumber - The number of the player.
   * @return {boolean}
   */
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
        return true;
      default:
        this._notify(result.message);
        return false;
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
