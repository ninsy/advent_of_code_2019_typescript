import { makeGroups, clearGroups } from './part2';
import { numberToCipher } from './part1';

describe('makeGroups', () => {
    it('create proper groups', () => {
        const input = numberToCipher(123456);
        const expectedOutput = {
            0: [],
            1: [0],
            2: [1],
            3: [2],
            4: [3],
            5: [4],
            6: [5],
            7: [],
            8: [],
            9: [],
        };
        const output = makeGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('create proper groups', () => {
        const input = numberToCipher(236679);
        const expectedOutput = {
            0: [],
            1: [],
            2: [0],
            3: [1],
            4: [],
            5: [],
            6: [2,3],
            7: [4],
            8: [],
            9: [5],
        };
        const output = makeGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('create proper groups', () => {
        const input = numberToCipher(345555);
        const expectedOutput = {
            0: [],
            1: [],
            2: [],
            3: [0],
            4: [1],
            5: [2,3,4,5],
            6: [],
            7: [],
            8: [],
            9: [],
        };
        const output = makeGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('create proper groups', () => {
        const input = numberToCipher(445667);
        const expectedOutput = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [0,1],
            5: [2],
            6: [3,4],
            7: [5],
            8: [],
            9: [],
        };
        const output = makeGroups(input);
        expect(output).toEqual(expectedOutput);
    });
});

describe('clearGroups', () => {
    it('doesnt edit cipher at all', () => {
        const input = numberToCipher(445667);
        const expectedOutput = input;
        const output = clearGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('clear groups', () => {
        const input = numberToCipher(444667);
        const expectedOutput = [6,6,7];
        const output = clearGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('clear groups', () => {
        const input = numberToCipher(123444);
        const expectedOutput = [1,2,3];
        const output = clearGroups(input);
        expect(output).toEqual(expectedOutput);
    });
    it('clear groups', () => {
        const input = numberToCipher(111122);
        const expectedOutput = [2,2];
        const output = clearGroups(input);
        expect(output).toEqual(expectedOutput);
    });

});