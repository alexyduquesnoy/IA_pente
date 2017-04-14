var findRecursive = function (array, searchedElement, strict = false) {
    var find = false;
    for (var column of array) {
      if(column instanceof Array) {
        find = findRecursive(column, searchedElement);
        if(find) {
          return true;
        }
      } else {
        if(strict && column === searchedElement) {
          return column;
        } else if (column == searchedElement) {
          return column;
        }
      }
    }
    return false;
};

var searchHigherPositions = function (board) {
  var maxRow = [];
  for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
          maxRow.push(Math.max(...board[i]));
      }
  }
  var max = Math.max(...maxRow);
  var position = [];
  for (i = 0; i < board.length; i++) {
      for (j = 0; j < board[i].length; j++) {
          if (board[i][j] === max) {
              position.push({x: i, y: j});
          }
      }
  }
  return position;
};

var reduceRecursive = (array) => array.reduce(
  (a, b) => a.concat(
    Array.isArray(b) ? b.reduceRecursive() : b
  ),
  []
);

module.exports.searchHigherPositions = searchHigherPositions;
module.exports.reduceRecursive = reduceRecursive;
module.exports.findRecursive = findRecursive;
