function Grid() {
  this.rows = 0;
  this.cols = 0;
  this.cells = [];
}

Grid.prototype.setSize = function(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  for (i=0; i<rows; i++) {
    this.cells.push([]);
    for (j=0; j<cols; j++) {
      this.cells[i][j] = "cell";
    }
  }
};

exports.Grid = Grid;
