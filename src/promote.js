import { exists } from './utils'

class Promote {
  constructor(args) {
    this.pieceType = args.pieceType;
    this.playerNumber = args.playerNumber;
    this.match = args.match
  }

  get result() {
    if (exists(this.match.winner)) {
      return { name: 'GameOver', message: 'Game is over.' };
    }

    if (!this.match.gameState.playersTurn(this.playerNumber)) {
      return { name: 'NotPlayersTurn', message: 'It is not your turn.' };
    }

    if (!this.match.promotion) {
      return { name: 'NoPieceToPromote', message: 'There is no piece to promote.' };
    }

    if (!this._validPromotionPiece) {
      return { name: 'InvalidPromotionPiece', message: 'Pawn cannot promote to that piece.' };
    }

    return { name: 'ValidPromotion', message: '' };
  }

  get _validPromotionPiece() {
    let validPromotionPieces = ['queen', 'rook', 'bishop', 'knight'];
    return validPromotionPieces.includes(this.pieceType);
  }
}

export default Promote
