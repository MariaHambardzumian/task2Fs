import { appendFile, statSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const current = {
    count: 0,
    path: './'
}
async function findDeepest(thisPath = './', count = 0) {
    if (current.count < count) {
        current.count = count
        current.path = thisPath
    }
    else if (current.count == count) {

        current.path = [current.path, thisPath].flat()
    }
    try {
        const files = await readdir(thisPath);
        for (const file of files) {
           let isFolder = statSync(resolve(thisPath, file)).isDirectory()
            if (isFolder) {
               await findDeepest(resolve(thisPath, file), count + 1)
            }
        }
    } catch (err) {
        console.log('Error');
    }
}
await findDeepest()

appendFile(resolve(current.path?.[0], 'deeepest.txt'), 'contentt', (err)=>{
    if (err) {
        throw err
    }
    console.log('Succesfully added in ' + current.path?.[0] );
})

