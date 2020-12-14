import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const INPUT_PATH = './paths.txt';
const readFile = promisify(_readFile);

export type CableCoords = Array<SinglePoint>;
export type SinglePoint = [number, number];

const fillUntil = (output: CableCoords, point: SinglePoint, coord: number, diff: number): void => {
    let toBeInserted: SinglePoint = Object.assign([], point);
    for (let i = 0; i < diff; i++ ) {
        toBeInserted[coord] += i;
        output.push(toBeInserted);
    }
}

export const fillFields = (coords: CableCoords): CableCoords => {
    const localCoords: CableCoords = Object.assign([], coords);
    let prevCoord: SinglePoint = localCoords.shift() as SinglePoint;
    let output: CableCoords = [];

    while (true) {
        const currCoord = localCoords.shift();
        if (typeof currCoord === 'undefined') break;

        if (currCoord[0] === prevCoord[0]) {
            // Difference in Ys
            fillUntil(output, prevCoord, 1, Math.abs(currCoord[1] - prevCoord[1]));
        } else if (currCoord[1] === prevCoord[1]) {
            // Difference in Xs
            fillUntil(output, prevCoord, 0, Math.abs(currCoord[0] - prevCoord[0]));
        }
        prevCoord = currCoord;
    }
    return output;
};
 
export const processCoords = (coords: string[]): CableCoords => {
    const cableCoords: CableCoords = [[0,0]];
    for (let coord of coords) {
        const direction = coord[0];
        const distance = Number(coord.slice(1));
        const [lastX, lastY] = cableCoords[cableCoords.length - 1];
        switch (direction) {
            case 'U':
                cableCoords.push([lastX, lastY + distance]);
                break;
            case 'D':
                cableCoords.push([lastX, lastY - distance]);
                break;
            case 'L':
                cableCoords.push([lastX - distance, lastY]);
                break;
            case 'R':
                cableCoords.push([lastX + distance, lastY]);
                break;
        } 
    }
    return cableCoords;
};

export const run = async () => {
    const [cable1, cable2] = (await readFile(INPUT_PATH, 'utf-8')).split('\n').map(cable => cable.split(','));
    console.log(cable1.length);
    console.log(cable2.length);
}

if (require.main === module) {
    run();
}
