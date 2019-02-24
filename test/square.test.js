import Square from '../src/square'
import Point from '../src/point'
import Rook from '../src/rook'

describe('Square', () => {
  describe('occupied', () => {
    it('must return true if there is a piece', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.occupied()).toBe(true);
    });

    it('must return false if there is no piece', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.occupied()).toBe(false);
    });
  });

  describe('unoccupied', () => {
    it('must return true if there is no piece', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.unoccupied()).toBe(true);
    });

    it('must return false if there is a piece', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.unoccupied()).toBe(false);
    });
  });

  describe('occupiedBy', () => {
    it('must return true if the piece is owned by the player', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.occupiedBy(2)).toBe(true);
    });

    it('must return false if the piece is not owned by the player', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.occupiedBy(1)).toBe(false);
    });

    it('must return false if there is no piece', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.occupiedBy(2)).toBe(false);
    });
  });

  describe('point', () => {
    it('must return a point object wit the same x and y co-ordinates', () => {
      let square = new Square({id: 'c5', x: 2, y: 3, piece: null});
      let point = new Point(2, 3);

      expect(square.point().eq(point)).toBe(true);
    });
  });

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

  describe('dup', () => {
    it('must return a square with the same attributes', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      let dup = square.dup();

      expect(dup.constructorName).toEqual('Square');
      expect(dup.x).toEqual(0);
      expect(dup.y).toEqual(0);
    });
  });
});
