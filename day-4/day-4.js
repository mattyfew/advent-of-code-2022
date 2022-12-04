// const solution1 =*


const solution2 = async () => {
    const text = await Deno.readTextFile("./input.txt");
    const pairs = text.split("\n");

    const distributeNumbers = numberRange => {
        const range = []
        let [min, max] = numberRange.split('-')
        min = Number(min)
        max = Number(max)

        for (let i = min; i <= max; i++) {
            range.push(i)
        }

        return range
    }

    let counter = 0
    for (let pair of pairs) {
        if (pair === '') break

        const [pair1, pair2] = pair.split(',')
        const pair1Range = distributeNumbers(pair1)
        const pair2Range = distributeNumbers(pair2)
        const verdict1 = pair1Range.some(elem => pair2Range.includes(elem))
        const verdict2 = pair2Range.some(elem => pair1Range.includes(elem))

        const bothMatch = verdict1 === true && verdict2 === true
        const oneMatch = verdict1 === true || verdict2 === true

        if (bothMatch || oneMatch) {
            counter = counter + 1
        }
    }
    console.log(counter)
};

solution2();

