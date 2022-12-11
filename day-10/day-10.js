const ADDX = 'addx'
const NOOP = 'noop'

const getCommandType = (command) => {
    const [part1, part2] = command.split(' ')
    if (part1 === ADDX) {
        return [ADDX, Number(part2)]
    } else {
        return [NOOP]
    }
}

const shouldDrawPixel = (X, position) => {
    return X-1 === position || X === position || X+1 === position
}

const drawPoint = (row, position) => {
    return row.replaceAt(position, '#')
}

const createRow = () => ".".repeat(40)

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const solution1 = async () => {
    const text = await Deno.readTextFile("./input.txt");
    // const text = await Deno.readTextFile("./sample-input.txt");
    let commands = text.split('\n')
    commands = commands.slice(0, commands.length - 1) // remove last empty el

    let X = 1
    let signalStrength = 0
    let numCycles = 0
    const cyclesToCheck = [20, 60, 100, 140, 180, 220]
    
    for (let i = 0; i < commands.length; i++) {
        let signalStrengthToAdd = 0
        const currentCommand = commands[i]
        const [commandType, V] = getCommandType(currentCommand)

        if (commandType === ADDX) {
            numCycles++

            if (cyclesToCheck.includes(numCycles)) {
                signalStrengthToAdd = numCycles * X
            }

            numCycles++

            if (cyclesToCheck.includes(numCycles)) {
                signalStrengthToAdd = numCycles * X
            }

            X += V
        }

        if (commandType === NOOP) {
            numCycles++

            if (cyclesToCheck.includes(numCycles)) {
                signalStrengthToAdd = numCycles * X
            }
        }

        signalStrength += signalStrengthToAdd
    }

    console.log({ signalStrength }) // Answer: 13760
};

solution1()


const solution2 = async () => {
    const text = await Deno.readTextFile("./input.txt");
    // const text = await Deno.readTextFile("./sample-input.txt");
    let commands = text.split('\n')
    commands = commands.slice(0, commands.length - 1) // remove last empty el

    let screen = ''
    let row = createRow()
    let rowCount = 1

    let X = 1 // middle of sprite
    let numCycle = 0
    let position = 0

    for (let i = 0; i < commands.length; i++) {
        const currentCommand = commands[i]
        const [commandType, V] = getCommandType(currentCommand)

        numCycle++

        if (commandType === ADDX) {
            if (shouldDrawPixel(X, position)) {
                row = drawPoint(row, position)
            }

            if (numCycle % 40 === 0) {
                screen = screen + row + '\n'
                row = createRow()
                rowCount++
                position = 0
            } else {
                position++

            }

            numCycle++

            if (shouldDrawPixel(X, position)) {
                row = drawPoint(row, position)
            }

            X += V
        }

        if (commandType === NOOP) {
            if (shouldDrawPixel(X, position)) {
                row = drawPoint(row, position)
            }
        }

        position++

        if (numCycle % 40 === 0) {
            let ending = rowCount > 5 ? '' : '\n'
            screen = screen + row + ending
            row = createRow()
            rowCount++
            position = 0
        }
    }

    console.log(screen) // Answer: RFKZCPEF
};

solution2()
