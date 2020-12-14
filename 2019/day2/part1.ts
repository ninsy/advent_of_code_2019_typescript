import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const INTCODE_PATH = './intcode.txt';

const readFile = promisify(_readFile);

export type IntcodeArgs = [number, number]
export type InitFunction = (initcode: number[], args: IntcodeArgs) => void;

abstract class Calculation {

    protected abstract argumentCount(): number;
    protected abstract runCommand(line: number[], args: number[]): void;

    public run(intcode: number[], pc: number): number {
        const argCount = this.argumentCount()
        const currentLine = intcode.slice(pc, pc + argCount);
        this.runCommand(intcode, currentLine);
        return argCount;
    }
}

export class Add extends Calculation {
    protected argumentCount = () => 4
    protected runCommand(intcode: number[], line: number[]): void {
        const [_, arg1, arg2, output] = line;
        intcode[output] = intcode[arg1] + intcode[arg2];
    }
}

export class Multiply extends Calculation {
    protected argumentCount = () => 4
    protected runCommand(intcode: number[], line: number[]): void {
        const [_, arg1, arg2, output] = line;
        intcode[output] = intcode[arg1] * intcode[arg2];
    }
}

export const process = (intcode: number[]): void => {
    let pc = 0;
    while (true) {
        const opcode = intcode[pc];
        if (opcode === 1) {
            pc += new Add().run(intcode, pc);
            continue;
        } else if (opcode === 2) {
            pc += new Multiply().run(intcode, pc);
            continue;
        } else if (opcode === 99) {
            break;
        }
    }   
}

const init: InitFunction = (intcode, args) => {
    intcode[1] = args[0];
    intcode[2] = args[1];
}

export const run = async (args: IntcodeArgs): Promise<number> => {
    const intcode = (await readFile(INTCODE_PATH, 'utf-8'))
        .split(',')
        .map(n => Number(n));
    init(intcode, args);
    process(intcode);
    return intcode[0];
}

if (require.main === module) {
    run([12, 2]).then(n => console.log(n));
}
