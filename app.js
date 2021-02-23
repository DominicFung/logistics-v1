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

const legend5 = require("./inputs/ex5/legend.json")
const request5 = require("./inputs/ex5/request.json")
const maxCapacity5 = require("./inputs/ex5/maxCap.json")

const legend6 = require("./inputs/ex6/legend.json")
const request6 = require("./inputs/ex6/request.json")
const maxCapacity6 = require("./inputs/ex6/maxCap.json")

const legend7 = require("./inputs/ex7/legend.json")
const request7 = require("./inputs/ex7/request.json")
const maxCapacity7 = require("./inputs/ex7/maxCap.json")

const legend8 = require("./inputs/ex8/legend.json")
const request8 = require("./inputs/ex8/request.json")
const maxCapacity8 = require("./inputs/ex8/maxCap.json")

console.log("-- START --")

/**
 * Note: Backtracking example
 */
//console.log("=== EXAMPLE 1 ===")
//console.log( logistic(legend1, request1, maxCapacity1) )

//console.log("=== EXAMPLE 2 ===")
//console.log( logistic(legend2, request2, maxCapacity2) )

/**
 * Note: York Email 1; Sample-play.xlsx
 */
//console.log("=== EXAMPLE 3 ===")
//console.log( logistic(legend3, request3, maxCapacity3) )

/**
 * Note: York Email 2; Sample-play - Copy.xlsx
 */
//console.log("=== EXAMPLE 4 ===")
//console.log( logistic(legend4, request4, maxCapacity4) )

/**
 * Note: York Email 2; Sample-play - Copy(2).xlsx
 */
//console.log("=== EXAMPLE 5 ===")
//console.log( logistic(legend5, request5, maxCapacity5) )

/**
 * Note: York Email 2; Sample-play - Copy(3).xlsx
 */
//console.log("=== EXAMPLE 6 ===")
//console.log( logistic(legend6, request6, maxCapacity6) )

/**
 * Note: York Email 3; First large example
 *   - backtracking was not triggered
 */
//console.log("=== EXAMPLE 7 ===")
//console.log( logistic(legend7, request7, maxCapacity7) )

/**
 * Note: York Email 4; No excel provided.
 */
console.log("=== EXAMPLE 8 ===")
console.log( logistic(legend8, request8, maxCapacity8) )