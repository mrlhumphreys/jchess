import Pawn from '../src/pawn'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'

describe("Pawn", () => {
  describe("destinations", () => {
    it('must return valid moves', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'a3', x: 0, y: 5, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.destinations(origin, gameState).includes(destination)).toBe(true);
    });

    it('must return valid captures', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let capture = new Square({id: 'b3', x: 1, y: 5, piece: opposing});

      let squares = new SquareSet({squares: [origin, capture]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.destinations(origin, gameState).includes(capture)).toBe(true);
    });

    it('must return en passant captures if possible', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a5', x: 0, y: 3, piece: pawn});
      let destination = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let opposingSquare = new Square({id: 'b5', x: 1, y: 3, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: opposing.id});

      expect(pawn.destinations(origin, gameState).includes(destination)).toBe(true);
    });
  });

  describe('move squares', () => {
    it('must return squares 1 square away', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'a3', x: 0, y: 5, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.moveSquares(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not return occupied squares', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let blockedSquare = new Square({id: 'a3', x: 0, y: 5, piece: opposing});

      let squares = new SquareSet({squares: [origin, blockedSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.moveSquares(origin, gameState).includes(blockedSquare)).toBe(false);
    });

    describe('standard', () => {
      it('must not return squares 2 square away', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
        let origin = new Square({id: 'a3', x: 0, y: 5, piece: pawn});
        let destination = new Square({id: 'a5', x: 0, y: 3, piece: null});

        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(pawn.moveSquares(origin, gameState).includes(destination)).toBe(false);
      });
    });

    describe('from starting rank', () => {
      it('must return squares 2 squares away', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
        let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
        let destination = new Square({id: 'a4', x: 0, y: 4, piece: null});

        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(pawn.moveSquares(origin, gameState).includes(destination)).toBe(true);
      });
    });
  });

  describe('capture squares', () => {
    it('must return diagonal occupied squares', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'b3', x: 1, y: 5, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.captureSquares(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not return unoccupied squares', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'b3', x: 1, y: 5, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.captureSquares(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not return orthogonal squares', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'a3', x: 0, y: 5, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.captureSquares(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not return squares more than 1 square away', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a2', x: 0, y: 6, piece: pawn});
      let destination = new Square({id: 'c4', x: 2, y: 4, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(pawn.captureSquares(origin, gameState).includes(destination)).toBe(false);
    });
  });

  describe('en passant squares', () => {
    it('must return the en passant square', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a5', x: 0, y: 3, piece: pawn});
      let destination = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let opposingSquare = new Square({id: 'b5', x: 1, y: 3, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: opposing.id});

      expect(pawn.enPassantSquare(origin, gameState)).toEqual(destination);
    });

    it('must return null if the piece is on the wrong rank', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a4', x: 0, y: 4, piece: pawn});
      let destination = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let opposingSquare = new Square({id: 'b5', x: 1, y: 3, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: opposing.id});

      expect(pawn.enPassantSquare(origin, gameState)).toBe(null);
    });

    it('must return null if the last piece to move was not the opposing pawn', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let otherOpposing = new Pawn({id: 11, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'a5', x: 0, y: 3, piece: pawn});
      let destination = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let opposingSquare = new Square({id: 'b5', x: 1, y: 3, piece: opposing});
      let otherOpposingSquare = new Square({id: 'c5', x: 2, y: 3, piece: otherOpposing});

      let squares = new SquareSet({squares: [origin, destination, opposingSquare, otherOpposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: 11});

      expect(pawn.enPassantSquare(origin, gameState)).toBe(null);
    });

    it('must return null if the opposing pawn is too far away', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let opposing = new Pawn({id: 10, player_number: 2, type: 'pawn'});
      let origin = new Square({id: 'd4', x: 3, y: 4, piece: pawn});
      let destination = new Square({id: 'b6', x: 1, y: 2, piece: null});
      let opposingSquare = new Square({id: 'b5', x: 1, y: 3, piece: opposing});

      let squares = new SquareSet({squares: [origin, destination, opposingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: opposing.id});

      expect(pawn.enPassantSquare(origin, gameState)).toBe(null);
    });
  });

  describe('moveable distance', () => {
    describe('on starting rank', () => {
      it('must be 2', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
        let square = new Square({id: 'a2', x: 0, y: 6, piece: pawn});

        expect(pawn.moveableDistance(square)).toEqual(2);
      });
    });

    describe('not on starting rank', () => {
      it('must be 1', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
        let square = new Square({id: 'a3', x: 0, y: 5, piece: pawn});

        expect(pawn.moveableDistance(square)).toEqual(1);
      });
    });
  });

  describe('direction', () => {
    describe('player 1', () => {
      it('must be -1', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});

        expect(pawn.direction()).toEqual(-1);
      });
    });

    describe('player 2', () => {
      it('must be 1', () => {
        let pawn = new Pawn({id: 10, player_number: 2, type: 'pawn'});

        expect(pawn.direction()).toEqual(1);
      });
    });
  });
});
