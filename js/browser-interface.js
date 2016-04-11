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

  var myRender = new Render();

  // Create an ASCII version of any grid, display must be true monospace to work. See DOM if you are having trouble viewing this version of the maze.
  // $('#mazePrint').append(myGrid.toHtmlString());

  $('button[name="binaryMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myBinaryTree = new BinaryTree();
    myBinaryTree.generate(myGrid);
    myRender.simple(myGrid);
  });

  $('button[name="sidewinderMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var mySidewinder = new Sidewinder();
    mySidewinder.generate(myGrid, 0.5);
    myRender.simple(myGrid);
  });

  $('button[name="aldousbroderMaze"]').click(function() {
    var myGrid = new Grid();
    myGrid.setSize(10,10);
    myGrid.initialize();
    console.log("The Grid", myGrid);
    var myAldousBroder = new AldousBroder();
    myAldousBroder.generate(myGrid);
    myRender.simple(myGrid);
  });

});
