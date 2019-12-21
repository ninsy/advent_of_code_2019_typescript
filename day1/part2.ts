import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const MASSES_FILE_PATH = './masses.txt';

const readFile = promisify(_readFile);

export const getTotalFuel = (mass: number): number => {
    let sum = 0;
    while (true) {
        mass = Math.floor(mass / 3) - 2;
        if (mass <= 0) break;
        sum += mass;
    }
    return sum;
}

const run = async (): Promise<number> => {
    const masses = (await readFile(MASSES_FILE_PATH, 'utf-8'))
        .split('\n')
        .map(n => Number(n));
    return masses.reduce((acc, curr) => acc + getTotalFuel(curr), 0);
}

run().then(totalFuel => console.log(totalFuel));