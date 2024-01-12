/**
 Works with splitting up, merging and sorting. Exploits:
 - the idea that arrays with 0 or 1 elements are already sorted
 - that merging to sorted arrays can be done with O(n+m)
 Decomposes an array into smaller arrays and merges them back into a sorted array.
 */

function mergeTwoSortedArrays(arr1, arr2) {
    if (!arr1.length) {
        return arr2.length ? arr2 : arr1
    }
    if (!arr2.length) {
        return arr1.length ? arr1 : arr2
    }
    const sortedArr = []

    // avoid nested loop, use multiple pointers and go pair by pair
    // build up sorted array

    // compare values in both arrays.
    // always put smaller value in sorted array and move pointer in that array up.
    // break loop if end of one array is reached
    let i = 0
    let j = 0
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] > arr2[j]) {
            sortedArr.push(arr2[j])
            j++
        } else  {
            sortedArr.push(arr1[i])
            i++
        }
    }
    // we reached the limit of the smaller array. just push
    // the rest of the longer array into the sorted array.
    // we're safe to do so becayse we know all elements are larger than the largest item in the sorted slice, otherwise it would have been sorted before the end of the loop aboce
    if (i === arr1.length && j < arr2.length) {
        // if we're not done with looping through second array
        sortedArr.push(...arr2.slice(j));
    } else {
        // we're done looping through second array, but maybe not done with first one
        sortedArr.push(...arr1.slice(i));
    }
    return sortedArr
}

console.log(
    mergeTwoSortedArrays([1, 2,  10,  100], [3,  4,  6, 14,   30,  40]) // [1,  2,  3,  4,   6, 10, 14, 30, 40, 100]
)

console.log(
    mergeTwoSortedArrays(
        [2,14,49,100],
        [1,10,50],
    )
)// [1,  2,  10, 14, 49, 50, 100]

console.log("********")

const slice = (arr) => {
    const midIdx = Math.floor((arr.length ) / 2);
    const [firstHalf, secondHalf] = [arr.slice(0, midIdx), arr.slice(midIdx )]
    return [firstHalf, secondHalf]
}

function sort(arr) {

    // traverse depth-first the tree of halves down and have a basecase for when the branch leaf
    // (single item) is reached
    if (arr.length <= 1) return arr
    const [firstHalf, secondHalf] = slice(arr)
    const left = sort(firstHalf)
    const right = sort(secondHalf)
    // after the base cases have been hit and we go back up, merge when going back up
    return mergeTwoSortedArrays(left, right)
}

console.log(sort([10,24,76,74]))
// console.log(
//     sort(
//
//         [1,10,2,14,49,100, 50],
//     )
// )// [1,  2,  10, 14, 49, 50, 100]
/*
    [1,10,2,14] [49,100, 50]
    [1,10][2,14] [49,100][50]
    [1][10][2][14] [49][100][50]


 */

}


function sortV2(arr){
    if (arr.length < 2) return arr
    const [leftHalf, rightHalf] = split(arr)
    const sortedLeft = sortV2(leftHalf)
    const sortedRight = sortV2(rightHalf)
    return mergeTwoSortedArrays2(sortedLeft, sortedRight)

}

/*
[10,24,76,74]
[10,24],[76,74]
[10],[24],[76],[74] base case
[10,24][74,76]

 */


console.log(sortV2([10,24,76,74]))

