import Rook from '../src/rook'
import Pawn from '../src/pawn'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'

describe("Rook", () => {
  describe("destinations", () => {
    it('must include valid moves', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let origin = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let destination = new Square({id: 'a2', x: 0, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(rook.destinations(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not include diagonal squares', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let origin = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let destination = new Square({id: 'b2', x: 1, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(rook.destinations(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not include blocked squares', () => {
      let rook = new Rook({id: 25, player_number: 1, type: 'rook'});
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn'});
      let origin = new Square({id: 'a1', x: 0, y: 7, piece: rook});
      let destination = new Square({id: 'a2', x: 0, y: 6, piece: pawn});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(rook.destinations(origin, gameState).includes(destination)).toBe(false);
    });
  });
});
