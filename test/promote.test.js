import fixtures from './fixtures'
import Promote from '../src/promote'

describe('Promote', () => {
  describe('when there is a winner', () => {
    it('must return a game over result', () => {
      let match = fixtures('winnerMatch');
      let promote = new Promote({pieceType: 'queen', playerNumber: 1, match: match});
      let result = promote.result;

      expect(result.name).toEqual('GameOver');
      expect(result.message).toEqual('Game is over.');
    });
  });

  describe('when it is not the players turn', () => {
    it('must return a not players turn result', () => {
      let match = fixtures('match');
      let promote = new Promote({pieceType: 'queen', playerNumber: 2, match: match});
      let result = promote.result;

      expect(result.name).toEqual('NotPlayersTurn');
      expect(result.message).toEqual('It is not your turn.');
    });
  });

  describe('when not in promotion mode', () => {
    it('must return a no piece to promote result', () => {
      let match = fixtures('selectedMatch');
      let promote = new Promote({pieceType: 'queen', playerNumber: 1, match: match});
      let result = promote.result;

      expect(result.name).toEqual('NoPieceToPromote');
      expect(result.message).toEqual('There is no piece to promote.');
    });
  });

  describe('when piece type is invalid', () => {
    it('must return an invalid promotion piece type result', () => {
      let match = fixtures('promotionMatch');
      let promote = new Promote({pieceType: 'pawn', playerNumber: 1, match: match});
      let result = promote.result;

      expect(result.name).toEqual('InvalidPromotionPiece');
      expect(result.message).toEqual('Pawn cannot promote to that piece.');
    });
  });

  describe('when piece type is valid', () => {
    it('must return a promotion valid result', () => {
      let match = fixtures('promotionMatch');
      let promote = new Promote({pieceType: 'queen', playerNumber: 1, match: match});
      let result = promote.result;

      expect(result.name).toEqual('ValidPromotion');
      expect(result.message).toEqual('');
    });
  });
});
