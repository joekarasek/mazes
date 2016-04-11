(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function AldousBroder() {

}

AldousBroder.prototype.generate = function(grid) {
  var cell = grid.sample();
  var unvisited = grid.size() - 1;

  while (unvisited > 0) {
    var neighbor = cell.sampleNeighbor();

    // debugger;
    // console.log(cell);

    if (neighbor.links.length === 0) {
      cell.link(neighbor);
      unvisited--;
    }

    cell = neighbor;
  }
};

exports.AldousBroder = AldousBroder;

},{"./../js/cell.js":3,"./../js/grid.js":4}],2:[function(require,module,exports){
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function BinaryTree() {
}

BinaryTree.prototype.generate = function(grid) {
  var cells = grid.getAll();
  cells.forEach(function(cell) {
    var choices = [];
    if (cell.neighbors.north) {
      choices.push(cell.neighbors.north);
    }
    if (cell.neighbors.east) {
      choices.push(cell.neighbors.east);
    }

    if (choices.length>0) {
      var choice = choices[ Math.floor((Math.random() * choices.length)) ];
      cell.link(choice);
    }

  });
};

exports.BinaryTree = BinaryTree;

},{"./../js/cell.js":3,"./../js/grid.js":4}],3:[function(require,module,exports){
// ============================
// Cell Object Declaractions
// ============================
// Note: "linked" cells are cells that have a passage between them

function Cell() {
  this.row = -1;
  this.col = -1;

  this.neighbors = {
    north: null,
    east: null,
    west: null,
    south: null
  };

  this.links = [];
}

// Set a cell as a neighbor of this cell
Cell.prototype.addNeighbor = function(cell, relation) {
  this.neighbors[relation] = cell;
}
// Bidirectional linking of cells
Cell.prototype.link = function(cell) {
  if (this.links.indexOf(cell) === -1) {
    this.links.push(cell);
    cell.link(this);
  }
};

// Bidirectional unlinking of cells
Cell.prototype.unlink = function(cell) {
  var indexOfCell = this.links.indexOf(cell);
  if (indexOfCell >= 0) {
    this.links.splice(indexOfCell, 1);
    cell.unlink(this);
  }
};

// Query if queryCell is linked to this cell
Cell.prototype.isLinked = function(queryCell) {
  if(this.links.indexOf(queryCell) === -1) {
    return false;
  } else {
    return true;
  }
}

// Sample a neighbor
Cell.prototype.sampleNeighbor = function() {
  var keys = ['north','east','south','west'];
  var index;
  do {
    index = Math.floor(Math.random() * 4);
  } while (!this.neighbors[keys[index]]);
  return this.neighbors[keys[index]];
}


exports.Cell = Cell;

},{}],4:[function(require,module,exports){
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
Grid.prototype.toHtmlString= function() {
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

exports.Grid = Grid;

},{"./../js/cell.js":3}],5:[function(require,module,exports){
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function Render() {
}

Render.prototype.simple = function(grid) {
  var canvas = document.getElementById('maze');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";
  ctx.clearRect(0,0,800,800);

  var cells = grid.getAll();

  // Draw walls
  ctx.fillStyle = "black";
  cells.forEach(function(cell) {
    var row = cell.row;
    var col = cell.col;
    ctx.strokeRect(col*80+5,row*80+5,70,70);

    ctx.fillRect(col*80,row*80,80,5);
    ctx.fillRect(col*80,row*80,5,80);
    ctx.fillRect(col*80+75,row*80,5,80);
    ctx.fillRect(col*80,row*80+75,80,5);

  });

  // Draw passages
  ctx.fillStyle = "white";
  cells.forEach(function(cell) {
    var row = cell.row;
    var col = cell.col;
    // Draw east/west passage
    if(cell.isLinked(cell.neighbors['east'])) {
      // ctx.fillRect(70,20,20,40);
      ctx.fillRect(col*80+70,row*80+6,20,68);
    }
    // Draw sout/north passage
    if(cell.isLinked(cell.neighbors['south'])) {
      // ctx.fillRect(20,70,40,20);
      ctx.fillRect(col*80+6,row*80+70,68,20);
    }
    // debugger;
  });
}

exports.Render = Render;

},{"./../js/cell.js":3,"./../js/grid.js":4}],6:[function(require,module,exports){
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function Sidewinder() {

}

// Gird is the cell grid for the given maze. Param is variable between 0 and 1 that determines the frequency of 'sidewiding'
Sidewinder.prototype.generate = function(grid, param) {
  grid.cells.forEach(function(row) {
    var run = [];

    row.forEach(function(cell) {
      run.push(cell);

      var at_eastern_boundary = (cell.neighbors.east == null);
      var at_northern_boundary = (cell.neighbors.north == null);

      should_close_out = at_eastern_boundary || (!at_northern_boundary && Math.random() < param);

      if (should_close_out) {
        var index = Math.floor(Math.random()*run.length);
        if (run[index].neighbors.north) {
          run[index].link(run[index].neighbors.north);
        }
        run = [];
      } else {
        cell.link(cell.neighbors.east);
      }
    });
  });
}

exports.Sidewinder = Sidewinder;

},{"./../js/cell.js":3,"./../js/grid.js":4}],7:[function(require,module,exports){
// Objects
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

// Rendering
var Render = require('./../js/render.js').Render;

// Maze Algorithms
var BinaryTree = require('./../js/binaryTree.js').BinaryTree;
var Sidewinder = require('./../js/sidewinder.js').Sidewinder;
var AldousBroder = require('./../js/aldousBroder.js').AldousBroder;
//
// var render = function(grid) {
//   var canvas = document.getElementById('maze');
//   var ctx = canvas.getContext('2d');
//   ctx.fillStyle = "white";
//   ctx.clearRect(0,0,800,800);
//
//   var cells = grid.getAll();
//
//   // Draw walls
//   ctx.fillStyle = "black";
//   cells.forEach(function(cell) {
//     var row = cell.row;
//     var col = cell.col;
//     ctx.strokeRect(col*80+5,row*80+5,70,70);
//
//     ctx.fillRect(col*80,row*80,80,5);
//     ctx.fillRect(col*80,row*80,5,80);
//     ctx.fillRect(col*80+75,row*80,5,80);
//     ctx.fillRect(col*80,row*80+75,80,5);
//
//   });
//
//   // Draw passages
//   ctx.fillStyle = "white";
//   cells.forEach(function(cell) {
//     var row = cell.row;
//     var col = cell.col;
//     // Draw east/west passage
//     if(cell.isLinked(cell.neighbors['east'])) {
//       // ctx.fillRect(70,20,20,40);
//       ctx.fillRect(col*80+70,row*80+6,20,68);
//     }
//     // Draw sout/north passage
//     if(cell.isLinked(cell.neighbors['south'])) {
//       // ctx.fillRect(20,70,40,20);
//       ctx.fillRect(col*80+6,row*80+70,68,20);
//     }
//     // debugger;
//   });
// }

$(document).ready(function(){

  var myRender = new Render();

  // $('#mazePrint').append(myGrid.toHtmlString());

  $('button[name="newMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myBinaryTree = new BinaryTree();
    myBinaryTree.generate(myGrid);
    myRender.simple(myGrid);
  });

  $('button[name="newMaze2"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var mySidewinder = new Sidewinder();
    mySidewinder.generate(myGrid, 0.5);
    myRender.simple(myGrid);
  });

  $('button[name="newMaze3"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myAldousBroder = new AldousBroder();
    myAldousBroder.generate(myGrid);
    myRender.simple(myGrid);
  });

});

},{"./../js/aldousBroder.js":1,"./../js/binaryTree.js":2,"./../js/cell.js":3,"./../js/grid.js":4,"./../js/render.js":5,"./../js/sidewinder.js":6}]},{},[7]);
