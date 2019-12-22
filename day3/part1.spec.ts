import { processCoords, produceSegments, CableCoords, CableSegments } from './part1';

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
});

describe('Produce segments', () => {
    it('Produces proper segments for array of points', async () => {
        const input: CableCoords = [
            [0, 0],
            [8, 0],
            [8, 5],
            [3, 5],
            [3, 2],
        ];
        const expectedOutput: CableSegments = [
            [[0, 0], [8, 0]],
            [[8, 0], [8, 5]],
            [[8, 5], [3, 5]],
            [[3, 5], [3, 2]],
        ];
        
        const output = produceSegments(input);
        expect(output).toEqual(expectedOutput);
    });
});

describe('distance for point', () =>{

})

describe('distance for whole cluster of point',() =>{

})