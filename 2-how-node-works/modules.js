// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const Calc = require("./test-module");
const myCalc1 = new Calc();
console.log(myCalc1.add(5, 6));

// exports
const CALC = require("./test-module-2");
// destructuring
const { add, divide, multiply, substract } = require("./test-module-2");

console.log(CALC.add(2, 5));
console.log(add(2, 5));
console.log(divide(2, 5));
console.log(multiply(2, 5));

///////////
// Caching
require("./test-module3.js")();
require("./test-module3.js")();
require("./test-module3.js")();
