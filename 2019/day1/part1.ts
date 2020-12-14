import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const MASSES_FILE_PATH = './masses.txt';

const readFile = promisify(_readFile);

const run = async (): Promise<number> => {
    const masses = (await readFile(MASSES_FILE_PATH, 'utf-8'))
        .split('\n')
        .map(n => Number(n));
    return masses.reduce((sum, curr): number => {
        sum += Math.floor(curr / 3) - 2
        return sum;
    }, 0);
}

if (require.main === module) {
    run().then(totalFuel => console.log(totalFuel));
}

