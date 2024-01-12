// two pointers to positions in an array move and thus create a window
// that can grow, shrink and slide

// usually we look for a pair or a set of adjacent values within a list


////////////////
console.log("maxArraySum")
////////////////

/**
 *
 * @param arr Number[]
 * @param n Number of consecutive elements making up a sum
 * @return max sum of n consecutive elements
 */
function maxArraySum(arr, n) {
    if (!Array.isArray(arr) || arr.length < n || !n) {
        return null
    }
    let maxSum = 0
    // avoid nested loop (naive approach) to calculate sum in window.
    // just substract value at index before letIdx of new window frpm current sum


    // open window to max size, compile sum
    for (let idx = 0; idx < n; idx++) {
        maxSum = maxSum + arr[idx]
    }
    let tmpSum = maxSum
    // build new window starting right of the old window
    for (let idx = n;idx < arr.length; idx++) {
        tmpSum = tmpSum + arr[idx] - arr[idx - n]
        maxSum = Math.max(tmpSum, maxSum)
    }
    return maxSum
}

let testCount = 1

/**
 * init maxSum as 0, init pointers as left = 0 and right = 1
 * 4,2,1,6 , 2
 *   - -
 */

expect(
    maxArraySum([1,2,5,2,8,1,5], 2),
    10
)
expect(
    maxArraySum([1,2,5,2,8,1,5], 4),
    17
)
expect(
    maxArraySum([4,2,1,6], 1),
    6
)
expect(
    maxArraySum([4,2,1,6,2], 4),
    14
)
expect(
    maxArraySum([], 2),
    null
)


function expect(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("Test nr " + testCount + " passsed ✅"  )
    } else {
        console.log("Test nr " + testCount + " failed ❌ \nExpected: " + expected + " | Actual: " + actual)
    }
    testCount++
}



/////////////////////
console.log("longestSubString")
/////////////////////

/**
 *
 * @param str A string
 * @return String Longest substring with all distinct characters
 */
function longestSubString(str) {
    if (!(typeof str === "string" && str.length)) {
        return 0
    }
    let uniqueChars = {}
    let longestString = ''
    let candidate = ''

    for (let char of str) {
        const isUnique = !uniqueChars[char]
        if (isUnique) {
            candidate += char
            uniqueChars[char] = true
            if (candidate.length > longestString.length) {
                longestString = candidate
            }
        } else {
            uniqueChars = {
                [char]: true
            }
            candidate = char
        }
    }
    return longestString.length
}

testCount = 1

// // 1
// expect(
//     longestSubString("bbbbbb"),
//     1
// )
// // 2
// expect(
//     longestSubString("longestsubstring"),
//     8
// )
// // 3
// expect(
//     longestSubString("rithmschool"),
//     7
// )
// 4
expect(
    longestSubString("thisisawesome"),
    6 //             -
)
// // 5
// expect(
//     longestSubString("thecatinthehat"),
//     6
// )
// // 6
// expect(
//     longestSubString("thisishowwedoit"),
//     6
// )