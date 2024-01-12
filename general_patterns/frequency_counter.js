// useful when data consists of multiple values and we want to compare em, avoiding nested loops

// trick is to
// - exploit that object index lookup is fast
// - to construct an auxilliary map that stores frequency
// - do two loops right after each other and populate frequency counter objects
// - finally compare counter objects

// /**
//  * MY FIRST ATTEMPT --> Fails -> does not respect frequency
//  * Returns true if every value in the array has its corresponding value *squared* in the same array. The frequency of values must be the same, not the order.
//  * @param arr1
//  * @param arr2
//  */
// function same(arr1, arr2) {
//     const result = false
//     // early exit: don't run when array length does not match
//     if (arr1.length !== arr2.length) {
//         return result
//     }
//     let counter = {}
//     // loop over first array, store values as keys in object
//     for (let num of arr1) {
//         counter[num] = false
//     }
//     for (let squaredNam of arr2) {
//         const sqrt = Math.sqrt(squaredNam);
//         if (counter.hasOwnProperty(sqrt)) {
//             counter[sqrt] = true
//         }
//     }
//     // check if all keys in counter are true
//     return Object.values(counter).every(Boolean)
// }

/**
 * CODE SOLUTION
 * Returns true if every value in the array has its corresponding value *squared* in the same array. The frequency of values must be the same, not the order.
 * @param numbers Number[]
 * @param squares Number[]
 */
function same(numbers, squares) {
    // early exit: don't run when array length does not match
    if (numbers.length !== squares.length) {
        return false
    }
    let numbersCounter = {}
    let squaresCounter = {}
    // count values by compiling objects that tell how many occurences we have for which value
    for (let val of numbers) {
        numbersCounter[val] = (numbersCounter[val] || 0) + 1
    }
    for (let val of squares) {
        squaresCounter[val] = (squaresCounter[val] || 0) + 1
    }
    for (let val in numbersCounter) {
        const isSqareFoundInSquaresCounter = val ** 2 in squaresCounter;
        const doesCountMatch = numbersCounter[val] === squaresCounter[val ** 2]
        if (!(isSqareFoundInSquaresCounter && doesCountMatch)) {
            return false
        }
    }
    return true
}

let testCount = 1


expect(same([1,2,3], [4,1,9]), true) // frequency matters, not order
expect(same([1,2,2], [1,1,4]), false)
expect(same([1,2,3], [1,9]), false) // uneven length
expect(same([1,2,1], [4,4,1]), false)

function expect(actual, expected) {
    if (actual === expected) {
        console.log("Test nr " + testCount + " passsed ✅"  )
    } else {
        console.log("Test nr " + testCount + " failed ❌ \nExpected: " + expected + " | Actual: " + actual)
    }
    testCount++
}

///////////////////////////
///////////////////////////
console.log("### ANAGRAMS ")

///////////////////////////

testCount = 1

/**
 * Returns true if the characters of string numer 1 occur in the same frequency in string 2
 * @param str1 Number[]
 * @param str2 Number[]
 */
function isAnagram1(str1, str2) {
    if (str1.length !== str2.length) {
        return false
    }
    const counterForStr1 = {}
    for (let char of str1) {
        counterForStr1[char] = char in counterForStr1 ? counterForStr1[char] + 1 : 1
    }
    const counterForStr2 = {}
    for (let char of str2) {
        counterForStr2[char] = char in counterForStr2 ? counterForStr2[char] + 1 : 1
    }
    for (let char in counterForStr1) {
        if (!(counterForStr2[char] === counterForStr1[char])) {
            return false
        }
    }

        return true
}

expect(isAnagram1("", ""), true)
expect(isAnagram1("aaz", "zaa"), true)
expect(isAnagram1("anagram", "nagaram"), true)
expect(isAnagram1("cinema", "iceman"), true)
expect(isAnagram1("aaz", "zza"), false)
expect(isAnagram1("rat", "car"), false)
