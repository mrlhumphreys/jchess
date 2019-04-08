import Square from '../src/square'
import Point from '../src/point'
import Rook from '../src/rook'
import Queen from '../src/queen'

describe('Square', () => {
  describe('asJson', () => {
    it('must return square as json', () => {
      let square = new Square({ id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } });
      expect(square.asJson).toEqual({
        id: 'a8',
        x: 0,
        y: 0,
        piece: {
          has_moved: false,
          id: 1,
          player_number: 2,
          selected: false,
          type: 'rook'
        } 
      }); 
    });

    it('returns null for piece', () => {
      let square = new Square({ id: 'a8', x: 0, y: 0, piece: null });
      expect(square.asJson).toEqual({
        id: 'a8',
        x: 0,
        y: 0,
        piece: null 
      });
    });
  });

  describe('occupied', () => {
    it('must return true if there is a piece', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.occupied).toBe(true);
    });

    it('must return false if there is no piece', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.occupied).toBe(false);
    });
  });

  describe('unoccupied', () => {
    it('must return true if there is no piece', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});

      expect(square.unoccupied).toBe(true);
    });

    it('must return false if there is a piece', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: piece});

      expect(square.unoccupied).toBe(false);
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

      expect(square.point.eq(point)).toBe(true);
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

      let dup = square.dup;

      expect(dup.constructorName).toEqual('Square');
      expect(dup.x).toEqual(0);
      expect(dup.y).toEqual(0);
    });
  });

  describe('select', () => {
    describe('with a piece', () => {
      it('must select the piece', () => {
        let square = new Square({id: 'a1', x: 0, y: 0, piece: { id: 1, player_number: 1, type: 'pawn', selected: false }});
        square.select()
        expect(square.piece.selected).toBe(true);
      });
    });

    describe('without a piece', () => {
      it('must do nothing', () => {
        let square = new Square({id: 'a1', x: 0, y: 0, piece: null});
        square.select()
        expect(square.piece).toBe(null);
      });
    });
  });

  describe('deselect', () => {
    describe('with a piece', () => {
      it('must deselect the piece', () => {
        let square = new Square({id: 'a1', x: 0, y: 0, piece: { id: 1, player_number: 1, type: 'pawn', selected: true }});
        square.deselect()
        expect(square.piece.selected).toBe(false);
      });
    });

    describe('without a piece', () => {
      it('must do nothing', () => {
        let square = new Square({id: 'a1', x: 0, y: 0, piece: null});
        square.deselect()
        expect(square.piece).toBe(null);
      });
    });
  });

  describe('removePiece', () => {
    it('must set the piece to null', () => {
      let square = new Square({id: 'a1', x: 0 , y: 0, piece: {id: 1, player_number: 2, type: 'rook'}});
      square.removePiece();
      expect(square.piece).toBe(null);
    });
  });

  describe('addPiece', () => {
    it('must add the piece to the square', () => {
      let square = new Square({id: 'a1', x: 0, y: 0, piece: null});
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      square.addPiece(piece);
      expect(square.piece).toEqual(piece);
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
