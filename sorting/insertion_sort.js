/**
 Gradually build up a sorted portion of the array
 O(n) is quadratic, but performance is very good on almost sorted data.
 */
function sort(arr) {
    for (let currentIdx = 1; currentIdx < arr.length ; currentIdx++) {
        const current = arr[currentIdx]
        for (var j = currentIdx -1; j >= 0 && arr[j] > current; j--) {
            arr[j+1] = arr[j] // shift value
        }
        arr [j+ 1] = current
    }
    return arr
}


console.log(
    sort([
        2, 7, 3, 4, 13, 5, 1
    ])
)