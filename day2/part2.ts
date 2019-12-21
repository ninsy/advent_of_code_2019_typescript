import { run } from './part1';

const answer = 19690720;

const bruteForceAnswer = async (): Promise<[number, number]> => {
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const output = await run([i, j]);
            if (output === answer) {
                return [i, j];
            }
        }
    }
    return [0, 0];
}

bruteForceAnswer()
    .then(([noun, verb]) => {
        console.log(`Answer is ${100 * noun + verb}`);
    })