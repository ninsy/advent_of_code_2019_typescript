import { processCoords } from './part1';

describe('Process coords', () => {
    it('gives proper coordinates', async () => {
        const input = ['R8','U5','L5','D3'];
        const output = processCoords(input);
        expect(output).toEqual([
            [0, 0],
            [8, 0],
            [8, 5],
            [3, 5],
            [3, 2],
        ]);
    });
    it('gives proper coordinates', async () => {
        const input = ['U7','R6','D4','L4'];
        const output = processCoords(input);
        expect(output).toEqual([
            [0, 0],
            [0, 7],
            [6, 7],
            [6, 3],
            [2, 3],
        ]);
    });
})
