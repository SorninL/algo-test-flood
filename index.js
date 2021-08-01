const towerHeight = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

/**
 * This function returns the highest tower on the left or right of the chart.
 * @param fromIndex int
 * @param direction boolean (false = left, true = right)
 * @return Object
 */
function GetHighestSibling(fromIndex, direction) {
  if (direction === true) {
    let highestSiblingRight = {
      index: fromIndex,
      value: towerHeight[fromIndex]
    }

    for (let i = fromIndex + 1; i < towerHeight.length; i++) {
      if (highestSiblingRight.value < towerHeight[i]) {
        highestSiblingRight.index = i;
        highestSiblingRight.value = towerHeight[i]
      }
    }

    return highestSiblingRight;
  } else {
    let highestSiblingLeft = {
      index: fromIndex-1,
      value: towerHeight[fromIndex-1]
    }
    for (let i = fromIndex - 1; i > 0; i--) {
      if (highestSiblingLeft.value < towerHeight[i]) {
        highestSiblingLeft.index = i;
        highestSiblingLeft.value = towerHeight[i]
      }
    }

    return highestSiblingLeft;
  }
}

/**
 * This function returns the number of unit flooded
 * @return int
 * @param fromIndex
 * @param highestTowerLeft
 * @param highestTowerRight
 */
function GetFloodedUnit(fromIndex, highestTowerLeft, highestTowerRight) {
  let lowestBuilding = undefined
  if (highestTowerLeft.value > highestTowerRight.value) {
    lowestBuilding = highestTowerRight
  } else {
    lowestBuilding = highestTowerLeft
  }

  let unitFlooded = 0

  for (let i = fromIndex; i < towerHeight.length; i++) {
    if (i > highestTowerRight.index) break;
    unitFlooded = unitFlooded + lowestBuilding.value - towerHeight[i];

  }
  for (let i = fromIndex-1; i > 0; i--) {
    if (i < highestTowerLeft.index) break;
    unitFlooded = unitFlooded + lowestBuilding.value - towerHeight[i];
  }

  return unitFlooded;
}

/**
 * This function returns the amount of water accumulated between buildings on rain falls.
 * @param towerHeight
 * @return int of flooded area
 */
function Compute(towerHeight) {
  let unitFlooded = 0

  for (let i = 0; i < towerHeight.length; i++) {

    if (i === 0 || i === (towerHeight.length-1) ) continue;

    const highestSiblingLeft = GetHighestSibling(i, false)
    const highestSiblingRight = GetHighestSibling(i, true)

    let unitFloodedToAdd = GetFloodedUnit(i, highestSiblingLeft, highestSiblingRight)
    unitFlooded = unitFloodedToAdd + unitFlooded
  }

  console.log(unitFlooded)
}

Compute(towerHeight);

//Started 28/07/2021 11:35
//Ended 28/07/2021 12:35
// Status unfinished (Didn't get the right result, I will continue this program for myself, but here's what i've done in 1 hour)