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
}

exports.BinaryTree = BinaryTree;
