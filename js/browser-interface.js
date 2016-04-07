var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;
var BinaryTree = require('./../js/binaryTree.js').BinaryTree;

$(document).ready(function(){
  var myGrid = new Grid();
  myGrid.setSize(3,3);
  myGrid.initialize();
  console.log("The Grid", myGrid);
  var myBinaryTree = new BinaryTree();
  myBinaryTree.generate(myGrid);
  debugger;
});
