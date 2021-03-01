const { insertion } = require("./logistic")

const _PRICESCSVNAME = "prices.csv"
const _CAPACITYCSVNAME = "capacity.csv"

const _NULLVALS = [ "NA", "" ]

/**
 * 
 * @param {*} priceCSV 
 * @param {*} capacityCSV 
 */
module.exports.csvReader = (priceCSV, capacityCSV) => {
  var priceLines = priceCSV.split("\n")
  var capacityLines = capacityCSV.split("\n")

  if (priceLines.length !== capacityLines.length) throw `Number of lines in ${_PRICESCSVNAME} and ${_CAPACITYCSVNAME} are different!`
  if (priceLines[0] !== capacityLines[0]) throw `Company Names are miss-matched in the header between ${_PRICESCSVNAME} and ${_CAPACITYCSVNAME}`
  var sorted = []

  // NOTE: For now, we do not expect company, lane numbers and values to contain "," - if so, we will need to refactor this code
  var headers = priceLines[0].split(",")
  console.log(headers)

  for (let i=1; i<priceLines.length; i++) {
    let priceLine = priceLines[i].split(",")
    let capacityLine = capacityLines[i].split(",")
    
    if (priceLine[0] !== capacityLine[0]) 
      throw `${_PRICESCSVNAME} contains lane "${priceLine[0]}" in row ${i}, but ${_CAPACITYCSVNAME} contains lane "${capacityLines[0]}" instead. Please make them the same.`

    console.log()
    if (priceLine.length !== headers.length || capacityLine.length !== headers.length)
      throw `${_PRICESCSVNAME} or ${_CAPACITYCSVNAME} do not contain the same number of cells as the header on row ${i}. ${priceLine.length}, ${capacityLine.length} respectively.`

    for (let j=1; j<priceLine.length; j++) {
      let company = removeQuotes(headers[j])
      let lane = removeQuotes(priceLine[0])

      // NOTE: following are epected to be numbers OR part of _NULLVALS
      let price = removeQuotes(priceLine[j])
      let capacity = removeQuotes(capacityLine[j])

      //console.log(`priceLine[${j}] = ${priceLine[j]}; capacityLine[${j}] = ${capacityLine[j]}`)
      
      if (!(_NULLVALS.includes(price) || _NULLVALS.includes(capacity))){
        price = parseFloat(price)
        capacity = parseInt(capacity)

        //console.log(`price "${price}" isNaN? ${Number.isNaN(price)}; capacity "${capacity}" isNaN? ${Number.isNaN(capacity)}`)
        if (!Number.isNaN(price) && !Number.isNaN(capacity))
          sorted = insertion(sorted, company, lane, { price, capacity })
        else throw `cell(${i}, ${j}) has price "${price}" and capacity "${capacity}". One of which is "Not A Number".`
      } else console.log(`Acceptable null value found in cell(${i}, ${j}). skipping ..`)
    }
  }

  return sorted
}

const removeQuotes = (cell) => {
  if (cell[0] === '"' && cell[cell.length-1] === '"') return cell.slice(1, -1)
  else return cell
}