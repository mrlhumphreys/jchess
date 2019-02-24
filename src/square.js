import exists from './exists'
import Point from './point'
import PieceFactory from './piece_factory'

class Square {
  constructor(args) { 
    this.constructorName = 'Square';
    this.id = args.id;
    this.x = args.x;
    this.y = args.y;

    if (!exists(args.piece)) {
      this.piece = null;
    } else {
      let pieceFactory = new PieceFactory(args.piece);
      this.piece = pieceFactory.build();
    }
  }

  occupied() {
    return exists(this.piece); 
  }

  unoccupied() {
    return !exists(this.piece); 
  }

  occupiedBy(playerNumber) { 
    return this.occupied() && this.piece.playerNumber == playerNumber;
  }

  point() {
    return new Point(this.x, this.y);
  }

  startingFor(playerNumber) { 
    return this.rankNumber(playerNumber) == 2;
  }

  rankNumber(playerNumber) { 
    if (playerNumber == 1) {
      return (8 - this.y);
    } else {
      return (this.y + 1);
    }
  }

  lastRank(playerNumber) { 
    return this.rankNumber(playerNumber) == 8;
  }

  dup() {
    let _piece = null;

    if (exists(this.piece)) {
      _piece = this.piece.dup();
    }

    let args = {
      id: this.id,
      x: this.x,
      y: this.y
    };

    let _square = new Square(args);
    _square.piece = _piece;
    return _square;
  }
}

export default Square
