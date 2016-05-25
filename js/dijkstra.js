function Dijkstra() {

}

Dijkstra.prototype.assign = function(grid, startRow, startCol) {
  var frontier = [grid.getCell(startRow, startCol)];

};

exports.Dijkstra = Dijkstra;
