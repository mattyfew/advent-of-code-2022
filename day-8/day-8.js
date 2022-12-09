const solution1 = async () => {
    // const text = await Deno.readTextFile("./input.txt");
    const text = await Deno.readTextFile("./sample-input.txt");
    const rows = text.split('\n')
    const treeRows = rows.slice(0, rows.length - 1) // remove last empty el
    const treeMatrix = treeRows.map(row => row.split(''))

    // 1. Count all the edges
    let totalTreeCount = treeMatrix[0].length * 2 // Count entire first and last row
    totalTreeCount += treeMatrix.length * 2   // Count all elements at indices 0 and last
    totalTreeCount = totalTreeCount - 4 // remove double counts of corners
    console.log({totalTreeCount})

    // 2. Check each tree, in every direction (skip first and last row)

    // i = row
    // j = index in row
    // t = row index from top

    for (let i = 1; i < treeMatrix.length - 1; i++) {
        const currentRow = treeMatrix[i]

        // Loop through row, checking height. Skip 0 and last indices
        for (let j = 1; j < currentRow.length - 1; j++) {
            const currentTree = Number(currentRow[j])
            let winner = true

            // Top - i ... loop through treeMatrix vertically, 0 to i
            let topWinner = true
            for (let t = 0; t < i; t++) {
                const treeToCompare = Number(treeMatrix[t][j])

                if (currentTree <= treeToCompare) {
                    topWinner = false
                }
            }

            // Bottom - b ... loop through treeMatrix vertically, b to treeMatrix.length
            let bottomWinner = true
            for (let b = treeMatrix.length-1; b > i; b--) {
                const treeToCompare = Number(treeMatrix[b][j])

                if (currentTree <= treeToCompare) {
                    bottomWinner = false
                }
            }

            // Left - j ... looping through row, 0 to j
            let leftWinner = true
            for (let l = 0; l < j; l++) {
                const treeToCompare = Number(treeMatrix[j][l])

                if (currentTree <= treeToCompare) {
                    leftWinner = false
                }
            }

            // Right - j ... looping through row, j to row.length
            let rightWinner = true
            for (let r = currentRow.length-2; r > j; r--) {
                const treeToCompare = Number(treeMatrix[j][r])

                if (currentTree <= treeToCompare) {
                    rightWinner = false
                }
            }

            if (topWinner || bottomWinner || rightWinner || leftWinner) totalTreeCount++

        }
    }

    console.log({totalTreeCount})
};

solution1()



// 9169 - too high
