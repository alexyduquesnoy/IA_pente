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

module.exports.findRecursive = findRecursive;
