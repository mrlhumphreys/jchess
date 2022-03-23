import Square from '../src/square'
import Point from '../src/point'
import Rook from '../src/pieces/rook'
import Queen from '../src/pieces/queen'

describe('Square', () => {
  describe('startingFor', () => {
    it('must return true if the rank is 2', () => {
      let square = new Square({id: 'a7', x: 0, y: 1, piece: null});

      expect(square.startingFor(2)).toBe(true);
    });

    it('must return false if the rank is not 2', () => {
      let square = new Square({id: 'a6', x: 0, y: 2, piece: null});

      expect(square.startingFor(2)).toBe(false);
    });
  });

  describe('rankNumber', () => {
    it('must return 8 minus y if the player is 1', () => {
      let square = new Square({id: 'b5', x: 1, y: 3, piece: null});

      expect(square.rankNumber(1)).toEqual(5);
    });

    it('must return y plus 1 if the player is 2', () => {
      let square = new Square({id: 'b5', x: 1, y: 3, piece: null});

      expect(square.rankNumber(2)).toEqual(4);
    });
  });

  describe('lastRank', () => {
    it('must return true if the rank is 8', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.lastRank(1)).toBe(true);
    });

    it('must return false if the rank is not 8', () => {
      let square = new Square({id: 'a7', x: 0, y: 1, piece: null});

      expect(square.lastRank(1)).toBe(false);
    });
  });

  describe('promote', () => {
    describe('with a piece', () => {
      it('must change the piece type', () => {
        let square = new Square({id: 'a8', x: 0, y: 0, piece: { id: 17, player_number: 1, type: 'pawn' }});
        square.promote('queen');
        expect(square.piece.constructor).toEqual(Queen);
        expect(square.piece.type).toEqual('queen');
        expect(square.piece.id).toEqual(17);
      });
    });

    describe('without a piece', () => {
      it('must not do anything', () => {
        let square = new Square({id: 'a8', x: 0, y: 0, piece: null});
        square.promote('queen');
        expect(square.piece).toBe(null);
      });
    });
  });
});
