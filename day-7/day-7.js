let globalTotalSize = 0
const decoder = new TextDecoder("utf-8");
const commandEnum = {
    cd: 'cd',
    ls: 'ls',
    file: 'file',
    dir: 'dir'
};
const { cd, ls, file, dir } = commandEnum

const getCommandDetails = command => {
    const input = command.substring(0, 4)
    let type

    if (input === '$ cd') {
        type = cd
        let path = command.substring(5)
        return { type, path }
    } else if (input === '$ ls') {
        type = ls
        return { type }
    } else if (input === 'dir ') {
        type = dir
        let dirName = command.substring(4)
        return { type, dirName}
    } else {
        type = file
        const [ fileSize, fileName ] = command.split(' ')
        return { type, fileSize: Number(fileSize), fileName }
    }
}

const handleCdCommand = ({ path }, currentDir) => {
    let newPath

    if (path === '..') {
        const indexOfSlash = currentDir.lastIndexOf('/')
        newPath = currentDir.substring(0, indexOfSlash)
    } else {
        newPath = `${currentDir}/${path}`
    }

    return newPath
}

// Get all files for a given dir
const getAllFiles = async (dir) => {
    const files = []
    for await (const dirEntry of Deno.readDir(dir)) {
        if(!dirEntry.isFile) continue;
        files.push(dirEntry.name)
    }
    return files
}

const evaluateDirSize = async (dirPath, currentDirSize = 0) => {
    for await (const dirEntry of Deno.readDir(dirPath)) {
        if (dirEntry.isDirectory) {
            const allFilesForDir = await getAllFiles(dirPath)

            const totalFileSizeForDir = await allFilesForDir.reduce(async (acc, fileName) => {
                const data = await Deno.readFile(`${dirPath}/${fileName}`)
                const fileSize = Number(decoder.decode(data))

                acc += fileSize
                return acc
            }, 0)

            if (totalFileSizeForDir <= 100000) {
                console.log({dirEntry, totalFileSizeForDir})
                globalTotalSize += totalFileSizeForDir
            }

            const nextDirPath = `${dirPath}/${dirEntry.name}`

            // console.log('directory', {dirEntryName: dirEntry.name})
            await evaluateDirSize(nextDirPath)
        }

        // if (dirEntry.isFile) {
        //     const filePath = `${dirPath}/${dirEntry.name}`
        //
        //     const data = await Deno.readFile(filePath)
        //     const fileSize = Number(decoder.decode(data))
        //
        //     currentDirSize += fileSize
        //     // console.log('file', filePath, currentDirSize)
        // }
    }
}

const solution1 = async () => {
    const { readTextFile, readDir, readFile, writeTextFile, mkdir, remove } = Deno

    const text = await readTextFile("./input.txt");
    const commandList = text.split("\n");

    // root dir renamed to `main`
    const root = './main'
    await remove(root , { recursive: true })
    await mkdir('main')

    // Skip creating root dir
    let currentDir = root

    // This loop creates the file structure
    // Adding fileSize as text content to the respective file
    for (let i = 1; i < commandList.length; i++) {
        if (!commandList[i]) break

        const commandDetails = getCommandDetails(commandList[i])

        if (commandDetails.type === ls) {
            // get all lines up to the next command
            // or find the index of the next command
            // then, create files and directories
        }

        if (commandDetails.type === dir) {
            const newDir = `${currentDir}/${commandDetails.dirName}`
            await mkdir(newDir)
        }

        if (commandDetails.type === cd) {
            currentDir = handleCdCommand(commandDetails, currentDir)
        }

        if (commandDetails.type === file) {
            const { fileName, fileSize } = commandDetails

            const filePath = `${currentDir}/${fileName}`
            await writeTextFile(filePath, fileSize)
        }
    }

    await evaluateDirSize(root)

    console.log({globalTotalSize})
};

solution1()
