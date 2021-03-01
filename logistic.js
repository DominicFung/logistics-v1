module.exports.sort = (legend) => {
  let sorted = []
  /**
   * Create an ordered list, lowest price to highest
   * Complexity: O(n logn) - mergesort
   */
  for (let name of Object.keys(legend)) {
    let company = name.split("-")[0]
    let lane = name.split("-")[1]
    sorted = insertion(sorted, company, lane, legend[name]) 
  }

  return sorted
}

/**
  * @param { { "company-lane": {price: number, capcity: number } ... } } legend 
  * @param { { "lane": number ... } } request
  * @param { { "company": number ... } } maxCapacity
  * 
  * @return {number}
  */
 module.exports.logistic = (sorted, request, maxCapacity) => {

  let capacityTracker = request
  let maxCapacityTracker = maxCapacity
  let minPrice = 0

  /**
   * Allocate based on price, item capacity and max capacity
   * Complexity: O(n)
   */
  for (let item of sorted) {
    if (capacityTracker[item.lane] >= 0 && maxCapacityTracker[item.company] >= 0) {
      item.allocation = Math.min(capacityTracker[item.lane], maxCapacityTracker[item.company], item.capacity)

      //console.log(`min: ${item.allocation}: ${[item.lane, item.company]} ${JSON.stringify([capacityTracker[item.lane], maxCapacityTracker[item.company], item.capacity])}`)
      //console.log(`capacityTracker[2] = ${capacityTracker[2]}`)

      maxCapacityTracker[item.company] = maxCapacityTracker[item.company] - item.allocation
      capacityTracker[item.lane] = capacityTracker[item.lane] - item.allocation
      minPrice = minPrice + item.price * item.allocation
    } else { console.warn(`capacityTracker[${item.lane}] or maxCapacity[${item.company}] doesn't exist!`) }
  }

  console.log(sorted)
  console.log(minPrice)
  console.log(capacityTracker)
  console.log(maxCapacityTracker)

  console.log("\n -- BACKTRACKING -- ")

  /**
   * Backtracking:
   *  - For each lane, Check to see if the request is statisfied: ie. outstanding capacity lane = 0
   *  - If NOT - recursively make alterations until:
   *      a) max Capacity per company is not violated
   *      b) all lanes are equal
   */
  let isSolved = false
  for (let lane of Object.keys(capacityTracker)) {
    if (capacityTracker[lane] > 0) {
      for (let i=0; i<sorted.length; i++) {
        if (sorted[i].lane === lane) {
          if (i === 0) throw ("We cannot handle i === 0 yet.")
          let temp = modify(sorted, maxCapacityTracker, capacityTracker, i-1, i, "lane", lane, minPrice)
          if (temp) {
            sorted = temp.sorted
            capacityTracker = temp.laneT
            maxCapacityTracker = temp.companyMaxT
            minPrice = temp.price

            isSolved = true
            break; // I think the entire thing is solved if modify returns?

          } else console.warn(`Could not solve at i = ${i}.`)
        }
      }
    }
  }

  
  if (isSolved) return { sorted, minPrice }
  else return null
 }

 /**
 * 
 * @param {*} sorted                    : filled, sorted master data
 * @param {*} companyMaxT               : tracks maximum capacity of each company; + number means that company still has capacity
 * @param {*} laneT                     : tracks currently allocated capacity for each lane; + number means, we still need to fill that number in lane
 * @param {number} bpointer             : pointer for backtracking; used when a "reduction" is needed
 * @param {number} fpointer             : pointer for forwardtracking; used when an "addition" is needed
 * @param {"company"|"lane"} actionItem : "company" or "lane"
 * @param {number} value                : any number -- this will determine if we iterate on bpointer or fpointer
 */
