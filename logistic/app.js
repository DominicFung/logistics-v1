const fs = require("fs")

const { csvReader } = require("./reader")
const { logistic } = require("./logistic")

const request = require("./input/request.json")
const maxCapacity = require("./input/maxCap.json")

console.log(`Reading prices.csv ..`)
var pricesCSV = fs.readFileSync('./input/prices.csv').toString('utf-8')
console.log(pricesCSV)

console.log(`\nReading capacity.csv ..`)
var capacityCSV = fs.readFileSync('./input/capacity.csv').toString('utf-8')
console.log(capacityCSV)

let sorted = csvReader(pricesCSV, capacityCSV)
console.log(sorted)

console.log(`== Logistic START ==`)
console.log( logistic(sorted, request, maxCapacity) )