import Queen from '../src/queen'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'

describe("Queen", () => {
  describe("destinations", () => {
    it('must include valid moves', () => {
      let queen = new Queen({id: 28, player_number: 1, type: 'queen'});
      let origin = new Square({id: 'd1', x: 3, y: 7, piece: queen});
      let destination = new Square({id: 'd2', x: 3, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(queen.destinations(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not include knight move squares', () => {
      let queen = new Queen({id: 28, player_number: 1, type: 'queen'});
      let origin = new Square({id: 'd1', x: 3, y: 7, piece: queen});
      let destination = new Square({id: 'f2', x: 5, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(queen.destinations(origin, gameState).includes(destination)).toBe(false);
    });

    it('must not include blocked squares', () => {
      let queen = new Queen({id: 28, player_number: 1, type: 'queen'});
      let pawn = new Queen({id: 20, player_number: 1, type: 'queen'});
      let origin = new Square({id: 'd1', x: 3, y: 7, piece: queen});
      let destination = new Square({id: 'd2', x: 3, y: 6, piece: pawn});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(queen.destinations(origin, gameState).includes(destination)).toBe(false);
    });
  });
});
