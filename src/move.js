import { exists } from './utils'

class Move {
  constructor(args) {
    this.touchedId = args.touchedId;
    this.playerNumber = args.playerNumber;
    this.match = args.match;
  }

  get result() {
    if (exists(this.match.winner)) {
      return { name: 'GameOver', message: 'Game is over.' };
    }

    if (!this.match.gameState.playersTurn(this.playerNumber)) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (exists(this._selectedSquare)) {
      return this._selectedResult;
    } else {
      return this._unselectedResult;
    }
  }

  get _selectedResult() {
    if (this._putsKingInCheck) {
      return { name: 'KingInCheck', message: 'Move puts king in check.' };
    } else if (this._pawnMovesToLastRank) {
      return { name: 'PawnMovesToLastRank', message: 'Pawn can promote.' };
    } else if (!this._selectedSquare.piece.canMove(this._selectedSquare, this._touched, this.match.gameState)) {
      return { name: 'MoveInvalid', message: 'Piece cannot move.' };
    } else {
      return { name: 'MoveValid', message: '' };
    }
  }

  get _unselectedResult() {
    if (!exists(this._touched)) {
      return { name: 'SquareNotFound', message: 'Square does not exist.' }; 
    } else if (!exists(this._touched.piece)) {
      return { name: 'EmptySquare', message: 'Square is empty.' }; 
    } else if (!this._touched.occupiedByPlayer(this.playerNumber)) {
      return { name: 'PieceOwnershipMismatch', message: 'Piece is owned by opponent.' }; 
    } else if (!this._touched.piece.canMoveFrom(this._touched, this.match.gameState)) {
      return { name: 'MoveImpossible', message: 'Piece cannot move.' };
    } else {
      return { name: 'MovePossible', message: '' };
    }
  }

  get _putsKingInCheck() {
    let dup = this.match.gameState.dup;
    dup.move(this._selectedSquare.id, this.touchedId);
    return dup.inCheck(this.match.gameState.currentPlayerNumber);
  }

  get _pawnMovesToLastRank() {
    return this.match.gameState.pawnMoveToLastRank(this._selectedSquare, this._touched);
  }

  get _touched() {
    return this.match.gameState.findSquare(this.touchedId);
  }

  get _selectedSquare() {
    return this.match.gameState.selectedSquare;
  }
}

export default Move
