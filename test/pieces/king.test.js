import King from '../../src/pieces/king'
import Rook from '../../src/pieces/rook'
import Knight from '../../src/pieces/knight'
import Square from '../../src/square'
import SquareSet from '../../src/square_set'
import GameState from '../../src/game_state'

describe("King", () => {
  describe("destinations", () => {
    it('must return moves 1 square away', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let oneSquareAway = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let squares = new SquareSet({squares: [kingOrigin, oneSquareAway]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.destinations(kingOrigin, gameState).includes(oneSquareAway)).toBe(true);
    });

    it('must return castling moves if possible', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let rook = new Rook({id: 32, player_number: 1, type: 'rook'});

      let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
      let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
      let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: rook});
      let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]})
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.destinations(kingOrigin, gameState).includes(kingDestination)).toBe(true);
    });

    it('must not return checked squares', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let enemy = new Knight({id: 7, player_number: 2, type: 'knight'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let enemySquare = new Square({id: 'g1', x: 6, y: 7, piece: enemy});
      let checkedSquare = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let squares = new SquareSet({squares: [kingSquare, enemySquare, checkedSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.destinations(kingSquare, gameState).includes(checkedSquare)).toBe(false);
    });

    it('must not return checked squares by opposing kings', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let opposingKing = new King({id: 5, player_number: 2, type: 'king'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let betweenSquare = new Square({id: 'f1', x: 5, y: 7, piece: null});
      let opposingKingSquare = new Square({id: 'g1', x: 6, y: 7, piece: opposingKing});
      let squares = new SquareSet({squares: [kingSquare, betweenSquare, opposingKingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.destinations(kingSquare, gameState).includes(betweenSquare)).toBe(false);
    });
  });

  describe('baseDestinations', () => {
    it('must return squares 1 square away', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let oneSquareAway = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let squares = new SquareSet({squares: [kingOrigin, oneSquareAway]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.baseDestinations(kingOrigin, gameState).includes(oneSquareAway)).toBe(true);
    });

    it('must not return squares 2 squares away', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let oneSquareAway = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let twoSquaresAway = new Square({id: 'e3', x: 4, y: 5, piece: null});
      let squares = new SquareSet({squares: [kingOrigin, oneSquareAway, twoSquaresAway]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.baseDestinations(kingOrigin, gameState).includes(twoSquaresAway)).toBe(false);
    });
  });

  describe('castle', () => {
    describe('king has not moved and there are some rooks', () => {
      it('must return the castling squares', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', has_moved: false});
        let rook = new Rook({id: 32, player_number: 1, type: 'rook'});

        let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
        let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: rook});
        let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]})
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(king.castle(kingOrigin, gameState).includes(kingDestination)).toBe(true);
      });
    });

    describe('if king has moved', () => {
      it('must not return any squares', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', has_moved: true});
        let rook = new Rook({id: 32, player_number: 1, type: 'rook'});

        let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
        let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: rook});
        let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(king.castle(kingOrigin, gameState).none()).toBe(true);
      });
    });

    describe('if there are no rooks', () => {
      it('must not return any squares', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', has_moved: false});

        let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
        let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: null});
        let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(king.castle(kingOrigin, gameState).none()).toBe(true);
      });
    });
  });

  describe('checkedSquares', () => {
    it('must return squares threatened by the opponent', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let enemy = new Knight({id: 7, player_number: 2, type: 'knight'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let enemySquare = new Square({id: 'g1', x: 6, y: 7, piece: enemy});
      let checkedSquare = new Square({id: 'e2', x: 4, y: 6, piece: null});
      let squares = new SquareSet({squares: [kingSquare, enemySquare, checkedSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.checkedSquares(kingSquare, gameState).includes(checkedSquare)).toBe(true);
    });
  });

  describe('sharedKingSquares', () => {
    it('must return squares between kings', () => {
      let king = new King({id: 29, player_number: 1, type: 'king'});
      let opposingKing = new King({id: 5, player_number: 2, type: 'king'});

      let kingSquare = new Square({id: 'e1', x: 4, y: 7, piece: king});
      let betweenSquare = new Square({id: 'f1', x: 5, y: 7, piece: null});
      let opposingKingSquare = new Square({id: 'g1', x: 6, y: 7, piece: opposingKing});
      let squares = new SquareSet({squares: [kingSquare, betweenSquare, opposingKingSquare]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(king.sharedKingSquares(gameState).includes(betweenSquare)).toBe(true);
    });
  });
});
