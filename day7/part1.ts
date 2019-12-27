export const LOWER_BOUND = 236491;
export const HIGHER_BOUND = 713787;

export type Cipher = [number, number, number, number, number, number];

export const hasDouble = (c: Array<number>): boolean => {
    let prev = c.shift();
    while (true) {
        const curr = c.shift();
        if (curr === undefined) return false;
        if (curr === prev) {
            return true
        }
        prev = curr;
    }
}

export const digitsIncreasing = (c: Array<number>): boolean => {
    let prev = c.shift();
    while (true) {
        const curr = c.shift();
        if (curr === undefined) return true;
        if (curr < (prev as number)) return false
        prev = curr;
    }
}

export const numberToCipher = (n: number): Cipher => {
    const cipher = String(n).split('').map(n => Number(n));
    if (cipher.length !== 6) throw new Error('Should be 6-ling');
    return cipher as Cipher;
}

export const run = async (): Promise<number> => {
    let count = 0;
    for (let i = LOWER_BOUND; i <= HIGHER_BOUND; i++) {
        const cipher = numberToCipher(i);

        const increasingState = digitsIncreasing(Object.assign([], cipher));
        const doubleState = hasDouble(Object.assign([], cipher)); 

        if (increasingState && doubleState) {
            console.log(`Found: ${cipher}`);
            count++;
        }
    }
    return count;
}

if (require.main === module) {
    run().then(n => console.log(n));
}
