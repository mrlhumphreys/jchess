# JChess

A chess game state and validation library written in Javascript.

## Installation

Install via npm:

  $ npm install @mrlhumphreys/jchess

## Usage

ES5:

```javascript
  var Match = require('@mrlhumphreys/jchess').Match;
```

ES6:

```javascript
  import { Match } from '@mrlhumphreys/jchess'
```

Initialize a new match object:

```javascript 
  var match = new Match({
    id: 1,
    game_state: {
      current_player_number: 1,
      last_double_step_pawn_id: null,
      squares: [
        { 
          id: 'a8', 
          x: 0, 
          y: 0, 
          piece: {
            id: 1, 
            player_number: 1, 
            type: 'pawn' 
          }
        },
        ...
      ] 
    },
    players: [
      { player_number: 1, name: 'aaa' },
      { player_number: 2, name: 'bbb' }
    ],
    winner: null
  });
```

Serialize match

```javascript
  match.asJson;
```

Make Move

```javascript
  playerNumber = 1;
  match.touchSquare('e2', playerNumber); // select piece at e2
  match.touchSquare('e4', playerNumber); // move piece to e4 
```

Select Piece Type to Promote

```javascript
  playerNumber = 1;
  match.touchSquare('e7', playerNumber); // select piece at e7
  match.touchSquare('e8', playerNumber); // move piece to e8 
  match.touchPromotionPiece('queen', playerNumber); // promote to queen
```

Get winner

```javascript
  match.winner
```

## Development

After checkout out the repo, run `npm install` to install dependencies. Run `npm build` to transpile ES6 to ES5 into the lib directory. Run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mrlhumphreys/jchess. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
