// ============================
// Cell Object Declaractions
// ============================
// Note: "linked" cells are cells that have a passage between them

function Cell() {
  this.row = -1;
  this.col = -1;

  this.neighbors = {
    north: null,
    east: null,
    west: null,
    south: null
  };

  this.links = [];
}

// Set a cell as a neighbor of this cell
Cell.prototype.addNeighbor = function(cell, relation) {
  this.neighbors[relation] = cell;
}
// Bidirectional linking of cells
Cell.prototype.link = function(cell) {
  if (this.links.indexOf(cell) === -1) {
    this.links.push(cell);
    cell.link(this);
  }
};

// Bidirectional unlinking of cells
Cell.prototype.unlink = function(cell) {
  var indexOfCell = this.links.indexOf(cell);
  if (indexOfCell >= 0) {
    this.links.splice(indexOfCell, 1);
    cell.unlink(this);
  }
};

// Query if queryCell is linked to this cell
Cell.prototype.isLinked = function(queryCell) {
  if(this.links.indexOf(queryCell) === -1) {
    return false;
  } else {
    return true;
  }
}

// Sample a neighbor
Cell.prototype.sampleNeighbor = function() {
  var keys = ['north','east','south','west'];
  var index;
  do {
    index = Math.floor(Math.random() * 4);
  } while (!this.neighbors[keys[index]]);
  return this.neighbors[keys[index]];
}

//================
// Distance funcitons

// Get and set a distance
Cell.prototype.setDistance = function(distance) {
  this.distance = distance;
}

Cell.prototype.getDistance = function() {
  return this.distance;
}


exports.Cell = Cell;
