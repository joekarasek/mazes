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
