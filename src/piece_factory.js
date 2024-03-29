import { exists } from './utils'
import Pawn from './pieces/pawn'
import Rook from './pieces/rook'
import Knight from './pieces/knight'
import Bishop from './pieces/bishop'
import Queen from './pieces/queen'
import King from './pieces/king'

/** A piece generator */
class PieceFactory {
  /**
   * Create a Piece Factory
   * @param {Object} args - The properties of the piece.
   * @param {string} args.type - The type of the piece.
   */
  constructor(args) {
    this.args = args;
  } 

  /**
   * Build a piece based on the args type.
   * @return {(Piece|null)}
   */
  get build() {
    if (exists(this.args)) {
      if (this.args.constructorName === 'Piece') {
        return this.args;
      } else {
        switch (this.args.type) {
          case 'pawn':
            return new Pawn(this.args);
          case 'rook':
            return new Rook(this.args);
          case 'knight':
            return new Knight(this.args);
          case 'bishop':
            return new Bishop(this.args);
          case 'queen':
            return new Queen(this.args);
          case 'king':
            return new King(this.args);
          default:
            return null;
        }
      }
    } else {
      return null;
    }
  }
}

export default PieceFactory
