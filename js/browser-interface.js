var Grid = require('./../js/grid.js').Grid;
var Cell = require('./../js/cell.js').Cell;

$(document).ready(function(){
  var myGrid = new Grid();
  myGrid.setSize(10,10);
  myGrid.initialize();
  console.log("The Grid", myGrid);
  debugger;
});
