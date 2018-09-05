//start of Game class
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board (numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex,columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game Over!');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
        console.log('Current Board: ');
        this._board.print();
    } else {
        console.log('You win!');
        this._board.print();
    }
  }
}
//end of Game class

//start of Board class
class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  //start of flipTile method
  flipTile(rowIndex, columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
    }
    if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  //end of flipTile method

  //start of getNumberOfNeighborBombs method
  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [
        [-1 , -1],
        [-1 , 0],
        [-1 , 1],
        [0 , 1],
        [1 , 1],
        [1 , 0],
        [1 , -1],
        [0 , -1]
    ];

    const numberOfRows = this._bombBoard.length;

    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach(neighborOffset => {
      const neighborRowIndex = rowIndex + neighborOffset[0];
      const neighborColumnIndex = columnIndex + neighborOffset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
    });
      return numberOfBombs;
    }
  //end of getNumberOfNeighborBombs method

  //start of hasSafeTiles method
  hasSafeTiles(){
    return  this._numberOfTiles !== this._numberOfBombs;
  }
  //end of hasSafeTiles method

  //start of printBoard method
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  //end of printBoard method

  //start of generatePlayerBoard method
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }
  //end of generatePlayerBoard method

  //start of generateBombBoard method
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs){
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B'){
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
      }
    }
    return board;
  }
  //end of generateBombBoard method
}
//end of Board class
