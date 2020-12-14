import { processCoords, produceSegments, CableCoords, CableSegments, giveLine, SinglePoint } from './part1';

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

describe('giveLine', () => {
    test.only('somewhat', () => {
        const x1: SinglePoint = [2,0];
        const y1: SinglePoint = [2,2];

        const output1 = giveLine(x1, y1);
        console.log(output1);

        const x2: SinglePoint = [-1,1];
        const y2: SinglePoint = [-1,2];

        const output2 = giveLine(x2, y2);
        console.log(output2);

        const det = output1[0] * output2[1] - output1[1] * output2[0];
        const detX = output1[2] * output2[1] - output1[1] * output2[2];
        const detY = output1[0] * output2[2] - output1[2] * output2[0];
        // console.log(det);
        const x = detX / det;
        const y = detY / det;
        console.log(`[${x}, ${y}]`);


    });
});

describe('distance for point', () =>{

})

describe('distance for whole cluster of point',() =>{

})