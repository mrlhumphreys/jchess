import Bishop from '../src/bishop'
import Pawn from '../src/pawn'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'

describe('Bishop', () => { 
  describe('destinations', () => { 
    it('must return valid moves', () => { 
      let bishop = new Bishop({id: 3, player_number: 2, type: 'bishop'});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: bishop});
      let destination = new Square({id: 'b7', x: 1, y: 1, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 2, squares: squares});

      expect(bishop.destinations(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not return orthogonal moves', () => {
      let bishop = new Bishop({id: 3, player_number: 2, type: 'bishop'});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: bishop});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 2, squares: squares});

      expect(bishop.destinations(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not return friendly pieces', () => {
      let bishop = new Bishop({id: 3, player_number: 2, type: 'bishop'});
      let friendly = new Pawn({id: 9, player_number: 2, type: 'pawn'});

      let origin = new Square({id: 'a8', x: 0, y: 0, piece: bishop});
      let destination = new Square({id: 'b7', x: 1, y: 1, piece: friendly});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 2, squares: squares});

      expect(bishop.destinations(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not return blocked pieces', () => {
      let bishop = new Bishop({id: 3, player_number: 2, type: 'bishop'});
      let blocker = new Pawn({id: 9, player_number: 2, type: 'pawn'});

      let origin = new Square({id: 'a8', x: 0, y: 0, piece: bishop});
      let block = new Square({id: 'b7', x: 1, y: 1, piece: blocker});
      let destination = new Square({id: 'c6', x: 2, y: 2, piece: null});

      let squares = new SquareSet({squares: [origin, block, destination]});
      let gameState = new GameState({current_player_number: 2, squares: squares});

      expect(bishop.destinations(origin, gameState).includes(destination)).toBe(false);
    });
  });
});
