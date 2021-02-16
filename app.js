const { logistic } = require("./logistic")

const legend1 = require("./inputs/ex1/legend.json")
const request1 = require("./inputs/ex1/request.json")
const maxCapacity1 = require("./inputs/ex1/maxCap.json")

const legend2 = require("./inputs/ex2/legend.json")
const request2 = require("./inputs/ex2/request.json")
const maxCapacity2 = require("./inputs/ex2/maxCap.json")

const legend3 = require("./inputs/ex3/legend.json")
const request3 = require("./inputs/ex3/request.json")
const maxCapacity3 = require("./inputs/ex3/maxCap.json")

const legend4 = require("./inputs/ex4/legend.json")
const request4 = require("./inputs/ex4/request.json")
const maxCapacity4 = require("./inputs/ex4/maxCap.json")




console.log("-- START --")

//console.log("=== EXAMPLE 1 ===")
//console.log( logistic(legend1, request1, maxCapacity1) )

//console.log("=== EXAMPLE 2 ===")
//console.log( logistic(legend2, request2, maxCapacity2) )

//console.log("=== EXAMPLE 3 ===")
//console.log( logistic(legend3, request3, maxCapacity3) )

console.log("=== EXAMPLE 4 ===")
console.log( logistic(legend4, request4, maxCapacity4) )