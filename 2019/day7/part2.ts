import { Cipher, LOWER_BOUND, HIGHER_BOUND, digitsIncreasing, hasDouble, numberToCipher } from './part1';

export type DigitIndicies = Array<number>; 
export type Groups = { [id: number]: DigitIndicies};

export const makeGroups = (c: Cipher): Groups =>  {
    let groups: Groups = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
    };
    
    for (let i = 0; i < c.length; i++) {
        groups[c[i]].push(i);
    }

    return groups;
}

export const clearGroups = (c: Cipher): Array<number> => {
    const cipher: Cipher = Object.assign([], c);
    const groups: Groups = makeGroups(cipher);
    for (let group in groups) {
        const groupIndexes = groups[group];
        if (groupIndexes.length > 2) {
            for (let index of groupIndexes) {
                cipher[Number(index)] = -1;
            }
        }
    }
    for (let i: number = cipher.length; i >= 0; i--) {
        if (cipher[i] === -1) {
            cipher.splice(Number(i), 1);
        }
    }
    return cipher;
};

export const run = async (): Promise<number> => {
    let count = 0;
    for (let i = LOWER_BOUND; i <= HIGHER_BOUND; i++) {
        const cipher = numberToCipher(i);

        // TODO: prolly refactor? that's very naive I guess
        const increasingState = digitsIncreasing(Object.assign([], cipher));
        const doubleState = hasDouble(Object.assign([], cipher)); 

        const clearedOfGroups = clearGroups(Object.assign([], cipher));

        const increasingStateGroups = digitsIncreasing(Object.assign([], clearedOfGroups));
        const doubleStateGroups = hasDouble(Object.assign([], clearedOfGroups)); 


        if (increasingState && doubleState && increasingStateGroups && doubleStateGroups) {
            console.log(`Found: ${cipher}`);
            count++;
        }
    }
    return count;
}

if (require.main === module) {
    run().then(n => console.log(n));
}
