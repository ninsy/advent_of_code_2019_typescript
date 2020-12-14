import { Add, Multiply, process } from './part1';

// TODO: something wrong with these tests...
describe('Intcode interpreter', () => {
    it('outputs proper values', async () => {
        const input = [
            1,9,10,3,
            2,3,11,0,
            99,
            30,40,50
        ];
        const expectedOutput = [
            3500,9,10,70,
            2,3,11,0,
            99,
            30,40,50
        ];
        process(input);
        expect(input).toEqual(expectedOutput);
    });
    it('outputs proper values', async () => {
        const input = [1,1,1,4,99,5,6,0,99];
        const expectedOutput = [30,1,1,4,2,5,6,0,99];
        process(input);
        expect(input).toEqual(expectedOutput);
    });
});

describe('Add computation', () => {
    it('writes proper value at intcode location', async () => {
        const input = [1,0,0,0,99];
        const expectedOutput = [2,0,0,0,99];
        new Add().run(input, 0);
        expect(input).toEqual(expectedOutput);
    });
});

describe('Multiply computation', () => {
    it('writes proper value at intcode location', async () => {
        const input = [2,4,4,5,99,0];
        const expectedOutput = [2,4,4,5,99,9801];
        new Multiply().run(input, 0);
        expect(input).toEqual(expectedOutput);
    });
    it('writes proper value at intcode location', async () => {
        const input = [2,3,0,3,99];
        const expectedOutput = [2,3,0,6,99];
        new Multiply().run(input, 0);
        expect(input).toEqual(expectedOutput);
    });
});