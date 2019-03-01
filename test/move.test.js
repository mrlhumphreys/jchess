import Move from '../src/move'
import Rook from '../src/rook'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'
import fixtures from './fixtures'

describe('Move', () => {
  describe('possible', () => {
    it('must return true if the piece can move from the square', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let move = new Move({from: origin, gameState: gameState});
      expect(move.possible()).toBe(true);
      expect(move.error).toBe(null);
    });

    it('must return false if the piece cannot move from the square', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let blocker = new Rook({id: 2, player_number: 1, type: 'rook', selected: false});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: blocker});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let move = new Move({from: origin, gameState: gameState});
      expect(move.possible()).toBe(false);
      expect(move.error.name).toBe('CannotMoveError');
    });

    it('must return false if the square is not specified', () => {
      let gameState = fixtures('game_state');
      let move = new Move({from: null, gameState: gameState});

      expect(move.possible()).toBe(false);
      expect(move.error.name).toEqual('NoSquareError');
    });

    it('must return false if the square is empty', () => {
      let gameState = fixtures('game_state');
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let move = new Move({from: square, gameState: gameState});

      expect(move.possible()).toBe(false);
      expect(move.error.name).toEqual('NoPieceError');
    });
  });

  describe('valid', () => { 
    it('must return true if the piece can move to the square', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let move = new Move({from: origin, to: destination, gameState: gameState});
      expect(move.valid()).toBe(true);
      expect(move.error).toBe(null);
    });

    it('must return false if the piece cannot move to the square', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let blocker = new Rook({id: 2, player_number: 1, type: 'rook', selected: false});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: blocker});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let move = new Move({from: origin, to: destination, gameState: gameState});
      expect(move.valid()).toBe(false);
      expect(move.error.name).toEqual('CannotMoveError');
    });

    it('must return false if the square is not specified', () => {
      let gameState = fixtures('game_state');
      let move = new Move({from: null, gameState: gameState});

      expect(move.valid()).toBe(false);
      expect(move.error.name).toEqual('NoSquareError');
    });

    it('must return false if the square is empty', () => {
      let gameState = fixtures('game_state');
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let move = new Move({from: square, gameState: gameState});

      expect(move.valid()).toBe(false);
      expect(move.error.name).toEqual('NoPieceError');
    });
  });
});
