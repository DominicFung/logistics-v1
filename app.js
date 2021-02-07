const { logistic } = require("./logistic")

const legend1 = require("./inputs/ex1/legend.json")
const request1 = require("./inputs/ex1/request.json")
const maxCapacity1 = require("./inputs/ex1/maxCap.json")

const legend2 = require("./inputs/ex2/legend.json")
const request2 = require("./inputs/ex2/request.json")
const maxCapacity2 = require("./inputs/ex2/maxCap.json")




console.log("-- START --")

console.log("=== EXAMPLE 1 ===")
console.log( logistic(legend1, request1, maxCapacity1) )

//console.log("=== EXAMPLE 2 ===")
//console.log( logistic(legend2, request2, maxCapacity2) )

