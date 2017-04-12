if (!Array.prototype.findRecursive) {
  Array.prototype.findRecursive = function (searchedElement, strict = false) {
    let find = false;
    for (let column of this) {
      if(column instanceof Array) {
        find = column.findRecursive(searchedElement);
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
}
