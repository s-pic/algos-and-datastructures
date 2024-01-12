/*
Let large values bubble up
O(n) is quadratic
 */

function sort(arr) {
    for (let i = 0; i < arr.length;i++) {
        let swaps =0
        for (let j = i + 1; j < arr.length;j++) {
            if (arr[i] > arr[j]) {
                swaps++
                swap(arr, i,j)
            }
        }
        if (!swaps) break
    }
    return arr
}

function swap(arr, idx1, idx2) {
    const tmp = arr[idx1]
    arr[idx1] = arr[idx2]
    arr[idx2] = tmp
}


console.log(
    sort([
        2,3,4,13,5,1
    ])
)