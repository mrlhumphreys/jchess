import Piece from '../../src/pieces/piece'
import Rook from '../../src/pieces/rook'

describe("Piece", () => {
  describe('asJson', () => {
    it('must return a piece as json', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn'});
      expect(piece.asJson).toEqual({
        player_number: 0,
        selected: false,
        id: 0,
        has_moved: false,
        type: 'unicorn'
      });
    });
  });

  describe("canMoveFrom", () => {
    it('must depend on destinations', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn'});
      let mock = {};
      let destinations = piece.destinations(mock, mock);
      let canMoveFrom = piece.canMoveFrom(mock, mock);

      expect(canMoveFrom).toEqual(destinations.some());
    });
  });

  describe("canMove", () => {
    it('must depend on destinations', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn'});
      let mock = {};
      let destinations = piece.destinations(mock, mock);
      let canMove = piece.canMove(mock, mock, mock);

      expect(canMove).toEqual(destinations.includes(mock));
    });
  });

  describe("destinations", () => {
    it('must be empty array', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn'});
      let mock = {};
      let destinations = piece.destinations(mock, mock);

      expect(destinations.none()).toBe(true);
    });
  });

  describe("captureSquares", () => {
    it('must depend on destinations', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn'});
      let mock = {};
      let destinations = piece.destinations(mock, mock);
      let captureSquares = piece.captureSquares(mock, mock);

      expect(destinations).toEqual(captureSquares);
    });
  });

  describe("hasNotMoved", () => {
    it('must be true if piece has not moved', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn', has_moved: false});

      expect(piece.hasNotMoved).toBe(true);
    });

    it('must be false if piece has moved', () => {
      let piece = new Piece({id: 0, player_number: 0, type: 'unicorn', has_moved: true});

      expect(piece.hasNotMoved).toBe(false);
    });
  });

  describe("opponent", () => {
    it('must be 2 if player is 1', () => {
      let piece = new Piece({id: 0, player_number: 1, type: 'unicorn'});

      expect(piece.opponent).toEqual(2);
    });

    it('must be 1 if player is 2', () => {
      let piece = new Piece({id: 0, player_number: 2, type: 'unicorn'});

      expect(piece.opponent).toEqual(1);
    });
  });

  describe("dup", () => {
    it('must return another piece with the same attributes', () => {
      let piece = new Piece({id: 1, player_number: 1, type: 'pawn'});
      let dup = piece.dup;

      expect(piece.id).toEqual(dup.id);
      expect(piece.playerNumber).toEqual(dup.playerNumber);
      expect(piece.constructor).toEqual(dup.constructor);
    });
  });

  describe('select', () => {
    it('must mark the piece as selected', () => {
      let piece = new Piece({id: 1, player_number: 1, selected: false}); 
      piece.select();
      expect(piece.selected).toBe(true);
    });
  });

  describe('deselect', () => {
    it('must mark the piece as not selected', () => {
      let piece = new Piece({id: 1, player_number: 1, selected: true}); 
      piece.deselect();
      expect(piece.selected).toBe(false);
    });
  });
});
