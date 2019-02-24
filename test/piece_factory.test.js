import PieceFactory from '../src/piece_factory'
import Pawn from '../src/pawn'

describe("PieceFactory", () => {
  describe("build", () => {
    describe('with a piece', () => {
      it('must return the piece', () => {
        let args = new Pawn({id: 16, player_number: 2, type: 'pawn'});
        let pieceFactory = new PieceFactory(args);
        let piece = pieceFactory.build();

        expect(piece).toEqual(args);
      });
    });

    describe('with hash of matching type', () => {
      it('must return a new piece with the matching type', () => {
        let args = { id: 16, player_number: 2, type: 'pawn' };
        let pieceFactory = new PieceFactory(args);
        let piece = pieceFactory.build();

        expect(piece.constructorName).toEqual('Piece');
        expect(piece.type).toEqual('pawn');
      });
    });

    describe('with hash of non-matching type', () => {
      it('must return null', () => {
        let args = { id: 16, player_number: 2, type: 'unicorn' };
        let pieceFactory = new PieceFactory(args);
        let piece = pieceFactory.build();

        expect(piece).toBe(null);
      });
    });

    describe('without arguments', () => {
      it('must return null', () => {
        let args = null;
        let pieceFactory = new PieceFactory(args);
        let piece = pieceFactory.build();

        expect(piece).toBe(null);
      });
    });
  });
});
