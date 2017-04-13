let findRecursive = function (array, searchedElement, strict = false) {
    let find = false;
    for (let column of array) {
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
    console.log(board);
    var maxRow = [];
    for (var i = 0; i < NB_ROWS; i++) {
        for (var j = 0; j++ < NB_COLUMNS; j++) {
            maxRow.push(Math.max(...board[i]));
        }
    }
    var max = Math.max(...maxRow);
    var position = [];
    for (i = 0; i < NB_ROWS; i++) {
        for (j = 0; j < NB_COLUMNS; j++) {
            if (board[i][j] === max) {
                position.push({x: i, y: j});

            }
        }
    }
    return position;

};

module.exports.searchHigherPositions = searchHigherPositions;
module.exports.findRecursive = findRecursive;
