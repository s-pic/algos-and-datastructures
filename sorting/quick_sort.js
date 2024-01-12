/**
 * Another recursive, depth-first selecion algo.
 Works with the same idea as merge sort:
 split down until arrays are of length 1 or 0.
 Furthermore, Works by
 - selecting one element (called "pivot")
   and sorting it into the right spot BY
 - moving all numbers that are smaller than the pivot to the left
 - moving all numbers that are larger than the pivot to the right
 - repeating the process for left and right half
 The algo is more efficient if the pivot is the median value in the data set.
 */

const testArray = [6,2,4,8,9,3,1]

/**
 * Call pivot helper (which will move pivot to the correct spot and all items smaller than it to the left AND return the pivot index)
 * on the array. When the helper returns the pivot index, recursively call the pivot helper on the slice left of the index and the
 * slice right of the index
 * @param arr
 * @return {*}
 */
function quickSort(
    arr,
    left = 0,
    right = arr.length - 1
) {
    console.log("step ", arr)
    if (right === left) return
    let pivotIdx = pivotHelper(arr, left, right)
    quickSort(arr, left, pivotIdx)   // left side
    quickSort(arr, pivotIdx + 1, right)   // right side
    return arr
}

console.log("input ", testArray)
console.log("result ", quickSort(testArray))

/**
 * - designates an element as pivot
 * - rearranges elements i nte array so that all values < pivot are moved to left of pivot
 * and all values > are moved to right of pivot, whereas the order within left and right does not matter
 * The helper should do it in place (not create a new array).
 * We use the first value as pivot here.
 * @return The index where the pivot lands
 */
function pivotHelper(
    arr,
    startIdx = 0,
    endIdx = arr.length -1) {
    const pivot = arr[startIdx]
    let swapIdx = startIdx // where the pivot needs to go when we're done moving through the array and swapping things
    for (let currentIdx = startIdx + 1; currentIdx <= endIdx; currentIdx++) {
        if (pivot > arr[currentIdx]) {
            swapIdx++ // note that there are X elements before the pivot which are smaller and thus need to be leap-frogged after the loop is done
            swap(arr, currentIdx, swapIdx) // swap with value before
        }
    }
    swap(arr, startIdx, swapIdx)
    return swapIdx
}



function swap(arr, idx1, idx2) {
    const tmp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = tmp
}

