import { parseSpaceMap, SpaceObjectPair, SpaceGraph } from './part1';

describe('parseSpaceMap', () => {
    it('retreives proper data', () => {
         const input = 
            '555)9Z3\n' +
            'TNS)D9L\n' +
            '555)L11\n' +
            '9Z3)5RH\n' +
            '5RH)R87';

        const expectedOutput: SpaceObjectPair[] = [
            ['555', '9Z3'],
            ['TNS', 'D9L'],
            ['555', 'L11'],
            ['9Z3', '5RH'],
            ['5RH', 'R87']
        ];

        const output = parseSpaceMap(input);

        expect(output).toEqual(expectedOutput);

    });
});

describe('SpaceGraph', () => {
    it('constructs proper graph', () => {
        const input: SpaceObjectPair[] = [
            ['555', '9Z3'],
            ['TNS', 'D9L'],
            ['555', 'L11'],
            ['9Z3', '5RH'],
            ['5RH', 'R87']
        ];
        const expectedOutput = {
            '555': ['9Z3', 'L11'],
            'TNS': ['D9L'],
            '9Z3': ['5RH'],
            '5RH': ['R87']
        };
        const g = new SpaceGraph(input);

        expect(g.graph).toEqual(expectedOutput);
    });
});

describe('direct orbit count', () => {
    const input: SpaceObjectPair[] = [
        ['555', '9Z3'],
        ['TNS', 'D9L'],
        ['555', 'L11'],
        ['9Z3', '5RH'],
        ['5RH', 'R87']
    ];
    const g = new SpaceGraph(input);

    expect(g.totalDirectOrbitCount()).toEqual(5);

});