import { exists } from './utils'

/** A promote action */
class Promote {
  /** 
   * Create a promote action
   * @param {Object} args - The properties of the promote action.
   * @param {string} args.pieceType - The type the piece is being promoted to.
   * @param {Match} args.match - The match being played.
   */
  constructor(args) {
    this.pieceType = args.pieceType;
    this.playerNumber = args.playerNumber;
    this.match = args.match
  }

  /**
   * The result of the promotion.
   * @return {Object} - A result with name and message.
   */
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
