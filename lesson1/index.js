// commonjs
import utils from "./utils.js";
const array = [109, 8, 300, 7, 19, 4];
utils.sortArray(array, 'DESC');
const newSquareArray = utils.squareArray(array);
console.log(newSquareArray);