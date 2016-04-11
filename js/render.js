var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

function Render() {
}

// Render.prototype.simple = function(grid) {
//   // Initialize canvas and drawing tool
//   var canvas = document.getElementById('maze');
//   var ctx = canvas.getContext('2d');
//   // Clear the canvas
//   ctx.fillStyle = "white";
//   ctx.clearRect(0,0,800,800);
//
//   // Get all the cells of the maze
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
//       ctx.fillRect(col*80+70,row*80+6,20,68);
//     }
//     // Draw sout/north passage
//     if(cell.isLinked(cell.neighbors['south'])) {
//       ctx.fillRect(col*80+6,row*80+70,68,20);
//     }
//   });
// }

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
  ctx.fillStyle = "green";
  cells.forEach(function(cell) {
    var row = cell.row;
    var col = cell.col;
    ctx.strokeRect(col*cellWidth,row*cellHeight,cellWidth,cellHeight);
  });

  // Draw passages
  ctx.fillStyle = "white";
  cells.forEach(function(cell) {
    var row = cell.row;
    var col = cell.col;
    // Draw east/west passage
    if(cell.isLinked(cell.neighbors['east'])) {
      ctx.fillRect((col+1)*cellWidth-1,row*cellHeight+1,2,cellHeight-2);
    }
    // Draw sout/north passage
    if(cell.isLinked(cell.neighbors['south'])) {
      ctx.fillRect(col*cellWidth+1,(row+1)*cellHeight-1,cellWidth-2,2);
    }
  });
}

exports.Render = Render;
