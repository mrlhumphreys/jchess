import Move from '../src/move'
import Rook from '../src/rook'
import Square from '../src/square'
import SquareSet from '../src/square_set'
import GameState from '../src/game_state'
import fixtures from './fixtures'

describe('Move', () => {
  describe('result', () => {
    describe('when there is a winner', () => {
      it('must return a game over result', () => {
        let match = fixtures('winnerMatch');
        let move = new Move({touchedId: 'a1', playerNumber: 1, match: match});
        let result = move.result;

        expect(result.name).toEqual('GameOver');
        expect(result.message).toEqual('Game is over.');
      });
    });

    describe('when it is not the players turn', () => {
      it('must return a not players turn result', () => {
        let match = fixtures('match');
        let move = new Move({touchedId: 'd7', playerNumber: 2, match: match});
        let result = move.result;

        expect(result.name).toEqual('NotPlayersTurn');
        expect(result.message).toEqual('It is not your turn.');
      });
    });

    describe('when piece is selected', () => {
      describe('when piece puts king in check', () => {
        it('returns a move puts king in check result', () => {
          let match = fixtures('moveToCheckMatch');
          let move = new Move({touchedId: 'a1', playerNumber: 1, match: match});
          let result = move.result;

          expect(result.name).toEqual('KingInCheck');
          expect(result.message).toEqual('Move puts king in check.');
        });
      });

      describe('when piece cannot move', () => {
        it('returns a move invalid result', () => {
          let match = fixtures('selectedMatch');
          let move = new Move({ touchedId: 'e5', playerNumber: 1, match: match });
          let result = move.result;

          expect(result.name).toEqual('MoveInvalid');
          expect(result.message).toEqual('Piece cannot move.');
        });
      });

      describe('when piece can move and pawn moves to last rank', () => {
        it('returns a promotion result', () => {
          let match = fixtures('toPromoteMatch');
          let move = new Move({ touchedId: 'a8', playerNumber: 1, match: match});
          let result = move.result;

          expect(result.name).toEqual('PawnMovesToLastRank');
          expect(result.message).toEqual('Pawn can promote.');
        });
      });

      describe('when piece can move', () => {
        it('returns a move valid result', () => {
          let match = fixtures('selectedMatch');
          let move = new Move({ touchedId: 'e4', playerNumber: 1, match: match});
          let result = move.result;

          expect(result.name).toEqual('MoveValid');
          expect(result.message).toEqual('');
        });
      });
    });

    describe('when piece is not selected', () => {
      describe('from does not exist', () => {
        it('returns a square not found error', () => {
          let match = fixtures('match');
          let move = new Move({ touchedId: null, playerNumber: 1, match: match });
          let result = move.result;

          expect(result.name).toEqual('SquareNotFound');
          expect(result.message).toEqual('Square does not exist.');
        });
      });

      describe('from is unoccupied', () => {
        it('returns a empty square result', () => {
          let match = fixtures('match');
          let move = new Move({ touchedId: 'a6', playerNumber: 1, match: match });
          let result = move.result;

          expect(result.name).toEqual('EmptySquare');
          expect(result.message).toEqual('Square is empty.');
        });
      });

      describe('from is occupied by opponent', () => {
        it('returns a piece ownership mismatch result', () => {
          let match = fixtures('match');
          let move = new Move({ touchedId: 'e7', playerNumber: 1, match: match });
          let result = move.result;

          expect(result.name).toEqual('PieceOwnershipMismatch');
          expect(result.message).toEqual('Piece is owned by opponent.');
        });
      });

      describe('piece cannot move', () => {
        it('returns a move impossible result', () => {
          let match = fixtures('match');
          let move = new Move({ touchedId: 'a1', playerNumber: 1, match: match });
          let result = move.result;

          expect(result.name).toEqual('MoveImpossible');
          expect(result.message).toEqual('Piece cannot move.');
        });
      });

      describe('piece can move', () => {
        it('returns a move possible result', () => {
          let match = fixtures('match');
          let move = new Move({touchedId: 'd2', playerNumber: 1, match: match});
          let result = move.result;

          expect(result.name).toEqual('MovePossible');
          expect(result.message).toEqual('');
        });
      });
    });
  });
});
