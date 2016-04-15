// Objects
var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

// Rendering
var Render = require('./../js/render.js').Render;

// Maze Algorithms
var BinaryTree = require('./../js/binaryTree.js').BinaryTree;
var Sidewinder = require('./../js/sidewinder.js').Sidewinder;
var AldousBroder = require('./../js/aldousBroder.js').AldousBroder;


$(document).ready(function(){

  // Instantiate rendering engine
  var myRender = new Render();

  // Set default grid size
  var width = 40;
  var height = 40;

  // Keep width and height updated with slider inputs
  $('input[name="rows"]').change(function() {
    width = $('input[name="rows"]').val();
    $('label[for="rows"]').text('Rows: ' + width);
  });
  $('input[name="cols"]').change(function() {
    height = $('input[name="cols"]').val();
    $('label[for="cols"]').text('Columns: ' + height);
  });

  // Create an ASCII version of any grid, display must be true monospace to work. See DOM if you are having trouble viewing this version of the maze.
  // $('#mazePrint').append(myGrid.toHtmlString());

  $('button[name="binaryMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(width,height);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myBinaryTree = new BinaryTree();
    myBinaryTree.generate(myGrid);
    myGrid.clearDistance();
    myGrid.setDijkstra(myGrid.cells[0][0]);
    myRender.flexible(myGrid);
  });

  $('button[name="sidewinderMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(width,height);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var mySidewinder = new Sidewinder();
    mySidewinder.generate(myGrid, 0.5);
    myRender.flexible(myGrid);
  });

  $('button[name="aldousbroderMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(width,height);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myAldousBroder = new AldousBroder();
    myAldousBroder.generate(myGrid);
    myRender.flexible(myGrid);
  });

});
