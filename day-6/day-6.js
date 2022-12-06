const createCharMap = (...chars) => {
    return chars.reduce((acc, item) => {
        acc[item] = acc[item]+1 || 1
        return acc
    }, {})
}

const checkCharMap = charMap => {
    return Object.values(charMap).every(n => n === 1)
}

const solution1 = async () => {
    const bufferStr = await Deno.readTextFile("./input.txt");
    const buffer = bufferStr.split('')

    const startIndex = 3
    let strToCheck = ''
    let winner = null

    for (let i = startIndex; i < buffer.length; i++) {
        const char1 = buffer[i-3]
        const char2 = buffer[i-2]
        const char3 = buffer[i-1]
        const char4 = buffer[i]

        strToCheck = `${char1}${char2}${char3}${char4}`
        const charMap = createCharMap(char1, char2, char3, char4)
        const verdict = checkCharMap(charMap)

        if (verdict) {
            winner = { i: i+1, strToCheck, charMap, verdict }
            console.log(winner) // answer: i = 1794
            return
        }
    }
};

const solution2 = async () => {
    const bufferStr = await Deno.readTextFile("./input.txt");
    const buffer = bufferStr.split('')

    const startIndex = 13
    let winner = null

    for (let i = startIndex; i < buffer.length; i++) {
        const chunk = [...buffer].splice(i-startIndex, startIndex+1)
        const charMap = createCharMap(...chunk)
        const verdict = checkCharMap(charMap)

        if (verdict) {
            winner = { i: i+1, charMap, verdict }
            console.log(winner) // answer: i = 2851
            return
        }
    }
};

solution2();

