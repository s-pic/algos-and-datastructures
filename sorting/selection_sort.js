/**
  Put small values into sorted position.
  - loop through once and look for minimum value. Then swap that one with value at beginning
  - do the same for rest of list
  - repeat
 O(n) is quadratic
 */
function sort(arr) {
    for (let i = 0; i < arr.length;i++) {
        let idxForMinimum
        for (let j = i + 1; j < arr.length;j++) {
            if (arr[j] < arr[i]) {
                idxForMinimum = j
            }
        }
        if (idxForMinimum) {
            swap(arr, i,idxForMinimum)
        }
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