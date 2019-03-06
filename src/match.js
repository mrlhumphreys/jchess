import GameState from './game_state'

class Match {
  constructor(args) { 
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.currentMove = args.currentMove ? args.currentMove : {};
    this.promotion = args.promotion ? args.promotion : false;
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
}

export default Match
