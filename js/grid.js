// =================================
// Required files

var Cell = require('./../js/cell.js').Cell;


// =================================
// Initializers

function Grid() {
  this.rows = 1;
  this.cols = 1;
  this.cells = [];
}

// Initialize the grid with new cells (cells have no neighbors assigned)
Grid.prototype.setSize = function(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  for (i=0; i<this.rows; i++) {
    this.cells.push([]);
    for (j=0; j<this.cols; j++) {
      this.cells[i][j] = new Cell();
      this.cells[i][j].row = i;
      this.cells[i][j].col = j;
    }
  }
}

// Move through the grid and give each cell any initial properties needed (many neighbors)
Grid.prototype.initialize = function() {
  for (i=0; i<this.rows; i++) {
    for (j=0; j<this.cols; j++) {
      // Set's neighbors for each cell. Note: this function is subclassed to allow future modifications
      this.setNeighbors(this.getCell(i,j));
    }
  }
}

// Used by initialize to set neighbors of all cells, configed to work with square cells
Grid.prototype.setNeighbors = function(cell) {
  var row = cell.row;
  var col = cell.col;

  if (this.getCell(row-1, col)) {
    cell.addNeighbor(this.getCell(row-1, col), 'north');
  }
  if (this.getCell(row, col-1)) {
    cell.addNeighbor(this.getCell(row, col-1), 'west');
  }
  if (this.getCell(row+1, col)) {
    cell.addNeighbor(this.getCell(row+1, col), 'south');
  }
  if (this.getCell(row, col+1)) {
    cell.addNeighbor(this.getCell(row, col+1), 'east');
  }
}

// End: Initializers
// =================================
// Start: Getters

// Get a cell by x-coord and y-coord
Grid.prototype.getCell = function(row,col) {
  var isInGrid = (row >= 0 && row < this.rows && col >= 0 && col < this.cols);
  if (isInGrid) {
    return this.cells[row][col];
    // Eventually for maps that are not fully populated
    // return this.cells[row][col] ? this.cells[row][col] : false;
  } else {
    return false;
  }
};

// Get a row of the grid
Grid.prototype.getRow = function(row) {
  var isInGrid = (row >= 0 && row < this.rows);
  if (isInGrid) {
    return this.cells[row];
  } else {
    return false;
  }
}

// Get a random cell from the grid
Grid.prototype.sample = function() {
  var randomRow = Math.floor((Math.random() * this.rows) + 1);
  var randomCol = Math.floor((Math.random() * this.cols) + 1);
  return this.getCell(randomRow, randomCol);
}

exports.Grid = Grid;
