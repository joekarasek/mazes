var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function Render() {
}

Render.prototype.flexible = function(grid) {
  // Initialize canvas and drawing tool
  var canvas = document.getElementById('maze');
  var ctx = canvas.getContext('2d');

  // Get all the cells of the maze
  var cells = grid.getAll();
  // Set variables for flexible drawing
  var canvasWidth = 800;
  var canvasHeight = 800;
  var rows = grid.rows;
  var cols = grid.cols;
  var cellWidth = canvasWidth/cols;
  var cellHeight = canvasHeight/rows;

  // Clear the canvas
  ctx.fillStyle = "white";
  ctx.clearRect(0,0,canvasWidth,canvasHeight);

  // Draw walls
  ctx.fillStyle = "black";
  cells.forEach(function(cell) {
    var row = cell.row;
    var col = cell.col;
    // Draw east/west passage
    if(!cell.isLinked(cell.neighbors['east'])) {
      ctx.strokeRect((col+1)*cellWidth,row*cellHeight,1,cellHeight);
    }
    // Draw sout/north passage
    if(!cell.isLinked(cell.neighbors['south'])) {
      ctx.strokeRect(col*cellWidth,(row+1)*cellHeight,cellWidth,1);
    }
  });
}

// Render.prototype.

exports.Render = Render;
