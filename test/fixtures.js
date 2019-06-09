import exists from '../src/exists'
import Match from '../src/match'
import GameState from '../src/game_state'
import SquareSet from '../src/square_set'

const fixtureDefinitions = {
  gameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

        { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
        { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
        { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
        { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
        { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
        { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
        { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
        { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
        { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
        { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
        { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
        { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
        { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  },
  checkmateGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: null },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

        { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
        { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
        { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
        { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
        { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
        { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
        { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
        { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
        { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
        { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
        { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  },
  nonKingPiecesCannotMoveGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: null },

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
        { id: 'h3', x: 7, y: 5, piece: { id: 16, player_number: 2, type: 'pawn' } },

        { id: 'a2', x: 0, y: 6, piece: null },
        { id: 'b2', x: 1, y: 6, piece: null },
        { id: 'c2', x: 2, y: 6, piece: null },
        { id: 'd2', x: 3, y: 6, piece: null },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: null },
        { id: 'g2', x: 6, y: 6, piece: null },
        { id: 'h2', x: 7, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: null },
        { id: 'b1', x: 1, y: 7, piece: null },
        { id: 'c1', x: 2, y: 7, piece: null },
        { id: 'd1', x: 3, y: 7, piece: null },
        { id: 'e1', x: 4, y: 7, piece: null },
        { id: 'f1', x: 5, y: 7, piece: null },
        { id: 'g1', x: 6, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  },
  kingCannotMoveGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

        { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
        { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
        { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
        { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
        { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
        { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
        { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
        { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
        { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
        { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
        { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
        { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
        { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  },
  kingCanMoveGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

        { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
        { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
        { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
        { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
        { id: 'e2', x: 4, y: 6, piece: null },
        { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
        { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
        { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
        { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
        { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
        { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
        { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
        { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  },
  match: {
    klass: Match,
    args: { 
      id: 1,
      current_move: {},
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
          { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
          { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
          { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
          { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
          { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
          { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
          { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

          { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
          { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
          { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
          { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
          { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
          { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
          { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
          { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  resignedMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move: {},
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
          { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
          { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
          { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
          { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
          { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
          { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
          { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

          { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
          { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
          { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
          { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
          { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
          { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
          { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
          { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: true },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    }
  },
  winnerMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move: {},
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: null },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
          { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
          { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
          { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
          { id: 'e7', x: 4, y: 1, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
          { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
          { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

          { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
          { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
          { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
          { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
          { id: 'e2', x: 4, y: 6, piece: null },
          { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
          { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
          { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ]
    } 
  },
  moveToCheckMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move: { fromId: 1 },
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: null },
          { id: 'b8', x: 1, y: 0, piece: null },
          { id: 'c8', x: 2, y: 0, piece: null },
          { id: 'd8', x: 3, y: 0, piece: null },
          { id: 'e8', x: 4, y: 0, piece: null },
          { id: 'f8', x: 5, y: 0, piece: null },
          { id: 'g8', x: 6, y: 0, piece: null },
          { id: 'h8', x: 7, y: 0, piece: null },

          { id: 'a7', x: 0, y: 1, piece: null },
          { id: 'b7', x: 1, y: 1, piece: null },
          { id: 'c7', x: 2, y: 1, piece: null },
          { id: 'd7', x: 3, y: 1, piece: null },
          { id: 'e7', x: 4, y: 1, piece: null },
          { id: 'f7', x: 5, y: 1, piece: null },
          { id: 'g7', x: 6, y: 1, piece: null },
          { id: 'h7', x: 7, y: 1, piece: null },

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

          { id: 'a2', x: 0, y: 6, piece: null },
          { id: 'b2', x: 1, y: 6, piece: null },
          { id: 'c2', x: 2, y: 6, piece: null },
          { id: 'd2', x: 3, y: 6, piece: null },
          { id: 'e2', x: 4, y: 6, piece: null },
          { id: 'f2', x: 5, y: 6, piece: null },
          { id: 'g2', x: 6, y: 6, piece: null },
          { id: 'h2', x: 7, y: 6, piece: null },

          { id: 'a1', x: 0, y: 7, piece: null },
          { id: 'b1', x: 1, y: 7, piece: { id: 29, player_number: 1, type: 'king', selected: true } },
          { id: 'c1', x: 2, y: 7, piece: null },
          { id: 'd1', x: 3, y: 7, piece: null },
          { id: 'e1', x: 4, y: 7, piece: null },
          { id: 'f1', x: 5, y: 7, piece: null },
          { id: 'g1', x: 6, y: 7, piece: null },
          { id: 'h1', x: 7, y: 7, piece: { id: 8, player_number: 2, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  moveMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move: { fromId: 'd2' },
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
          { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
          { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
          { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
          { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
          { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
          { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
          { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

          { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
          { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
          { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
          { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn', selected: true } },
          { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
          { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
          { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
          { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  toPromoteMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move: { fromId: 'a7' },
      promotion: false,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: null },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: { id: 20, player_number: 1, type: 'pawn', selected: true } },
          { id: 'b7', x: 1, y: 1, piece: null },
          { id: 'c7', x: 2, y: 1, piece: null },
          { id: 'd7', x: 3, y: 1, piece: null },
          { id: 'e7', x: 4, y: 1, piece: null },
          { id: 'f7', x: 5, y: 1, piece: null },
          { id: 'g7', x: 6, y: 1, piece: null },
          { id: 'h7', x: 7, y: 1, piece: null },

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

          { id: 'a2', x: 0, y: 6, piece: null },
          { id: 'b2', x: 1, y: 6, piece: null },
          { id: 'c2', x: 2, y: 6, piece: null },
          { id: 'd2', x: 3, y: 6, piece: null },
          { id: 'e2', x: 4, y: 6, piece: null },
          { id: 'f2', x: 5, y: 6, piece: null },
          { id: 'g2', x: 6, y: 6, piece: null },
          { id: 'h2', x: 7, y: 6, piece: null },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  promotionMatch: {
    klass: Match,
    args: { 
      id: 1,
      current_move: { fromId: 'a7', toId: 'a8' },
      promotion: true,
      game_state: {
        current_player_number: 1,
        last_double_step_pawn_id: null,
        squares: [
          { id: 'a8', x: 0, y: 0, piece: { id: 17, player_number: 1, type: 'pawn' } },
          { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
          { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
          { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
          { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
          { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
          { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
          { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

          { id: 'a7', x: 0, y: 1, piece: null },
          { id: 'b7', x: 1, y: 1, piece: null },
          { id: 'c7', x: 2, y: 1, piece: null },
          { id: 'd7', x: 3, y: 1, piece: null },
          { id: 'e7', x: 4, y: 1, piece: null },
          { id: 'f7', x: 5, y: 1, piece: null },
          { id: 'g7', x: 6, y: 1, piece: null },
          { id: 'h7', x: 7, y: 1, piece: null },

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

          { id: 'a2', x: 0, y: 6, piece: null },
          { id: 'b2', x: 1, y: 6, piece: null },
          { id: 'c2', x: 2, y: 6, piece: null },
          { id: 'd2', x: 3, y: 6, piece: null },
          { id: 'e2', x: 4, y: 6, piece: null },
          { id: 'f2', x: 5, y: 6, piece: null },
          { id: 'g2', x: 6, y: 6, piece: null },
          { id: 'h2', x: 7, y: 6, piece: null },

          { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
          { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
          { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
          { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
          { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
          { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
          { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
          { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
        ]  
      },
      players: [
        { player_number: 1, name: 'aaa', resigned: false },
        { player_number: 2, name: 'bbb', resigned: false }
      ],
      winner: null
    } 
  },
  squareSet: {
    klass: SquareSet,
    args: {
      squares: [
        { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
        { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight' } },
        { id: 'c8', x: 2, y: 0, piece: { id: 3, player_number: 2, type: 'bishop' } },
        { id: 'd8', x: 3, y: 0, piece: { id: 4, player_number: 2, type: 'queen' } },
        { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
        { id: 'f8', x: 5, y: 0, piece: { id: 6, player_number: 2, type: 'bishop' } },
        { id: 'g8', x: 6, y: 0, piece: { id: 7, player_number: 2, type: 'knight' } },
        { id: 'h8', x: 7, y: 0, piece: { id: 8, player_number: 2, type: 'rook' } },

        { id: 'a7', x: 0, y: 1, piece: { id: 9, player_number: 2, type: 'pawn' } },
        { id: 'b7', x: 1, y: 1, piece: { id: 10, player_number: 2, type: 'pawn' } },
        { id: 'c7', x: 2, y: 1, piece: { id: 11, player_number: 2, type: 'pawn' } },
        { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn' } },
        { id: 'e7', x: 4, y: 1, piece: { id: 13, player_number: 2, type: 'pawn' } },
        { id: 'f7', x: 5, y: 1, piece: { id: 14, player_number: 2, type: 'pawn' } },
        { id: 'g7', x: 6, y: 1, piece: { id: 15, player_number: 2, type: 'pawn' } },
        { id: 'h7', x: 7, y: 1, piece: { id: 16, player_number: 2, type: 'pawn' } },

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

        { id: 'a2', x: 0, y: 6, piece: { id: 17, player_number: 1, type: 'pawn' } },
        { id: 'b2', x: 1, y: 6, piece: { id: 18, player_number: 1, type: 'pawn' } },
        { id: 'c2', x: 2, y: 6, piece: { id: 19, player_number: 1, type: 'pawn' } },
        { id: 'd2', x: 3, y: 6, piece: { id: 20, player_number: 1, type: 'pawn' } },
        { id: 'e2', x: 4, y: 6, piece: { id: 21, player_number: 1, type: 'pawn' } },
        { id: 'f2', x: 5, y: 6, piece: { id: 22, player_number: 1, type: 'pawn' } },
        { id: 'g2', x: 6, y: 6, piece: { id: 23, player_number: 1, type: 'pawn' } },
        { id: 'h2', x: 7, y: 6, piece: { id: 24, player_number: 1, type: 'pawn' } },

        { id: 'a1', x: 0, y: 7, piece: { id: 25, player_number: 1, type: 'rook' } },
        { id: 'b1', x: 1, y: 7, piece: { id: 26, player_number: 1, type: 'knight' } },
        { id: 'c1', x: 2, y: 7, piece: { id: 27, player_number: 1, type: 'bishop' } },
        { id: 'd1', x: 3, y: 7, piece: { id: 28, player_number: 1, type: 'queen' } },
        { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
        { id: 'f1', x: 5, y: 7, piece: { id: 30, player_number: 1, type: 'bishop' } },
        { id: 'g1', x: 6, y: 7, piece: { id: 31, player_number: 1, type: 'knight' } },
        { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
      ]  
    }
  }
};

const deepMerge = function(aObject, bObject) {
  let cObject = {};

  let aObjectKeys = [];
  let bObjectKeys = [];

  if (exists(aObject)) {
    aObjectKeys = Object.keys(aObject);
  }

  if (exists(bObject)) {
    bObjectKeys = Object.keys(bObject);
  }

  let keys = [...new Set([...aObjectKeys, ...bObjectKeys])];

  keys.forEach(function(k) {
    let aValue = undefined;
    let bValue = undefined;

    if (exists(aObject)) {
      aValue = aObject[k];
    }

    if (exists(bObject)) {
      bValue = bObject[k];
    }

    let cValue = undefined;

    if (exists(bValue)) {
      if (bValue.constructor === Object) {
        cValue = deepMerge(aValue, bValue); 
      } else { 
        cValue = bValue;
      }
    } else {
      cValue = aValue;
    }

    cObject[k] = cValue;
  });
  return cObject;
};

const fixtures = function(name, customArgs) {
  let definition = fixtureDefinitions[name];
  let args = {};
  if (exists(customArgs)) {
    args = deepMerge(definition.args, customArgs);
  } else {
    args = Object.assign({}, definition.args);
  }
  return new definition.klass(args);
};

export default fixtures

