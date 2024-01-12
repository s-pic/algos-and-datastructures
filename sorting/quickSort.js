/**
 * Selects an item as pivot (for now the 1t one),
 * sorts all items smaller than it to the left of it
 * and all items larger than it to the right of it.
 * The pivot is then in the correct position, given the sorting.
 * Left and right halfs can still be unsorted within each other/
 * Returns the index of the pivot
 * @param arr Number[]
 * @param start Number Defaults to 0
 * @param end Number Defaults to arr.length - 1
 * @return idx Number
 * @example
 * ```js
 * p=1
 * c=3
 * [2,3,6,5,7,9]
 * const arr = [5,3,6,2,7,9]
 * const idx = pivot(arr) // 2
 * console.log(arr) // [2,3,5,6,7,9]
 *
 * ```
 */
function pivot(arr, start = 0, end = arr.length -1) {
    let pivotIdx = start
    // loop through the array
    // if the pivot is larger than the current item,
    // - increase pivot index
    // - swap current item with pivot index
    // when loop is done, swap pivot with item at pivot index (leapfrogging the items that got sorted into the left half)
    let pivot = arr[pivotIdx]
    let swapIdx = pivotIdx
    for (let i = start + 1; i<=end;i++) {
        if (pivot > arr[i]) {
            swapIdx++
            swap(arr, i, swapIdx)
        }
    }
    swap(arr, swapIdx, pivotIdx)
    return swapIdx
}
const arr = [5,3,6,2,7,9]

// recursively sort halves of array
function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start === end) return
    const pivotIdx = pivot(arr, start, end)
    quickSort(arr, start, pivotIdx ) // left
    quickSort(arr,  pivotIdx + 1, end ) // right
    return arr
}

console.log(quickSort(arr))

function swap(arr, idx1, idx2) {
    const tmp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = tmp
}