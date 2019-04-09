import GameState from '../src/game_state'
import Queen from '../src/queen'
import Rook from '../src/rook'
import Bishop from '../src/bishop'
import King from '../src/king'
import Pawn from '../src/pawn'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import fixtures from './fixtures'

describe("GameState", () => {
  describe('asJson', () => {
    it('must return game state as json', () => {
      let gameState = fixtures('gameState');
      expect(gameState.asJson).toEqual({
        current_player_number: 1,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, has_moved: false, selected: false, type: 'rook' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, has_moved: false, selected: false, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, has_moved: false, selected: false, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, has_moved: false, selected: false, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, has_moved: false, selected: false, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, has_moved: false, selected: false, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, has_moved: false, selected: false, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, has_moved: false, selected: false, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, has_moved: false, selected: false, type: 'pawn' } },

          { id: 'a6', x: 0, y: 2, piece: null },
          { id: 'b6', x: 1, y: 2, piece: null },
          { id: 'c6', x: 2, y: 2, piece: null },
          { id: 'd6', x: 3, y: 2, piece: null },
          { id: 'e6', x: 4, y: 2, piece: null },
          { id: 'f6', x: 5, y: 2, piece: null },
          { id: 'g6', x: 6, y: 2, piece: null },
          { id: 'h6', x: 7, y: 2, piece: null },

          { id: 'a5', x: 0, y: 3, piece: null },
          { id: 'b5', x: 1, y: 3, piece: null },
          { id: 'c5', x: 2, y: 3, piece: null },
          { id: 'd5', x: 3, y: 3, piece: null },
          { id: 'e5', x: 4, y: 3, piece: null },
          { id: 'f5', x: 5, y: 3, piece: null },
          { id: 'g5', x: 6, y: 3, piece: null },
          { id: 'h5', x: 7, y: 3, piece: null },

          { id: 'a4', x: 0, y: 4, piece: null },
          { id: 'b4', x: 1, y: 4, piece: null },
          { id: 'c4', x: 2, y: 4, piece: null },
          { id: 'd4', x: 3, y: 4, piece: null },
          { id: 'e4', x: 4, y: 4, piece: null },
          { id: 'f4', x: 5, y: 4, piece: null },
          { id: 'g4', x: 6, y: 4, piece: null },
          { id: 'h4', x: 7, y: 4, piece: null },

          { id: 'a3', x: 0, y: 5, piece: null },
          { id: 'b3', x: 1, y: 5, piece: null },
          { id: 'c3', x: 2, y: 5, piece: null },
          { id: 'd3', x: 3, y: 5, piece: null },
          { id: 'e3', x: 4, y: 5, piece: null },
          { id: 'f3', x: 5, y: 5, piece: null },
          { id: 'g3', x: 6, y: 5, piece: null },
          { id: 'h3', x: 7, y: 5, piece: null },

          { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },
          { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, has_moved: false, selected: false, type: 'pawn' } },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, has_moved: false, selected: false, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, has_moved: false, selected: false, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, has_moved: false, selected: false, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, has_moved: false, selected: false, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, has_moved: false, selected: false, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, has_moved: false, selected: false, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, has_moved: false, selected: false, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, has_moved: false, selected: false, type: 'rook' } }
        ],
        last_double_step_pawn_id: null 
      });
    });
  });

  describe("selectedSquare", () => {
    it('must return the selected square', () => {
      let selected = new Rook({id: 1, player_number: 2, type: 'rook', selected: true});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: selected});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.selectedSquare).toEqual(square);
    });

    it('must return undefined when there is no selected square', () => {
      let unselected = new Rook({id: 1, player_number: 2, type: 'rook', selected: false});
      let square = new Square({id: 'a8', x: 0, y: 0, piece: unselected});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.selectedSquare).toBe(undefined);
    });
  });

  describe('findSquare', () => {
    it('must return the square matching the id', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.findSquare('a8')).toEqual(square);
    });

    it('must return undefined when there is no match', () => {
      let square = new Square({id: 'a8', x: 0, y: 0, piece: null});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.findSquare('a7')).toBe(undefined);
    });
  });

  describe('playersTurn', () => {
    it('must return true if the current player matches', () => {
      let gameState = new GameState({current_player_number: 1, squares: []});

      expect(gameState.playersTurn(1)).toBe(true);
    });

    it('must return false if the current player does not match', () => {
      let gameState = new GameState({current_player_number: 1, squares: []});

      expect(gameState.playersTurn(2)).toBe(false);
    });
  });

  describe('canMoveFrom', () => {
    it('must return the result from move.possible', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.canMoveFrom(origin.id)).toBe(true);
    });
  });

  describe('canMove', () => {
    it('must return the result of move valid', () => {
      let rook = new Rook({id: 1, player_number: 1, type: 'rook', selected: true});
      let origin = new Square({id: 'a8', x: 0, y: 0, piece: rook});
      let destination = new Square({id: 'b8', x: 1, y: 0, piece: null});
      let squares = new SquareSet({squares: [origin, destination]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      expect(gameState.canMove(origin.id, destination.id)).toBe(true);
    });
  });

  describe('capturedSquare', () => {
    describe('destination occupied', () => {
      it('must return the destination id', () => {
        let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: false});
        let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: true});
        let origin = new Square({id: 'b6', x: 1, y: 2, piece: piece});
        let destination = new Square({id: 'a7', x: 0, y: 1, piece: enemy});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.capturedSquare(origin, destination)).toEqual(destination);
      });
    });

    describe('destination unoccupied', () => {
      describe('en passant', () => {
        it('must return the square passed', () => { 
          let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
          let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: false});
          let origin = new Square({id: 'b5', x: 1, y: 3, piece: piece});
          let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
          let enPassant = new Square({id: 'a5', x: 0, y: 3, piece: enemy});
          let squares = new SquareSet({squares: [origin, destination, enPassant]});
          let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: enemy.id});

          expect(gameState.capturedSquare(origin, destination)).toEqual(enPassant);
        });
      });

      describe('not en passant', () => {
        it('must return null', () => {
          let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
          let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: false});
          let origin = new Square({id: 'b5', x: 1, y: 3, piece: piece});
          let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
          let enPassant = new Square({id: 'a5', x: 0, y: 3, piece: enemy});
          let squares = new SquareSet({squares: [origin, destination, enPassant]});
          let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: null});

          expect(gameState.capturedSquare(origin, destination)).toBe(null);
        });
      });
    });
  });

  describe('capturedSquareId', () => {
    describe('with a captured square', () => {
      it('must return the id of the square', () => {
        let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
        let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: false});
        let origin = new Square({id: 'b6', x: 1, y: 2, piece: piece});
        let destination = new Square({id: 'a7', x: 0, y: 1, piece: enemy});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.capturedSquareId(origin, destination)).toEqual(destination.id);
      });
    });

    describe('without a captured square', () => {
      it('must return null', () => {
        let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
        let origin = new Square({id: 'b6', x: 1, y: 2, piece: piece});
        let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.capturedSquareId(origin, destination)).toBe(null);
      });
    });
  });

  describe('rookCastleMove', () => {
    describe('king castles', () => {
      it('must return the rook moves', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: true});
        let rook = new Rook({id: 32, player_number: 1, type: 'rook', selected: false});

        let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
        let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: rook});

        let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.rookCastleMove(kingOrigin, kingDestination)).toEqual({fromId: rookOrigin.id, toId: rookDestination.id});
      });
    });

    describe('king does not castle', () => {
      it('must return null', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: true});

        let origin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let destination = new Square({id: 'f1', x: 5, y: 7, piece: null});

        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.rookCastleMove(origin, destination)).toBe(null);
      });
    });
  });

  describe('pawnMoveToLastRank', () => {
    describe('pawn is on last rank', () => {
      it('must return true', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn', selected: true});
        let origin = new Square({id: 'a7', x: 0, y: 1, piece: pawn});
        let destination = new Square({id: 'a8', x: 0, y: 0, piece: null});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.pawnMoveToLastRank(origin, destination)).toBe(true);
      });
    });

    describe('pawn is not on last rank', () => {
      it('must return false', () => {
        let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn', selected: true});
        let origin = new Square({id: 'a6', x: 0, y: 2, piece: pawn});
        let destination = new Square({id: 'a7', x: 0, y: 1, piece: null});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.pawnMoveToLastRank(origin, destination)).toBe(false);
      });
    });
  });

  describe('inCheck', () => {
    describe('king is under attack', () => {
      it('must return true', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: false});
        let rook = new Rook({id: 1, player_number: 2, type: 'rook', selected: false});

        let kingSquare = new Square({id: 'f1', x: 5, y: 7, piece: king});
        let betweenSquare = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookSquare = new Square({id: 'h1', x: 7, y: 7, piece: rook});

        let squares = new SquareSet({squares: [kingSquare, betweenSquare, rookSquare]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.inCheck(1)).toBe(true);
      });
    });

    describe('king is not under attack', () => {
      it('must return false', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: false});
        let bishop = new Bishop({id: 3, player_number: 2, type: 'bishop', selected: false});

        let kingSquare = new Square({id: 'f1', x: 5, y: 7, piece: king});
        let betweenSquare = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let bishopSquare = new Square({id: 'h1', x: 7, y: 7, piece: bishop});

        let squares = new SquareSet({squares: [kingSquare, betweenSquare, bishopSquare]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        expect(gameState.inCheck(1)).toBe(false);
      });
    });
  });

  describe('dup', () => {
    it('must return another game state', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn', selected: true});
      let square = new Square({id: 'f1', x: 5, y: 7, piece: pawn});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let dup = gameState.dup;

      expect(dup.constructor.name).toEqual('GameState');
    });

    it('must have the same board state', () => {
      let pawn = new Pawn({id: 17, player_number: 1, type: 'pawn', selected: true});
      let square = new Square({id: 'f1', x: 5, y: 7, piece: pawn});
      let squares = new SquareSet({squares: [square]});
      let gameState = new GameState({current_player_number: 1, squares: squares});

      let dup = gameState.dup;

      expect(dup.squares.first.piece.id).toEqual(pawn.id);
    });
  });

  describe('move', () => {
    describe('regular move', () => {
      it('must move the piece', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: true});

        let origin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let destination = new Square({id: 'f1', x: 5, y: 7, piece: null});

        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        gameState.move(origin.id, destination.id);

        expect(gameState.findSquare(origin.id).piece).toBe(null);
        expect(gameState.findSquare(destination.id).piece.id).toEqual(king.id);
      });
    });

    describe('castle move', () => {
      it('must move the king and the rook', () => {
        let king = new King({id: 29, player_number: 1, type: 'king', selected: true});
        let rook = new Rook({id: 32, player_number: 1, type: 'rook', selected: false});

        let kingOrigin = new Square({id: 'e1', x: 4, y: 7, piece: king});
        let rookDestination = new Square({id: 'f1', x: 5, y: 7, piece: null});
        let kingDestination = new Square({id: 'g1', x: 6, y: 7, piece: null});
        let rookOrigin = new Square({id: 'h1', x: 7, y: 7, piece: rook});

        let squares = new SquareSet({squares: [kingOrigin, rookDestination, kingDestination, rookOrigin]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        gameState.move(kingOrigin.id, kingDestination.id);

        expect(gameState.findSquare(kingOrigin.id).piece).toBe(null);
        expect(gameState.findSquare(kingDestination.id).piece.id).toEqual(king.id);

        expect(gameState.findSquare(rookOrigin.id).piece).toBe(null);
        expect(gameState.findSquare(rookDestination.id).piece.id).toEqual(rook.id);
      });
    });
  });

  describe('performMove', () => {
    describe('without capture', () => {
      it('must move the piece', () => {
        let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
        let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: false});
        let origin = new Square({id: 'b5', x: 1, y: 3, piece: piece});
        let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let squares = new SquareSet({squares: [origin, destination]});
        let gameState = new GameState({current_player_number: 1, squares: squares});

        gameState.performMove(origin, destination, null);

        expect(gameState.findSquare(origin.id).piece).toBe(null);
        expect(gameState.findSquare(destination.id).piece.id).toEqual(piece.id);
      });
    });

    describe('with capture', () => {
      it('must move the piece and remove the captured piece', () => {
        let piece = new Pawn({id: 18, player_number: 1, type: 'pawn', selected: true});
        let enemy = new Pawn({id: 9, player_number: 2, type: 'pawn', selected: false});
        let origin = new Square({id: 'b5', x: 1, y: 3, piece: piece});
        let destination = new Square({id: 'a6', x: 0, y: 2, piece: null});
        let enPassant = new Square({id: 'a5', x: 0, y: 3, piece: enemy});
        let squares = new SquareSet({squares: [origin, destination, enPassant]});
        let gameState = new GameState({current_player_number: 1, squares: squares, last_double_step_pawn_id: enemy.id});

        gameState.performMove(origin, destination, enPassant);;

        expect(gameState.findSquare(origin.id).piece).toBe(null);
        expect(gameState.findSquare(destination.id).piece.id).toEqual(piece.id);
        expect(gameState.findSquare(enPassant.id).piece).toEqual(null);
      });
    });
  });

  describe('opponent', () => {
    it('must return the not current player number', () =>{ 
      let gameState = new GameState({current_player_number: 1, squares: []});

      expect(gameState.opponent).toEqual(2);
    });
  });

  describe('selectPiece', () => {
    describe('with a square that exists', () => {
      it('must select the piece on that square', () => {
        let gameState = fixtures('gameState');
        gameState.selectPiece('d7'); 
        let square = gameState.findSquare('d7');
        expect(square.piece.selected).toBe(true);
      });
    });

    describe('with a square that does not exist', () => {
      it('must do nothing', () => {
        let gameState = fixtures('gameState');
        gameState.selectPiece('j9'); 
        let square = gameState.selectedSquare;
        expect(square).toBe(undefined);
      });
    });
  });

  describe('deselectPiece', () => {
    describe('with a square that exists', () => {
      it('must select the piece on that square', () => {
        let gameState = fixtures('gameState', {
          squares: [
            {id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn', selected: true }}
          ]
        });
        gameState.deselectPiece('d7'); 
        let square = gameState.findSquare('d7');
        expect(square.piece.selected).toBe(false);
      });
    });

    describe('with a square that does not exist', () => {
      it('must do nothing', () => {
        let gameState = fixtures('gameState');
        gameState.deselectPiece('j9'); 
        let square = gameState.selectedSquare;
        expect(square).toBe(undefined);
      });
    });
  });

  describe('promote', () => {
    describe('with a square that exists', () => {
      let gameState = fixtures('gameState');
      gameState.promote('a8', 'queen');
      let square = gameState.findSquare('a8');
      expect(square.piece.constructor).toEqual(Queen);
    });

    describe('with a square that does not exist', () => {
      let gameState = fixtures('gameState');
      gameState.promote('j9', 'queen');
      let queenSquares = gameState.squares.filter(function(s) { return s.piece !== null && s.piece.constructor == Queen });
      expect(queenSquares.length).toEqual(2);
    });
  });
});
