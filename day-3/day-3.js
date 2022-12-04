// const solution1 = async () => {
//     const text = await Deno.readTextFile("./input.txt");
//     const backpacks = text.split("\n");
//
//     const createMap = (items) => {
//         return Array.from(items).reduce((acc, item) => {
//
//             if (acc[item]) {
//                 acc[item] = acc[item] + 1
//             } else {
//                 acc[item] = 1
//             }
//
//             return acc
//         }, {})
//     }
//
//     const findCommonChar = (firstHalf, secondHalf) => {
//         let commonChar = ''
//         for (const char in firstHalf) {
//             if (secondHalf[char]) {
//                 commonChar = char
//             }
//         }
//         return commonChar
//     }
//
//     const createScoreCard = () => {
//         const scoreCard = {}
//         // lowercase
//         for (let i = 0; i < 26; i++ ) {
//             const char = String.fromCharCode(97 + i);
//             scoreCard[char] = i+1
//             scoreCard[char.toUpperCase()] = i + 27
//         }
//
//         return scoreCard
//     }
//     const scoreCard = createScoreCard()
//
//     // Get the two halves
//     let totalScore = 0
//     for (let backpack of backpacks) {
//         if (!backpack) break
//
//         const firstHalf = backpack.substring(0, backpack.length/2)
//         const secondHalf = backpack.substring(backpack.length/2, backpack.length)
//
//         // Create a map of characters for each half
//         const firstHalfMap = createMap(firstHalf)
//         const secondHalfMap = createMap(secondHalf)
//
//         // Compare the halves, checking for the same char in each
//         const commonChar = findCommonChar(firstHalfMap, secondHalfMap)
//
//         // Get char score
//         const score = scoreCard[commonChar]
//         totalScore = totalScore + score
//     }
//     console.log('totalScore', totalScore)
//
// };
//
// solution1();
//

const solution2 = async () => {
    const text = await Deno.readTextFile("./input.txt");
    const backpacks = text.split("\n");

    const createMap = (items) => {
        return Array.from(items).reduce((acc, item) => {

            if (acc[item]) {
                acc[item] = acc[item] + 1
            } else {
                acc[item] = 1
            }

            return acc
        }, {})
    }

    const findCommonChar = (str1, str2, str3) => {
        for (const char in str1) {
            if (str1[char] && str2[char] && str3[char]) {
                return char
            }
        }
    }

    const createScoreCard = () => {
        const scoreCard = {}
        // lowercase
        for (let i = 0; i < 26; i++ ) {
            const char = String.fromCharCode(97 + i);
            scoreCard[char] = i+1
            scoreCard[char.toUpperCase()] = i + 27
        }

        return scoreCard
    }
    const scoreCard = createScoreCard()

    let totalScore = 0
    for (let i = 0; i < backpacks.length; i++ ) {
        if (!backpacks[i]) break

        if ((i + 1) % 3 === 0) {
            const backpack1 = createMap(backpacks[i-2])
            const backpack2 = createMap(backpacks[i-1])
            const backpack3 = createMap(backpacks[i])

            const commonChar = findCommonChar(backpack1, backpack2, backpack3)
            const score = scoreCard[commonChar]

            totalScore = totalScore + score
        }
    }
    console.log({totalScore})
};

solution2();

