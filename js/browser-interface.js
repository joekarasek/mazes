var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;
var BinaryTree = require('./../js/binaryTree.js').BinaryTree;
var Sidewinder = require('./../js/sidewinder.js').Sidewinder;

var render = function(grid) {
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

$(document).ready(function(){

  // $('#mazePrint').append(myGrid.toHtmlString());

  $('button[name="newMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myBinaryTree = new BinaryTree();
    myBinaryTree.generate(myGrid);
    render(myGrid);
  });

  $('button[name="newMaze2"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var mySidewinder = new Sidewinder();
    mySidewinder.generate(myGrid, 0.5);
    render(myGrid);
  });

});