const modify = (sorted, companyMaxT, laneT, bpointer, fpointer, actionItem, key, price) => {
  let lowestValue = null
  let value = actionItem === "lane" ? laneT[key] : companyMaxT[key]
  console.log(`\n-|- NEW ITERATION -|- value: ${value}`)
  console.log(`fpointer ${fpointer} ${value}`)

  if (value > 0) {
    if (fpointer >= sorted.length) return null
    let modified = []

    // Complete the action:
    while (fpointer < sorted.length && value > 0) {
      console.log(`fpointer ${fpointer} ${value}`)
      console.log(actionItem)
      console.log(key)

      if (actionItem === "lane"? sorted[fpointer].lane === key : sorted[fpointer].company === key) {
        let item = sorted[fpointer]
        let addAmount = Math.min(Math.abs(value), item.capacity-item.allocation)
        console.log(addAmount)
        value = value - addAmount

        item.allocation = item.allocation + addAmount
        companyMaxT[actionItem === "lane"? item.company : key] = 
          companyMaxT[actionItem === "lane"? item.company : key] - addAmount
        laneT[item.lane] = laneT[item.lane] - addAmount
        price = price + (addAmount * item.price)

        console.log(item)
        modified.push(item)
        
        console.log(companyMaxT[item.company])
        console.log(laneT[item.lane])
      }
      fpointer = fpointer + 1
    }

    if (value === 0) { //action was successful, we want to begin counter balance
      let isOK = true
      for (let item of modified) {

        console.log(`companyMaxT[${item.company}] ${companyMaxT[item.company]}`)
        if (companyMaxT[item.company] < 0) {
          isOK = false
          let temp = modify(sorted, companyMaxT, laneT, bpointer, fpointer, "company", item.company, price)
          if (temp && (lowestValue === null || temp.price < lowestValue.price)) lowestValue = temp
        }

        console.log(`laneT[${item.lane}] ${laneT[item.lane]}`)
        if (laneT[item.lane] < 0) {
          isOK = false
          let temp = modify(sorted, companyMaxT, laneT, bpointer, fpointer, "lane", item.lane, price)
          if (temp && (lowestValue === null || temp.price < lowestValue.price)) lowestValue = temp
        }
      }

      console.log(`isOK ${isOK}`)
      console.log(lowestValue)
      
      if (isOK && !lowestValue) return { sorted, companyMaxT, laneT, price }
      if (lowestValue) return lowestValue
    } return null
  } else if (value < 0) {
    console.log(bpointer)

    if (bpointer < 0) return null
    let modified = []

    while (bpointer >= 0 && value < 0) {
      console.log(`bpointer ${bpointer} ${value}`)
      console.log(actionItem)
      console.log(key)
      
      if (actionItem === "lane"? sorted[bpointer].lane === key : sorted[bpointer].company === key) {
        let item = sorted[bpointer]
        let minusAmount = Math.min(-value, item.allocation)
        value = value + minusAmount

        item.allocation = item.allocation - minusAmount
        companyMaxT[actionItem === "lane"? item.company : key] = 
          companyMaxT[actionItem === "lane"? item.company : key] + minusAmount
        laneT[item.lane] = laneT[item.lane] + minusAmount
        price = price - (minusAmount * item.price)

        console.log(item)
        modified.push(item)

        console.log(companyMaxT[item.company])
        console.log(laneT[item.lane])
      }
      bpointer = bpointer - 1
    }

    if (value === 0) { //action was successful, we want to begin counter balance
      let isOK = true
      for (let item of modified) {
        console.log(`companyMaxT[${item.company}] ${companyMaxT[item.company]}`)
        if (companyMaxT[item.company] < 0) {
          isOK = false
          let temp = modify(sorted, companyMaxT, laneT, bpointer, fpointer, "company", item.company, price)
          if (temp && (lowestValue === null || temp.price < lowestValue.price)) lowestValue = temp
        }

        console.log(`laneT[${item.lane}] ${laneT[item.lane]}`)
        if (laneT[item.lane] < 0) {
          isOK = false
          let temp = modify(sorted, companyMaxT, laneT, bpointer, fpointer, "lane", item.lane, price)
          if (temp && (lowestValue === null || temp.price < lowestValue.price)) lowestValue = temp
        }

        if (laneT[item.lane] > 0) {
          isOK = false
          let temp = modify(sorted, companyMaxT, laneT, bpointer, fpointer, "lane", item.lane, price)
          if (temp && (lowestValue === null || temp.price < lowestValue.price)) lowestValue = temp
        }
      }

      console.log(`isOK ${isOK}`)
      console.log(lowestValue)

      if (isOK && !lowestValue) return { sorted, companyMaxT, laneT, price }
      if (lowestValue) return lowestValue
    } return null
  } return { sorted, companyMaxT, laneT, price }
}

 const insertion = (sorted, company, lane, item) => {
  if (item.capacity === 0) { return sorted }
  if (sorted.length === 0) {
    return [{ company, lane, price: item.price, capacity: item.capacity }]
  } else if (sorted.length === 1) {
    if (sorted[0].price > item.price) {
      return [{ company, lane, price: item.price, capacity: item.capacity }, sorted[0]]
    } else {
      return [sorted[0], { company, lane, price: item.price, capacity: item.capacity }]
    }
  } else {
    let split = Math.floor(sorted.length / 2)
    let s1 = sorted.slice(0, split)
    let s2 = sorted.slice(split, sorted.length)

    if (s1[s1.length-1].price > item.price) // put it inside s1
      return [...insertion(s1, company, lane, item), ...s2]
    else if (s2[0].price < item.price)
      return [...s1, ...insertion(s2, company, lane, item)]
    else
      return [...s1, { company, lane, price: item.price, capacity: item.capacity }, ...s2]
  }
 }

 module.exports.insertion = insertion