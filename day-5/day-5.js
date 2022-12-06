const makeMovesArray = originalArray => {
    const moveTextArray = originalArray.filter(item => item.includes('move'))
    const moves = []

    for (let i = 0; i < moveTextArray.length; i++) {
        const [numItemsToMove, startPosition, endPosition] = moveTextArray[i].replace(/[a-z]/g, '').split(' ').filter(item => item !== "")
        moves.push({
            numItemsToMove, startPosition, endPosition
        })
    }

    return moves
}


const makeStacks = originalArray =>{
    const rawStacks = originalArray.filter(item => !item.includes('move') && item !== '')
    const middleStepStacks = []
    const stacks = Array.from(Array(9), () => [])

    for (let i = 0; i < rawStacks.length-1; i++) {
        const rawRow = rawStacks[i]
        const newRow = rawRow.split(' ')

        // replace 4 spaces with null
        for (let j = 0; j < newRow.length; j++) {
            newRow[j] = newRow[j].replace(/\[|]/g, '') // remove brackets

            const currentSpot = newRow[j] === ''
            const spot2 = newRow[j+1] === ''
            const spot3 = newRow[j+2] === ''
            const spot4 = newRow[j+3] === ''

            if (currentSpot && spot2 && spot3 && spot4) {
                newRow.splice(j, 4, null)
            }

        }
        middleStepStacks.push(newRow)
    }

    // create stack from middleStepStacks
    for (let k = 0; k < middleStepStacks.length; k++) { // stepping rows in middleStepStacks
        for (let l = 0; l < middleStepStacks[k].length; l++) { // stepping items in separate arrays
            if (middleStepStacks[k][l] !== null) {
                stacks[l].unshift(middleStepStacks[k][l])
            }
        }
    }

    return stacks
}



// const solution1 = async () => {
//     const text = await Deno.readTextFile("./input.txt");
//     const textArray = text.split("\n");
//
//     const moves = makeMovesArray(textArray)
//     const stacks = makeStacks(textArray)
//
//
//     // Execute the moves
//     moves.forEach(move => {
//         const { numItemsToMove, startPosition, endPosition } = move
//
//         for (let i = 0; i < numItemsToMove; i++) {
//             const poppedItem = stacks[startPosition-1].pop()
//             stacks[endPosition-1].push(poppedItem)
//         }
//     })
//
//     let answer = []
//     stacks.forEach(stack => {
//         answer.push(stack[stack.length-1])
//     })
//     console.log(answer.join(''))
// };

// solution1();


const solution2 = async () => {
    const text = await Deno.readTextFile("./input.txt");
    const textArray = text.split("\n");

    const moves = makeMovesArray(textArray)
    const stacks = makeStacks(textArray)


    // Execute the moves
    const newMoves = []
    moves.forEach(move => {
        const { numItemsToMove, startPosition, endPosition } = move

        let chunk = []
        for (let i = 0; i < numItemsToMove; i++) {
            const poppedItem = stacks[startPosition-1].pop()
            chunk.unshift(poppedItem)
        }
        stacks[endPosition-1] = stacks[endPosition-1].concat(chunk)
        console.log(chunk)
    })

    let answer = []
    stacks.forEach(stack => {
        answer.push(stack[stack.length-1])
    })
    console.log('answer', answer.join(''))
};

solution2();


// const newMoves = []
// moves.forEach(move => {
//     const { numItemsToMove, startPosition, endPosition } = move
//
//     let chunk = []
//     for (let i = 0; i < numItemsToMove; i++) {
//         const poppedItem = stacks[startPosition-1].pop()
//         console.log( stacks)
//         chunk.unshift(poppedItem)
//     }
//     const newStack = stacks[endPosition-1].concat(chunk)
//     newMoves.push(newStack)
// })

