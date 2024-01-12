// Create pointers or valuses to correspond to an index or position and move towards the beginning, end or middle based on a certain condition

// usually we look for a pair


////////////////
console.log("sumZero")
////////////////

/**
 *
 * @param arr Number[] sorted array of integers
 * @return Number[] | undefined First pair where sum is 0 or undefined if no pair exists
 */
function sumZero(arr) {
    if (!Array.isArray(arr)) {
        console.error("input is not an array")
        return undefined
    }
    // start pointer 1 on the left and one pointer 2 on the right
    // move pointer 2 towards pointer 1 (to the left) in a loop
    // if values at both pointers sum up to 0, good, return them.
    // If they sum up to a value greater than 0, move pointer 2 left.
    // If they sum up to a value lower than 0, move pointer 1 to right
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx !== rightIdx) {
        const valAtLeftIdx = arr[leftIdx]
        const valAtRightId = arr[rightIdx]
        const sum = valAtRightId + valAtLeftIdx
        if (sum === 0) return [valAtLeftIdx, valAtRightId]
        if (sum > 0) rightIdx--
        if (sum < 0) leftIdx++
    }

    return undefined
}


let testCount = 1

expect(
    sumZero([-3,-2,-1,0,1,2,3]),
    [-3, 3]
)
expect(
    sumZero([-8,-3,-2,-1,0,1,2,3,9]),
    [-3, 3]
)
expect(
    sumZero([-10,-3,-2,-1,0,1,2,3,9]),
    [-3, 3]
)
expect(
    sumZero([-3,-2,-1,0,1,2,3,9]),
    [-3, 3]
)
expect(
    sumZero([-2,0,1,3]),
    undefined
)
expect(
    sumZero([1,2,3]),
    undefined
)

function expect(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("Test nr " + testCount + " passsed ✅"  )
    } else {
        console.log("Test nr " + testCount + " failed ❌ \nExpected: " + expected + " | Actual: " + actual)
    }
    testCount++
}


////////////////
console.log("countUnique")
////////////////

testCount = 0

// /**
//  * MY IMPL --> actually sliding window
//  * @param arr Number[] sorted
//  * @return number Number of unique values
//  */
// function countUnique(arr) {
//     if (!Array.isArray(arr) || !arr.length) {
//         return 0
//     }
//     // again, goal is to not compare every value with every other value by making use of
//     // - the fact that the array is sorted
//     // - two pointers pattern
//
//     let numOfUnique = 1
//     let leftIdx = 0
//     let rightIdx = 1
//
//     while (
//         leftIdx < arr.length -1 && rightIdx < arr.length
//         ) {
//         const leftVal = arr[leftIdx]
//         const righttVal = arr[rightIdx]
//         if (leftVal !== righttVal) {
//             numOfUnique ++
//         }
//         leftIdx++
//         rightIdx++
//     }
//     return numOfUnique
// }

/**
 * Course impl
 * @param arr Number[] sorted
 * @return number Number of unique values
 */
function countUnique(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return 0
    }
    // again, goal is to not compare every value with every other value by making use of
    // - the fact that the array is sorted
    // - two pointers pattern

    let numOfUnique = 1
    let leftIdx = 0
    let rightIdx = 1

    while (
        leftIdx < arr.length -1 && rightIdx < arr.length
        ) {
        const leftVal = arr[leftIdx]
        const righttVal = arr[rightIdx]
        if (leftVal !== righttVal) {
            numOfUnique++
            leftIdx = rightIdx
        }
        rightIdx++
    }
    return numOfUnique
}

expect(
    countUnique([1,2,3]),
    3
)
expect(
    countUnique([]),
    0
)
expect(
    countUnique([1,1,1,1,2]),
    2
)
expect(
    countUnique([-2,-1,-1,0,1]),
    4
)