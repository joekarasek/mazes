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
