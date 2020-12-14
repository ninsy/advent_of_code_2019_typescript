import { chunkArray, Layer } from './part1';

describe('chunk array', () => {
    it('properly chunks array', () => {
        const input = '123456789012'.split('').map(n => Number(n));
        const expectedOutput = [
            [1,2,3,4,5,6],
            [7,8,9,0,1,2]
        ];
        const output = chunkArray(input, 3 * 2);
        expect(output).toEqual(expectedOutput);
    })
});

describe('Layer class', () => {
    it('initializes properly', () => {
        const fakeChunk = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        const l = new Layer(3, 5, fakeChunk);
        expect(l.pixels).toEqual([
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [10,11,12],
            [13,14,15],
        ]);
    });
    
    describe('getDigitCount', () => {
        it('gives proper zero count', () => {
            const l = new Layer(3,3,[]);
            l.pixels = [
                [0,0,0],
                [1,2,3],
                [0,5,0],
                [7,9,0],
            ];
            expect(l.getDigitCount(0)).toEqual(6);
        });
    });
    
    describe('lowestZeroCount', () => {
        it('returns proper layer', () => {
            const layerA = new Layer(2,2, [1,0,0,0]);
            const layerB = new Layer(2,2, [1,0,3,4]);
            const layerC = new Layer(2,2, [1,2,3,4]);
            const layerD = new Layer(2,2, [0,0,3,4]);

            const layers = [ layerA, layerB, layerC, layerD ];

            const output = Layer.lowestZeroCount(layers);

            expect(output.pixels).toEqual(layerC.pixels);

        });
    })
});

describe('Part 2', () => {
    it('constucts proper output image', () => {
        const layerA = new Layer(2,2, [0,2,2,2]);
        const layerB = new Layer(2,2, [1,1,2,2]);
        const layerC = new Layer(2,2, [2,2,1,2]);
        const layerD = new Layer(2,2, [0,0,0,0]);

        const layers = [ layerA, layerB, layerC, layerD ];

        const output = Layer.getFullImage(layers);

        expect(output.pixels).toEqual([
            [0,1],
            [1,0]
        ])

    });
});