import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const ORBITS_FILE_PATH = './orbits.txt';

const readFile = promisify(_readFile);

export type SpaceObjectPair = [string, string];

export class SpaceGraph {
    public graph: { [id: string]: string[]};

    constructor(pairs: SpaceObjectPair[]) {
        this.graph = {};
        for(let pair of pairs) {
            let [centerId, onOrbitId] = pair;
            if (!(centerId in this.graph)) {
                this.graph[centerId] = [onOrbitId];
            } else {
                this.graph[centerId].push(onOrbitId);
            }
        }
    }

    private directOrbitCount(id: string): number {
        return this.graph[id].length;
    }

    private totalIndirectOrbitCount(id: string, sum = 0, alreadyCounted: Set<string> = new Set<string>()): number {
        if (alreadyCounted.has(id)) return sum;
        alreadyCounted.add(id);
        
        for (let orbitObjectId in this.graph[id]) {
            sum += this.totalIndirectOrbitCount(orbitObjectId, sum, alreadyCounted);
        }

        return sum;
    }

    public totalDirectOrbitCount(): number {
        return Object.keys(this.graph)
            .reduce((sum, curr) => sum += this.directOrbitCount(curr), 0);
    }

    public totalOrbitCount(): number {
        // TODO: need to store info about root
        return this.totalDirectOrbitCount() + this.totalIndirectOrbitCount();
    }
 }

export const parseSpaceMap = (spaceMapInput: string): SpaceObjectPair[] => {
    let spaceObjectPairs: SpaceObjectPair[] = [];

    // length of input === total direct orbit count 
    let input = spaceMapInput.split('\n');

    for (let line of input) {
        let [obj1, obj2] = line.split(')');
        spaceObjectPairs.push([obj1, obj2]);
    }

    return spaceObjectPairs;
}

const run = async (): Promise<number> => {
    
    // const spaceMap = (await readFile(ORBITS_FILE_PATH, 'utf-8'));
    // const graph = new SpaceGraph(spaceMap);

    return 0;
}

if (require.main === module) {
    run().then(totalFuel => console.log(totalFuel));
}

