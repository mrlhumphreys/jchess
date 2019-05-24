import exists from './exists'
import GameState from './game_state'
import Move from './move'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.currentMove = exists(args.current_move) ? args.current_move : {};
    this.promotion = exists(args.promotion) ? args.promotion : false;
    this.lastAction = exists(args.last_action) ? args.last_action : {};
    this.notification = exists(args.notification) ? args.notification : this._defaultMessage;
  }

  get asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson,
      players: this.players,
      winner: this.winner,
      current_move: this.currentMove,
      promotion: this.promotion,
      last_action: this.lastAction,
      notification: this.notification
    };
  }

  // getters

  capturedSquareId(from, to)  {
    return this.gameState.capturedSquareId(from, to);
  }

  rookCastleMove(from, to) { 
    return this.gameState.rookCastleMove(from, to);
  }

  pawnMoveToLastRank(from, to) { 
    return this.gameState.pawnMoveToLastRank(from, to);
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
            if (this.pawnMoveToLastRank(selectedSquare, touchedSquare)) {
              this.gameState.move(selectedSquare.id, touchedSquare.id);
              this._setupPromotion(selectedSquare.id, touchedSquare.id);
            } else {
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
  get _turnMessage() {
    let currentPlayerIndex = this.gameState.currentPlayerNumber - 1;
    let currentPlayerName = this.players[currentPlayerIndex].name;
    return `${currentPlayerName} to move`;
  }

  get _winnerMessage() {
    let winnerIndex = this.winner - 1;
    let winnerName = this.players[winnerIndex].name;
    return `${winnerName} wins`;
  }

  get _defaultMessage() {
    if (exists(this.winner)) {
      return this._winnerMessage;
    } else {
      return this._turnMessage;
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
