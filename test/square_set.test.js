import fixtures from './fixtures'
import SquareSet from '../src/square_set'
import Square from '../src/square'
import Rook from '../src/rook'
import King from '../src/king'
import Pawn from '../src/pawn'
import Knight from '../src/knight'
import GameState from '../src/game_state'

describe('SquareSet', () => {
  describe('constructor', () => {
    it('must set functions', () => {
      let squareSet = fixtures('squareSet');
      expect(squareSet.asJson.constructor).toEqual(Function);
      expect(squareSet.some.constructor).toEqual(Function);
      expect(squareSet.none.constructor).toEqual(Function);
      expect(squareSet.every.constructor).toEqual(Function);
      expect(squareSet.map.constructor).toEqual(Function);
      expect(squareSet.filter.constructor).toEqual(Function);
      expect(squareSet.concat.constructor).toEqual(Function);
      expect(squareSet.difference.constructor).toEqual(Function);
      expect(squareSet.intersection.constructor).toEqual(Function);
      expect(squareSet.uniq.constructor).toEqual(Function);
      expect(squareSet.length.constructor).toEqual(Function);
      expect(squareSet.includes.constructor).toEqual(Function);
      expect(squareSet.excludes.constructor).toEqual(Function);
      expect(squareSet.first.constructor).toEqual(Function);
      expect(squareSet.selected.constructor).toEqual(Function);
      expect(squareSet.findById.constructor).toEqual(Function);
      expect(squareSet.findByCoordinate.constructor).toEqual(Function);
      expect(squareSet.findByPieceId.constructor).toEqual(Function);
      expect(squareSet.inRange.constructor).toEqual(Function);
      expect(squareSet.atRange.constructor).toEqual(Function);
      expect(squareSet.inDirection.constructor).toEqual(Function);
      expect(squareSet.orthogonal.constructor).toEqual(Function);
      expect(squareSet.diagonal.constructor).toEqual(Function);
      expect(squareSet.sideways.constructor).toEqual(Function);
      expect(squareSet.orthogonalOrDiagonal.constructor).toEqual(Function);
      expect(squareSet.notOrthogonalOrDiagonal.constructor).toEqual(Function);
      expect(squareSet.unoccupied.constructor).toEqual(Function);
      expect(squareSet.occupiedByPlayer.constructor).toEqual(Function);
      expect(squareSet.occupiedByOpponentOf.constructor).toEqual(Function);
      expect(squareSet.unblocked.constructor).toEqual(Function);
      expect(squareSet.between.constructor).toEqual(Function);
    });
  });

  describe('dup', () => {
    it('must return another squareSet with the same properties', () => {

    });
  });

  // enumerable

  // enumerable operations

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

  // finders

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

  describe('unmoved', () => {
    it('must return squares with pieces that have not moved', () => {
      let unmovedPiece = new Pawn({id: 9, player_number: 2, type: 'pawn', has_moved: false});
      let movedPiece = new Pawn({id: 10, player_number: 2, type: 'pawn', has_moved: true});
      let unmovedSquare = new Square({id: 'a7', x: 0, y: 1, piece: unmovedPiece});
      let movedSquare = new Square({id: 'b6', x: 1, y: 2, piece: movedPiece});
      let squareSet = new SquareSet({squares: [movedSquare, unmovedSquare]});

      expect(squareSet.unmoved.includes(unmovedSquare)).toBe(true);
    });

    it('must not return squares with pieces that have moved', () => {
      let unmovedPiece = new Pawn({id: 9, player_number: 2, type: 'pawn', has_moved: false});
      let movedPiece = new Pawn({id: 10, player_number: 2, type: 'pawn', has_moved: true});
      let unmovedSquare = new Square({id: 'a7', x: 0, y: 1, piece: unmovedPiece});
      let movedSquare = new Square({id: 'b6', x: 1, y: 2, piece: movedPiece});
      let squareSet = new SquareSet({squares: [movedSquare, unmovedSquare]});

      expect(squareSet.unmoved.includes(movedSquare)).toBe(false);
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

