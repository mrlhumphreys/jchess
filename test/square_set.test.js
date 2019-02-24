import SquareSet from '../src/square_set'
import Square from '../src/square'
import Rook from '../src/rook'
import King from '../src/king'
import Pawn from '../src/pawn'
import Knight from '../src/knight'
import GameState from '../src/game_state'

describe('SquareSet', () => {
  describe('direction', () => {
    it('must be -1 if player 1', () => {
      let squareSet = new SquareSet({squares: []});

      expect(squareSet.direction(1)).toEqual(-1);
    });

    it('must be 1 if player 2', () => {
      let squareSet = new SquareSet({squares: []});

      expect(squareSet.direction(2)).toEqual(1);
    });
  });

  describe('opponent', () => {
    it('must be 2 if player 1', () => {
      let squareSet = new SquareSet({squares: []});

      expect(squareSet.opponent(1)).toEqual(2);
    });

    it('must be 1 if player 2', () => {
      let squareSet = new SquareSet({squares: []});

      expect(squareSet.opponent(2)).toEqual(1);
    });
  });

  describe('dup', () => {
    it('must return another squareSet with the same properties', () => {

    });
  });

  // enumerable

  describe('some', () => {
    describe('with callback', () => {
      it('must return false if there are no matching elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.some(function(square) { return square.y == 3; })).toBe(false);
      });

      it('must return true if there are matching elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.some(function(square) { return square.y == 2; })).toBe(true);
      });
    });

    describe('without callback', () => {
      it('must return false if there are no elements', () => {
        let squareSet = new SquareSet({squares: []});

        expect(squareSet.some()).toBe(false);
      });

      it('must return true if there are some elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.some()).toBe(true);
      });
    });
  });

  describe('none', () => {
    describe('with callback', () => {
      it('must return true if there are no matching elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.none(function(square) { return square.y == 3; })).toBe(true);
      });

      it('must return false if there are matching elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.none(function(square) { return square.y == 2; })).toBe(false);
      });
    });

    describe('without callback', () => {
      it('must return true if there are no elements', () => {
        let squareSet = new SquareSet({squares: []});

        expect(squareSet.none()).toBe(true);
      });

      it('must return false if there are some elements', () => {
        let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
        let squareSet = new SquareSet({squares: [squareA, squareB]});

        expect(squareSet.none()).toBe(false);
      });
    });
  });

  describe('every', () => {
    it('must return true if all elements are matching', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.every(function(square) { return square.y == 2; })).toBe(true);
    });

    it('must return false if some elements are not matching', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.every(function(square) { return square.x == 0 })).toBe(false);
    });
  });

  describe('map', () => {
    it('must return an array of return values from the callback', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.map(function(s) { return s.id; })).toEqual(['a6', 'b6']);;
    });
  });

  describe('filter', () => {
    it('must return matching elements', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});
      let filtered = squareSet.filter(function(s) { return (s.y % 2) == 0; });

      expect(filtered.includes(squareA)).toBe(true);
    });

    it('must not return non-matching elements', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});
      let filtered = squareSet.filter(function(s) { return (s.y % 2) == 0; });

      expect(filtered.includes(squareB)).toBe(false);
    });
  });

  // enumerable operations

  describe('concat', () => {
    it('must combine the two sets', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSetA = new SquareSet({squares: [squareA]});
      let squareSetB = new SquareSet({squares: [squareB]});

      let concatenated = squareSetA.concat(squareSetB);

      expect(concatenated.includes(squareA)).toBe(true);
      expect(concatenated.includes(squareB)).toBe(true);
    });
  });

  describe('diff', () => {
    it('must remove elements in the second set from the first set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSetA = new SquareSet({squares: [squareA, squareB]});
      let squareSetB = new SquareSet({squares: [squareB]});

      let difference = squareSetA.diff(squareSetB);

      expect(difference.includes(squareA)).toBe(true);
      expect(difference.includes(squareB)).toBe(false);
    });
  });

  describe('intersection', () => {
    it('must return a set with elements in both sets', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareC = new Square({id: 'a4', x: 0, y: 4, piece: null});
      let squareSetA = new SquareSet({squares: [squareA, squareB]});
      let squareSetB = new SquareSet({squares: [squareB, squareC]});

      let intersection = squareSetA.intersection(squareSetB);

      expect(intersection.includes(squareA)).toBe(false);
      expect(intersection.includes(squareB)).toBe(true);
      expect(intersection.includes(squareC)).toBe(false);
    });
  });

  describe('uniq', () => {
    it('must return a set without duplicates', () => {
      let square = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [square, square]});

      let unique = squareSet.uniq();

      expect(unique.length()).toBe(1);
    });
  });

  describe('push', () => {
    it('must push a square onto the set', () => {
      let square = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareSet = new SquareSet({squares: []});

      let result = squareSet.push(square);

      expect(result.includes(square)).toBe(true);
    });

    it('must not push undefined onto the set', () => {
      let squareSet = new SquareSet({squares: []});

      let result = squareSet.push(undefined);

      expect(result.includes(undefined)).toBe(false);
    });
  });

  describe('length', () => {
    it('must return how many squares in the set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.length()).toEqual(2);
    });
  });

  // enumerable queries

  describe('includes', () => {
    it('must return true if the square is part of the set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA]});

      expect(squareSet.includes(squareA)).toBe(true);
    });

    it('must return false if the square is not part of the set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA]});

      expect(squareSet.includes(squareB)).toBe(false);
    });
  });

  describe('excludes', () => {
    it('must return true if the square is not part of the set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA]});

      expect(squareSet.excludes(squareB)).toBe(true);
    });

    it('must return false if the square is part of the set', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA]});

      expect(squareSet.excludes(squareA)).toBe(false);
    });
  });

  // finders

  describe('first', () => {
    it('must return the first square', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA]});

      expect(squareSet.first().id).toEqual(squareA.id);
    });
  });

  describe('selectedSquare', () => {
    it('must return the selected square if a piece is selected', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook', selected: true});
      let empty = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let selected = new Square({id: 'a5', x: 0, y: 3, piece: piece});
      let squareSet = new SquareSet({squares: [empty, selected]});

      expect(squareSet.selectedSquare().id).toEqual(selected.id);
    });

    it('must return undefined if there is no piece selected', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook', selected: false});
      let empty = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let unselected = new Square({id: 'a5', x: 0, y: 3, piece: piece});
      let squareSet = new SquareSet({squares: [empty, unselected]});

      expect(squareSet.selectedSquare()).toBe(undefined);
    });
  });

  describe('findSquare', () => {
    it('must return the square matching the id', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.findSquare('a5').id).toEqual(squareB.id);
    });

    it('must return undefined if no square matches the id', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.findSquare('a4')).toBe(undefined);
    });
  });

  describe('findSquareByXandY', () => {
    it('must return the square matching the x and y co-ordinates', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.findSquareByXandY(0, 3).id).toEqual(squareB.id);
    });

    it('must return undefined if no square matches the x and y co-ordinates', () => {
      let squareA = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareB = new Square({id: 'a5', x: 0, y: 3, piece: null});
      let squareSet = new SquareSet({squares: [squareA, squareB]});

      expect(squareSet.findSquareByXandY(0, 5)).toBe(undefined);
    });
  });

  describe('findSquareByPieceId', () => {
    it('must return the square with the matching piece', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let empty = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let occupied = new Square({id: 'a5', x: 0, y: 3, piece: piece});
      let squareSet = new SquareSet({squares: [empty, occupied]});

      expect(squareSet.findSquareByPieceId(1).id).toEqual(occupied.id);
    });

    it('must return undefined if no piece matches the id', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let empty = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let occupied = new Square({id: 'a5', x: 0, y: 3, piece: piece});
      let squareSet = new SquareSet({squares: [empty, occupied]});

      expect(squareSet.findSquareByPieceId(3)).toBe(undefined);
    });
  });

  describe('findKingForPlayer', () => {
    it('must return the square occupied by the king of that player', () => {
      let playerOneKing = new King({id: 29, player_number: 1, type: 'king'});
      let playerTwoKing = new King({id: 5, player_number: 2, type: 'king'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOneKing});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoKing});
      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare]});

      expect(squareSet.findKingForPlayer(1).id).toBe(playerOneSquare.id);
    });
  });

  // filters

  describe('inRange', () => {
    it('must return squares that are at the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.inRange(origin, 2).includes(atDistance)).toBe(true);
    });

    it('must return squares that are closer than the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.inRange(origin, 2).includes(close)).toBe(true);
    });

    it('must not return squares that are further than the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.inRange(origin, 2).includes(far)).toBe(false);
    });
  });

  describe('atRange', () => {
    it('must return squares that are at the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.atRange(origin, 2).includes(atDistance)).toBe(true);
    });

    it('must not return squares that are closer than the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.atRange(origin, 2).includes(close)).toBe(false);
    });

    it('must not return squares that are further than the specified distance', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let close = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let atDistance = new Square({id: 'c8', x: 2, y: 0, piece: null});
      let far = new Square({id: 'd8', x: 3, y: 0, piece: null});

      let squareSet = new SquareSet({squares: [origin, close, atDistance, far]});

      expect(squareSet.atRange(origin, 2).includes(far)).toBe(false);
    });
  });

  describe('inDirection', () => {
    it('must return squares in front of the square', () => {
      let behind = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let origin = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let front = new Square({id: 'a6', x: 0, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [behind, origin, front]});
      let playerNumber = 2;

      expect(squareSet.inDirection(origin, playerNumber).includes(front)).toBe(true);
    });

    it('must not return squares behind the square', () => {
      let behind = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let origin = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let front = new Square({id: 'a6', x: 0, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [behind, origin, front]});
      let playerNumber = 2;

      expect(squareSet.inDirection(origin, playerNumber).includes(behind)).toBe(false);
    });
  });

  describe('orthogonal', () => {
    it('must return squares with the same x or y co-ordinate', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal]});

      expect(squareSet.orthogonal(origin).includes(orthogonal)).toBe(true);
    });

    it('must not return squares where both the x and y co-ordinate are different', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal]});

      expect(squareSet.orthogonal(origin).includes(diagonal)).toBe(false);
    });
  });

  describe('diagonal', () => {
    it('must return squares where the absolute difference in x and y are equal', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal]});

      expect(squareSet.diagonal(origin).includes(diagonal)).toBe(true);
    });

    it('must not return squares where the absolute difference in x and y are not equal', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal]});

      expect(squareSet.diagonal(origin).includes(orthogonal)).toBe(false);
    });
  });

  describe('sideways', () => {
    it('must return squares with the same y co-ordinate', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let sideways = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let front = new Square({id: 'a7', x: 0, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, sideways, front]});

      expect(squareSet.sideways(origin).includes(sideways)).toBe(true);
    });

    it('must not return squares with different y co-ordinate', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let sideways = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let front = new Square({id: 'a7', x: 0, y: 1, piece: null});

      let squareSet = new SquareSet({squares: [origin, sideways, front]});

      expect(squareSet.sideways(origin).includes(front)).toBe(false);
    });
  });

  describe('orthogonalOrDiagonal', () => {
    it('must return squares that are orthogonal to origin', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]})

      expect(squareSet.orthogonalOrDiagonal(origin).includes(orthogonal)).toBe(true);
    });

    it('must return squares that are diagonal to origin', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]});

      expect(squareSet.orthogonalOrDiagonal(origin).includes(diagonal)).toBe(true);
    });

    it('must not return squares that are not diagonal and not orthogonal', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]});

      expect(squareSet.orthogonalOrDiagonal(origin).includes(notOrthogonalOrDiagonal)).toBe(false);
    });
  });

  describe('notOrthogonalOrDiagonal', () => {
    it('must return squares that are not diagonal and not orthogonal', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]});

      expect(squareSet.notOrthogonalOrDiagonal(origin).includes(notOrthogonalOrDiagonal)).toBe(true);
    });

    it('must not return squares that are orthogonal to origin', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]});

      expect(squareSet.notOrthogonalOrDiagonal(origin).includes(orthogonal)).toBe(false);
    });

    it('must not return squares that are diagonal to origin', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let orthogonal = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let diagonal = new Square({id: 'b7', x: 1, y: 1, piece: null});
      let notOrthogonalOrDiagonal = new Square({id: 'b6', x: 1, y: 2, piece: null});

      let squareSet = new SquareSet({squares: [origin, orthogonal, diagonal, notOrthogonalOrDiagonal]})

      expect(squareSet.notOrthogonalOrDiagonal(origin).includes(diagonal)).toBe(false);
    });
  });

  describe('unoccupied', () => {
    it('must return squares with pieces', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let occupied = new Square({id: 'a6', x: 0, y: 2, piece: piece});
      let unoccupied = new Square({id: 'a4', x: 0, y: 4, piece: null});

      let squareSet = new SquareSet({squares: [occupied, unoccupied]});

      expect(squareSet.unoccupied().includes(unoccupied)).toBe(true);
    });

    it('must not return squares without pieces', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let occupied = new Square({id: 'a6', x: 0, y: 2, piece: piece});
      let unoccupied = new Square({id: 'a4', x: 0, y: 4, piece: null});

      let squareSet = new SquareSet({squares: [occupied, unoccupied]});

      expect(squareSet.unoccupied().includes(occupied)).toBe(false);
    });
  });

  describe('occupiedByPlayer', () => {
    it('must return squares with pieces owned by the specified player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByPlayer(1).includes(playerOneSquare)).toBe(true);
    });

    it('must not return squares without pieces owned by the specified player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByPlayer(1).includes(playerTwoSquare)).toBe(false);
    });

    it('must not return empty squares', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByPlayer(1).includes(emptySquare)).toBe(false);
    });
  });

  describe('occupiedByOpponent', () => {
    it('must return squares with pieces owned by the opposing player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByOpponent(1).includes(playerTwoSquare)).toBe(true);
    });

    it('must not return squares with pieces owned by the player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByOpponent(1).includes(playerOneSquare)).toBe(false);
    });

    it('must not return empty squares', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.occupiedByOpponent(1).includes(emptySquare)).toBe(false);
    });
  });

  describe('unoccupiedOrOccupiedByOpponent', () => {
    it('must return squares with pieces owned by the opposing player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.unoccupiedOrOccupiedByOpponent(1).includes(playerTwoSquare)).toBe(true);
    });

    it('must not return squares with pieces owned by the player', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.unoccupiedOrOccupiedByOpponent(1).includes(playerOneSquare)).toBe(false);
    });

    it('must return empty squares', () => {
      let playerOnePiece = new Rook({id: 25, player_number: 1, type: 'rook'});
      let playerTwoPiece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let playerOneSquare = new Square({id: 'a6', x: 0, y: 2, piece: playerOnePiece});
      let playerTwoSquare = new Square({id: 'a4', x: 0, y: 4, piece: playerTwoPiece});
      let emptySquare = new Square({id: 'a5', x: 0, y: 3, piece: null});

      let squareSet = new SquareSet({squares: [playerOneSquare, playerTwoSquare, emptySquare]});

      expect(squareSet.unoccupiedOrOccupiedByOpponent(1).includes(emptySquare)).toBe(true);
    });
  });

  describe('occupiedByPiece', () => {
    it('must return squares occupied by pieces with that type', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.occupiedByPiece('rook').includes(rookSquare)).toBe(true);
    });

    it('must not return squares occupied by pieces with a different type', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.occupiedByPiece('rook').includes(knightSquare)).toBe(false);
    });

    it('must not return empty squares', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.occupiedByPiece('rook').includes(emptySquare)).toBe(false);
    });
  });

  describe('excludingPiece', () => {
    it('must return squares not occupied by pieces of that type', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.excludingPiece('rook').includes(rookSquare)).toBe(false);
    });

    it('must not return squares occupied by pieces of that type', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.excludingPiece('rook').includes(knightSquare)).toBe(true);
    });

    it('must not return empty squares', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let knight = new Knight({id: 26, player_number: 1, type: 'knight'});
      let rookSquare = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let knightSquare = new Square({id: 'b1', x: 1, y: 7, piece: knight});
      let emptySquare = new Square({id: 'a3', x: 0, y: 5, piece: null});
      let squareSet = new SquareSet({squares: [rookSquare, knightSquare, emptySquare]});

      expect(squareSet.excludingPiece('rook').includes(emptySquare)).toBe(false);
    });
  });

  describe('unblocked', () => {
    it('must return squares orthogonal or diagonal from origin that are unblocked', () => {
      let piece = new Rook({id: 32, player_number: 1, type: 'rook'});
      let block = new Rook({id: 8, player_number: 2, type: 'rook'});
      let origin = new Square({id: 'h1', x: 7, y: 7, piece: piece});
      let unblocked = new Square({id: 'h2', x: 7, y: 6, piece: null});
      let occupied = new Square({id: 'h3', x: 7, y: 5, piece: block});
      let blocked = new Square({id: 'h4', x: 7, y: 4, piece: null});
      let squareSet = new SquareSet({squares: [origin, unblocked, occupied, blocked]});

      expect(squareSet.unblocked(origin, squareSet).includes(unblocked)).toBe(true);
    });

    it('must not return squares with their path blocked by pieces', () => {
      let piece = new Rook({id: 32, player_number: 1, type: 'rook'});
      let block = new Rook({id: 8, player_number: 2, type: 'rook'});
      let origin = new Square({id: 'h1', x: 7, y: 7, piece: piece});
      let unblocked = new Square({id: 'h2', x: 7, y: 6, piece: null});
      let occupied = new Square({id: 'h3', x: 7, y: 5, piece: block});
      let blocked = new Square({id: 'h4', x: 7, y: 4, piece: null});
      let squareSet = new SquareSet({squares: [origin, unblocked, occupied, blocked]});

      expect(squareSet.unblocked(origin, squareSet).includes(blocked)).toBe(false);
    });
  });

  describe('unmoved', () => {
    it('must return squares with pieces that have not moved', () => {
      let unmovedPiece = new Pawn({id: 9, player_number: 2, type: 'pawn', has_moved: false});
      let movedPiece = new Pawn({id: 10, player_number: 2, type: 'pawn', has_moved: true});
      let unmovedSquare = new Square({id: 'a7', x: 0, y: 1, piece: unmovedPiece});
      let movedSquare = new Square({id: 'b6', x: 1, y: 2, piece: movedPiece});
      let squareSet = new SquareSet({squares: [movedSquare, unmovedSquare]});

      expect(squareSet.unmoved().includes(unmovedSquare)).toBe(true);
    });

    it('must not return squares with pieces that have moved', () => {
      let unmovedPiece = new Pawn({id: 9, player_number: 2, type: 'pawn', has_moved: false});
      let movedPiece = new Pawn({id: 10, player_number: 2, type: 'pawn', has_moved: true});
      let unmovedSquare = new Square({id: 'a7', x: 0, y: 1, piece: unmovedPiece});
      let movedSquare = new Square({id: 'b6', x: 1, y: 2, piece: movedPiece});
      let squareSet = new SquareSet({squares: [movedSquare, unmovedSquare]});

      expect(squareSet.unmoved().includes(movedSquare)).toBe(false);
    });
  });

  describe('between', () => {
    it('must return squares between two squares', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let between = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [origin, between, destination]});

      expect(squareSet.between(origin, destination).includes(between)).toBe(true);
    });

    it('must not return origin', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let between = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [origin, between, destination]});

      expect(squareSet.between(origin, destination).includes(origin)).toBe(false);
    });

    it('must not return destination', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let between = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
      let squareSet = new SquareSet({squares: [origin, between, destination]});

      expect(squareSet.between(origin, destination).includes(destination)).toBe(false);
    });

    it('must return empty if origin and destination are not orthogonal or diagonal', () => {
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let destination = new Square({id: 'c7', x: 2, y: 1, piece: null});
      let squareSet = new SquareSet({squares: [origin, destination]});

      expect(squareSet.between(origin, destination).none()).toBe(true);
    });
  });

  describe('threatenedBy', () => {
    it('must return squares that are threatened by that player', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let threatenedSquare = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let notThreatenedSquare = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let middleSquare = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let threatSquare = new Square({id: 'c8', x: 2, y: 0, piece: piece});
      let squareSet = new SquareSet({squares: [threatenedSquare, notThreatenedSquare, middleSquare, threatSquare]});
      let gameState = new GameState({current_player_number: 2, squares: squareSet});

      expect(squareSet.threatenedBy(2, gameState).includes(threatenedSquare)).toBe(true);
    });

    it('must not return squares that are not threatened by that player', () => {
      let piece = new Rook({id: 1, player_number: 2, type: 'rook'});
      let threatenedSquare = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let notThreatenedSquare = new Square({id: 'a7', x: 0, y: 1, piece: null});
      let middleSquare = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let threatSquare = new Square({id: 'c8', x: 2, y: 0, piece: piece});
      let squareSet = new SquareSet({squares: [threatenedSquare, notThreatenedSquare, middleSquare, threatSquare]});
      let gameState = new GameState({current_player_number: 2, squares: squareSet});

      expect(squareSet.threatenedBy(2, gameState).includes(notThreatenedSquare)).toBe(false);
    });
  });

  describe('doesntCauseCheck', () => {
    it('must be true if the move does not cause the king to be threatened', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let rook = new Rook({id: 8, player_number: 2, type: 'rook'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let safeSquare = new Square({id: 'd1', x: 3, y: 7, piece: null});
      let opposingSquare = new Square({id: 'f2', x: 5, y: 6, piece: rook});

      let squares = new SquareSet({squares: [kingSquare, safeSquare, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(squares.doesntCauseCheck(kingSquare, gameState).includes(safeSquare)).toBe(true);
    });

    it('must be false if the move does cause the king to be threatened', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let rook = new Rook({id: 8, player_number: 2, type: 'rook'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let threatenedSquare = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let opposingSquare = new Square({id: 'f2', x: 5, y: 6, piece: rook});

      let squares = new SquareSet({squares: [kingSquare, threatenedSquare, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(squares.doesntCauseCheck(kingSquare, gameState).includes(threatenedSquare)).toBe(false);
    });
  });
});

