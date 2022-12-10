// const solution1 = async () => {
//     const text = await Deno.readTextFile("./input.txt");
//     // const text = await Deno.readTextFile("./sample-input.txt");
//     const rows = text.split('\n')
//     const treeRows = rows.slice(0, rows.length - 1) // remove last empty el
//     const treeMatrix = treeRows.map(row => row.split(''))
//
//     // 1. Count all the edges
//     let totalTreeCount = treeMatrix[0].length * 2 // Count entire first and last row
//     totalTreeCount += treeMatrix.length * 2   // Count all elements at indices 0 and last
//     totalTreeCount = totalTreeCount - 4 // remove double counts of corners
//
//     // 2. Check each tree, in every direction (skip first and last row)
//     for (let row = 1; row < treeMatrix.length - 1; row++) {
//         const currentRow = treeMatrix[row]
//
//         // Loop through row, checking height. Skip 0 and last indices
//         for (let treeIndex = 1; treeIndex < currentRow.length - 1; treeIndex++) {
//             const currentTree = Number(currentRow[treeIndex])
//
//             // Top
//             let topWinner = true
//             for (let t = 0; t < row; t++) {
//                 const treeToCompare = Number(treeMatrix[t][treeIndex])
//
//                 if (currentTree <= treeToCompare) {
//                     topWinner = false
//                     break
//                 }
//             }
//
//             // Bottom
//             let bottomWinner = true
//             for (let b = treeMatrix.length-1; b > row; b--) {
//                 const treeToCompare = Number(treeMatrix[b][treeIndex])
//
//                 // console.log('comparing', {currentTree, treeToCompare})
//                 if (currentTree <= treeToCompare) {
//                     // console.log('bottomLoser', {currentTree, row})
//
//                     bottomWinner = false
//                     break
//                 }
//             }
//
//             // Left
//             let leftWinner = true
//             for (let l = 0; l < treeIndex; l++) {
//                 const treeToCompare = Number(currentRow[l])
//
//                 if (currentTree <= treeToCompare) {
//                     leftWinner = false
//                     break
//                 }
//             }
//
//             // Right
//             let rightWinner = true
//             for (let r = currentRow.length-1; r > treeIndex; r--) {
//                 const treeToCompare = Number(currentRow[r])
//
//                 if (currentTree <= treeToCompare) {
//                     rightWinner = false
//                     break
//                 }
//             }
//
//             if (topWinner || bottomWinner || rightWinner || leftWinner) {
//                 totalTreeCount++
//             }
//
//         }
//     }
//
//     console.log({totalTreeCount}) // Answer: 1672
// };
//
// solution1()

const solution2 = async () => {
    // const text = await Deno.readTextFile("./input.txt");
    const text = await Deno.readTextFile("./sample-input.txt");
    const rows = text.split('\n')
    const treeRows = rows.slice(0, rows.length - 1) // remove last empty el
    const treeMatrix = treeRows.map(row => row.split(''))

    // Check each tree, in every direction
    // Loop through rows
    for (let row = 0; row < treeMatrix.length; row++) {
        const currentRow = treeMatrix[row].map(item => Number(item))
        console.log('=======', {currentRow})

        // Loop through indices of each row
        for (let rowItemIndex = 0; rowItemIndex < currentRow.length; rowItemIndex++) {
            const currentTree = Number(currentRow[rowItemIndex])
            console.log('xxxxxxx', { currentTree, rowIndex: rowItemIndex, rowMinus1: row-1})

            // Top - check from item
            let topScore = 0
            for (let iRow = row - 1; iRow >= 0; iRow--) {
                const treeToCompare = Number(treeMatrix[iRow][rowItemIndex])

                console.log('looping through rows', { currentTree, treeToCompare, row, iRow  })
                if (currentTree <= treeToCompare) {
                    console.log('topPass', {currentTree, treeToCompare, iRow})
                    topScore++

                    if (currentTree === treeToCompare) {
                        console.log('topBreak', {currentTree, treeToCompare, iRow})
                        break
                    }
                }
            }

            // console.log({topScore})

            // Bottom
            let bottomScore = 0
            for (let b = treeMatrix; b > row; b--) {
                const treeToCompare = Number(treeMatrix[b][rowItemIndex])

                if (currentTree <= treeToCompare) {
                    bottomScore = false
                    break
                }
            }

            // Left
            let leftScore = 0
            for (let l = 0; l < rowItemIndex; l++) {
                const treeToCompare = Number(currentRow[l])

                if (currentTree <= treeToCompare) {
                    leftScore = false
                    break
                }
            }

            // Right
            let rightScore = 0
            for (let r = currentRow.length-1; r > rowItemIndex; r--) {
                const treeToCompare = Number(currentRow[r])

                if (currentTree <= treeToCompare) {
                    rightScore = false
                    break
                }
            }
        }
    }

};

solution2()
