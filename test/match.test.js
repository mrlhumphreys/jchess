import fixtures from './fixtures'
import Queen from '../src/queen'

describe('match', () => {
  describe('selectedSquare', () => {
    it('must return the selected square from game state', () => {
      let match = fixtures('match', {
        game_state: {
          squares: [
            { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
            { id: 'b8', x: 1, y: 0, piece: { id: 2, player_number: 2, type: 'knight', selected: true } },
          ]
        }
      });

      expect(match.selectedSquare().id).toEqual('b8'); 
    });
  });

  describe('findSquare', () => {
    it('must return the find square from game state', () => {
      let match = fixtures('match');

      expect(match.findSquare('a8').id).toEqual('a8');
    });
  });

  describe('currentPlayerName', () => {
    it('must return the name of the current player', () => {
      let match = fixtures('match');

      expect(match.currentPlayerName()).toEqual('aaa');
    });
  });

  describe('playerName', () => {
    it('must return the name of the specified player', () => {
      let match = fixtures('match');

      expect(match.playersName(2)).toEqual('bbb');
    });
  });

  describe('playersTurn', () => {
    it('must return true if it is their turn', () => {
      let match = fixtures('match');

      expect(match.playersTurn(1)).toBe(true);
    });

    it('must return false if it is their turn', () => {
      let match = fixtures('match');

      expect(match.playersTurn(2)).toBe(false);
    });
  });

  describe('winnerName', () => {
    it('must return the name of the winner if there is one', () => {
      let match = fixtures('match', { winner: 1 });  
     
      expect(match.winnerName()).toEqual('aaa'); 
    });

    it('must return null if there is no winner', () => {
      let match = fixtures('match', { winner: null });

      expect(match.winnerName()).toBe(null);
    });
  });

  describe('canMoveFrom', () => {
    it('must return canMoveFrom from game state', () => {
      let match = fixtures('match');
      let from = match.findSquare('a2');

      expect(match.canMoveFrom(from)).toBe(true);      
    });
  });

  describe('canMove', () => {
    it('must return canMove from game state', () => {
      let match = fixtures('match');
      let from = match.findSquare('a2');
      let to = match.findSquare('a3');

      expect(match.canMove(from, to)).toBe(true); 
    });
  });

  describe('capturedSquareId', () => {
    it('must return captured square id from game state', () => {
      let match = fixtures('match', {
        game_state: {
          current_player_number: 2,
          squares: [
            { id: 'a8', x: 0, y: 0, piece: { id: 1, player_number: 2, type: 'rook' } },
            { id: 'b8', x: 1, y: 0, piece: { id: 17 , player_number: 1, type: 'pawn' } },
          ]
        }
      });

      let from = match.findSquare('a8');
      let to = match.findSquare('b8');

      expect(match.capturedSquareId(from, to)).toEqual('b8')
    });
  });

  describe('rookCastleMove', () => {
    it('must return the rook castle move from game state', () => {
      let match = fixtures('match', {
        game_state: {
          squares: [
            { id: 'e1', x: 4, y: 7, piece: { id: 29, player_number: 1, type: 'king' } },
            { id: 'f1', x: 5, y: 7, piece: null },
            { id: 'g1', x: 6, y: 7, piece: null },
            { id: 'h1', x: 7, y: 7, piece: { id: 32, player_number: 1, type: 'rook' } }
          ]
        }
      });

      let from = match.findSquare('e1');
      let to = match.findSquare('g1');
      
      expect(match.rookCastleMove(from, to)).toEqual({fromId: 'h1', toId: 'f1'}); 
    });
  });

  describe('pawnMoveToLastRank', () => {
    it('must return pawn move to last rank from game state', () => {
      let match = fixtures('match', {
        game_state: {
          squares: [
            { id: 'a8', x: 0, y: 0, piece: null },
            { id: 'a7', x: 0, y: 1, piece: { id: 17, player_number: 1, type: 'pawn' } },
          ]
        }
      });

      let from = match.findSquare('a7');
      let to = match.findSquare('a8');

      expect(match.pawnMoveToLastRank(from, to)).toBe(true); 
    });
  });

  describe('selectPiece', () => {
    it('must select a piece', () => {
      let match = fixtures('match');
      match.selectPiece('d7');
      let square = match.findSquare('d7');
      expect(square.piece.selected).toBe(true);
    });
  });

  describe('deselectPiece', () => {
    it('must deselect a piece', () => {
      let match = fixtures('match', {
        game_state: {
          squares: [
            { id: 'd7', x: 3, y: 1, piece: { id: 12, player_number: 2, type: 'pawn', selected: true } } 
          ]
        }
      });
      match.deselectPiece('d7');
      let square = match.findSquare('d7');
      expect(square.piece.selected).toBe(false);
    });
  });

  describe('move', () => {
    it('must move the piece', () => {
      let match = fixtures('match');
      match.move('d2', 'd3');
      let from = match.findSquare('d2');
      let to = match.findSquare('d3');
      expect(from.occupied()).toBe(false);
      expect(to.occupied()).toBe(true);
    });
  });

  describe('setupPromotion', () => {
    it('must set the currentMove', () => {
      let match = fixtures('match');
      let move = { fromId: 'd2', toId: 'd3' };
      match.setupPromotion(move.fromId, move.toId);
      expect(match.currentMove).toEqual(move);
    });

    it('must set the promotion to true', () => {
      let match = fixtures('match');
      match.setupPromotion('d2', 'd3');
      expect(match.promotion).toBe(true);
    });
  });

  describe('teardownPromotion', () => {
    it('must set the currentMove to null', () => {
      let match = fixtures('match', {
        currentMove: { fromId: 'd2', toId: 'd3' },
        promotion: true
      });
      match.teardownPromotion();
      expect(match.currentMove).toEqual({});
    });

    it('must set the promotion to false', () => {
      let match = fixtures('match', {
        currentMove: { fromId: 'd2', toId: 'd3' },
        promotion: true
      });
      match.teardownPromotion();
      expect(match.promotion).toBe(false);
    });
  });

  describe('promote', () => {
    it('must promote the piece', () => {
      let match = fixtures('match');

      match.promote('a8', 'queen');

      let square = match.findSquare('a8');
      expect(square.piece.constructor).toEqual(Queen);
    });
  });
});
