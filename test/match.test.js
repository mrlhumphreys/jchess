import fixtures from './fixtures'
import Queen from '../src/queen'

describe('match', () => {
  describe('initialize', () => {
    describe('with no winner', () => {
      it('sets the notification to a players turn message', () => {
        let match = fixtures('match');
        expect(match.notification).toEqual('aaa to move');
      });
    });
    
    describe('with winner', () => {
      it('sets the notification to winner message', () => {
        let match = fixtures('winnerMatch');
        expect(match.notification).toEqual('bbb wins');
      });
    });
  });

  describe('asJson', () => {
    it('must return match as json', () => {
      let match = fixtures('match');
      expect(match.asJson).toEqual({
        id: 1,
        current_move: {},
        promotion: false,
        game_state: {
          current_player_number: 1,
          last_double_step_pawn_id: null,
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
          ]  
        },
        players: [
          { player_number: 1, name: 'aaa', resigned: false },
          { player_number: 2, name: 'bbb', resigned: false }
        ],
        last_action: {}, 
        notification: 'aaa to move' 
      });
    });
  });

  describe('winner', () => {
    describe('with someone winning on the board', () => {
      it('must return the number of the winner', () => {
        let match = fixtures('winnerMatch');
        expect(match.winner).toEqual(2);
      });
    });

    describe('with no one winning on the board', () => {
      it('must return null', () => {
        let match = fixtures('match');
        expect(match.winner).toBe(null);
      });
    });

    describe('with someone resigining', () => {
      it('must return the number of the player who did not resign', () => {
        let match = fixtures('resignedMatch');
        expect(match.winner).toEqual(2);
      });
    });
  });

  describe('capturedSquareId', () => {
    it('must return captured square id from game state', () => {
      let match = fixtures('match', {
        game_state: {
          current_player_number: 2,
          squares: [
            { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
            { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
            { id: 'b8', x: 1, y: 0, piece: { id: 17 , player_number: 1, type: 'pawn' } },
            { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } }
          ]
        }
      });

      let from = match.gameState.findSquare('a8');
      let to = match.gameState.findSquare('b8');

      expect(match.capturedSquareId(from, to)).toEqual('b8')
    });
  });

  describe('rookCastleMove', () => {
    it('must return the rook castle move from game state', () => {
      let match = fixtures('match', {
        game_state: {
          squares: [
            { id: 'e8', x: 4, y: 0, piece: { id: 5, player_number: 2, type: 'king' } },
            { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
            { id: 'f1', x: 5, y: 7, piece: null },
            { id: 'g1', x: 6, y: 7, piece: null },
            { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
          ]
        }
      });

      let from = match.gameState.findSquare('e1');
      let to = match.gameState.findSquare('g1');
      
      expect(match.rookCastleMove(from, to)).toEqual({fromId: 'h1', toId: 'f1'}); 
    });
  });

  describe('pawnMoveToLastRank', () => {
    it('must return pawn move to last rank from game state', () => {
      let match = fixtures('toPromoteMatch');
      let from = match.gameState.findSquare('a7');
      let to = match.gameState.findSquare('a8');
      expect(match.pawnMoveToLastRank(from, to)).toBe(true); 
    });
  });

  describe('touchSquare', () => {
    describe('with a last action', () => {
      it('clears last action', () => {
        let match = fixtures('match', { last_action: { kind: 'misc', data: { a: 1 } } });
        match.touchSquare('d3',1);
        expect(match.lastAction).toBe(null);
      });
    });

    describe('with a winner', () => {
      it('notifies with a message', () => {
        let match = fixtures('winnerMatch');
        match.touchSquare(1, 1);
        expect(match.notification).toEqual('Game is over.');
      });
    });

    describe('not the players turn', () => {
      it('notifies with a message', () => {
        let match = fixtures('match', { game_state: { current_player_number: 2 } });
        match.touchSquare('d3', 1);
        expect(match.notification).toEqual('It is not your turn.');
      });
    });

    describe('with a square selected', () => {
      describe('and piece can move', () => {
        describe('and move puts piece in check', () => {
          it('notifies with a message', () => {
            let match = fixtures('moveToCheckMatch');
            match.touchSquare('a1', 1);
            expect(match.notification).toEqual('Move puts king in check.');
          });
        });

        describe('and move does not puts piece in check', () => {
          it('moves the piece', () => {
            let match = fixtures('moveMatch');
            match.touchSquare('d3', 1);
            let from = match.gameState.findSquare('d2');
            let to = match.gameState.findSquare('d3');
            expect(from.piece).toBe(null);
            expect(to.piece).not.toBe(null);
          });

          it('deselects the piece', () => {
            let match = fixtures('moveMatch');
            match.touchSquare('d3', 1);
            let piece = match.gameState.findSquare('d3').piece;
            expect(piece.selected).toBe(false);
          });

          it('passes the turn', () => {
            let match = fixtures('moveMatch');
            match.touchSquare('d3', 1);
            expect(match.gameState.currentPlayerNumber).toEqual(2); 
          });

          describe('when promoting', () => {
            it('sets up promotion', () => {
              let match = fixtures('toPromoteMatch');
              match.touchSquare('a8', 1);
              expect(match.promotion).toBe(true);
              expect(match.currentMove).toEqual({ fromId: 'a7', toId: 'a8' });
            });
          });

          describe('when not promoting', () => {
            it('adds move to last action', () => {
              let match = fixtures('moveMatch');
              match.touchSquare('d3', 1);
              expect(match.lastAction).toEqual({ kind: 'move', data: { fromId: 'd2', toId: 'd3' } });
            });
          });
        });
      });

      describe('and piece cannot move', () => {
        it('notifies with a message', () => {
          let match = fixtures('moveMatch');
          match.touchSquare('c3', 1);
          expect(match.notification).toEqual('Invalid move.');
        });

        it('deselects the piece', () => {
          let match = fixtures('moveMatch');
          match.touchSquare('c3', 1);
          let square = match.gameState.selectedSquare;
          expect(square).toBe(undefined);
        });
      });
    });

    describe('with no square selected', () => {
      describe('and touched square is unoccupied', () => {
        it('notifies with a message', () => {
          let match = fixtures('match');
          match.touchSquare('d3', 1);
          expect(match.notification).toEqual('The square is empty.');
        });
      });

      describe('and touched square occupied by opponent', () => {
        it('notifies with a message', () => {
          let match = fixtures('match');
          match.touchSquare('b7', 1);
          expect(match.notification).toEqual('That piece is not yours.');
        });
      });

      describe('and piece can move', () => {
        it('selects the piece', () => {
          let match = fixtures('match');
          match.touchSquare('d2', 1);
          let square = match.gameState.findSquare('d2');
          expect(square.piece.selected).toBe(true);
        });
      });

      describe('and piece cannot move', () => {
        it('notifies with a message', () => {
          let match = fixtures('match');
          match.touchSquare('a1', 1);
          expect(match.notification).toEqual('Piece cannot move.');
        });
      });
    });
  });

  describe('touchPromotionPiece', () => {
    it('promotes the pawn', () => {
      let match = fixtures('promotionMatch');
      match.touchPromotionPiece('queen', 1);
      let square = match.gameState.findSquare('a8');
      expect(square.piece.type).toEqual('queen');
    });

    it('adds move to last action', () => {
      let match = fixtures('promotionMatch');
      match.touchPromotionPiece('queen', 1);
      expect(match.lastAction).toEqual({kind: 'move', data: { fromId: 'a7', toId: 'a8', pieceType: 'queen' } });
    });

    it('tears down the promotion', () => {
      let match = fixtures('promotionMatch');
      match.touchPromotionPiece('queen', 1);
      expect(match.promotion).toBe(false);
      expect(match.currentMove).toEqual({});
    });
  });
});
