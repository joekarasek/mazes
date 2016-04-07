var Cell = require('./../js/cell.js').Cell;

function Grid() {
  this.rows = 1;
  this.cols = 1;
  this.cells = [];
}

// Get a cell by x-coord and y-coord
Grid.prototype.cell = function(row,col) {
  var isInGrid = (row >= 0 && row < this.rows && col >= 0 && col < this.cols);
  if (isInGrid) {
    return this.cells[row][col];
    // Eventually for maps that are not fully populated
    // return this.cells[row][col] ? this.cells[row][col] : false;
  } else {
    return false;
  }
};

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
      this.setNeighbors(this.cell(i,j));
    }
  }
}

// Used by initialize to set neighbors of all cells, configed to work with square cells
Grid.prototype.setNeighbors = function(cell) {
  var row = cell.row;
  var col = cell.col;

  if (this.cell(row-1, col)) {
    cell.addNeighbor(this.cell(row-1, col), 'north');
  }
  if (this.cell(row, col-1)) {
    cell.addNeighbor(this.cell(row, col-1), 'west');
  }
  if (this.cell(row+1, col)) {
    cell.addNeighbor(this.cell(row+1, col), 'south');
  }
  if (this.cell(row, col+1)) {
    cell.addNeighbor(this.cell(row, col+1), 'east');
  }
}

exports.Grid = Grid;
