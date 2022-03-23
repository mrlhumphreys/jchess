import Knight from '../../src/pieces/knight'
import Square from '../../src/square'
import SquareSet from '../../src/square_set'
import GameState from '../../src/game_state'

describe("Knight", () => {
  describe("destinations", () => {
    it('must return valid moves', () => {
      let knight = new Knight({id: 31, player_number: 1, type: 'knight'});
      let origin = new Square({id: 'g1', x: 6, y: 7, piece: knight});
      let destination = new Square({id: 'h3', x: 7, y: 5, piece: null});

      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(knight.destinations(origin, gameState).includes(destination)).toBe(true);
    });

    it('must not return diagonal moves', () => {
      let knight = new Knight({id: 31, player_number: 1, type: 'knight'});
      let origin = new Square({id: 'g1', x: 6, y: 7, piece: knight});
      let diagonal = new Square({id: 'h2', x: 7, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, diagonal]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(knight.destinations(origin, gameState).includes(diagonal)).toBe(false);
    });

    it('must not return orthogonal moves', () => {
      let knight = new Knight({id: 31, player_number: 1, type: 'knight'});
      let origin = new Square({id: 'g1', x: 6, y: 7, piece: knight});
      let orthogonal = new Square({id: 'g2', x: 6, y: 6, piece: null});

      let squares = new SquareSet({squares: [origin, orthogonal]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(knight.destinations(origin, gameState).includes(orthogonal)).toBe(false);
    });

    it('must not return moves more than 2 squares away', () => {
      let knight = new Knight({id: 31, player_number: 1, type: 'knight'});
      let origin = new Square({id: 'g1', x: 6, y: 7, piece: knight});
      let farAway = new Square({id: 'e5', x: 4, y: 3, piece: null});

      let squares = new SquareSet({squares: [origin, farAway]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(knight.destinations(origin, gameState).includes(farAway)).toBe(false);
    });
  });
});
