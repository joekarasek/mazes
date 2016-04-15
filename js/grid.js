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

// Get a random cell from the grid
Grid.prototype.sample = function() {
  var randomRow = Math.floor((Math.random() * this.rows) + 1);
  var randomCol = Math.floor((Math.random() * this.cols) + 1);
  return this.getCell(randomRow, randomCol);
}

// Get a row of the grid
Grid.prototype.getRow = function(row) {
  var isInGrid = (row >= 0 && row < this.rows);
  if (isInGrid) {
    return this.cells[row];
  } else {
    return false;
  }
}

// Get all cells, as an array
Grid.prototype.getAll = function() {
  var results = [];
  for (i=0; i<this.rows; i++) {
    for (j=0; j<this.cols; j++) {
      results.push( this.getCell(i,j) );
    }
  }
  return results;
}

// Get the total number of cells in the grid
Grid.prototype.size = function() {
  return this.getAll().length;
}

// End: Getters
// =================================
// Start: Displayers

// Simple text version of maze, suggest you use monospace font-family
Grid.prototype.toHtmlString = function() {
  var result = '<p>+';

  // Build top border
  for(i=0; i<this.cols; i++) {
    result += "---+";
  }
  result += '</p>';

  // Build by row
  for(i=0; i<this.rows; i++) {
    // West map border
    result += "<p>|";
    // Draw cells and east/west walls
    for(j=0; j<this.cols; j++) {
      if(this.getCell(i,j).isLinked(this.getCell(i, j+1))) {
        result += "    ";
      } else {
        result += "   |";
      }
    }
    // West map border
    result += "</p><p>+";
    // Draw north/south walls
    for(j=0; j<this.cols; j++) {
      if(this.getCell(i,j).isLinked(this.getCell(i+1, j))) {
        result += "   +";
      } else {
        result += "---+";
      }
    }
    result += "</p>";
  }

  return result;
}

// End: Displayers
// =================================
// Start: Distance/Dijkstra

Grid.prototype.clearDistance = function() {
  for (i=0; i<this.rows; i++) {
    for (j=0; j<this.cols; j++) {
      this.cells[i][j].distance = null;
    }
  }
}

Grid.prototype.setDijkstra = function(rootCell) {
  rootCell.distance = 0;
  var frontier = [rootCell];

  while (frontier.length > 0) {
    var newFrontier = [];

    frontier.forEach(function(cell) {
      cell.links.forEach(function(linkedCell) {
        if (linkedCell.distance === null) {
          linkedCell.distance = cell.distance + 1;
          newFrontier.push(linkedCell);
        }
      })
    })
    frontier = newFrontier;
  }
}

exports.Grid = Grid;
