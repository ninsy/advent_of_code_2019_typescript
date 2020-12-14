const programPath = './program.txt';

import { readFile as _readFile } from 'fs';
import { promisify } from 'util';

const readFile = promisify(_readFile);

export type IntcodeArgs = [number, number]
export type InitFunction = (initcode: number[], args: IntcodeArgs) => void;

export type POSITION = 0;
export type IMMEDIATE = 1;
export type Parameter = POSITION | IMMEDIATE;
export type ParameterModes = [Parameter, Parameter, Parameter, Parameter];

// TODO: test for those parsing
// TODO: probably generic handling of position vs immediate?
abstract class Calculation {
    protected abstract argumentCount(): number;
    protected abstract runCommand(line: number[], args: number[]): void | number;
    // TODO: test for parameterModes
    protected parseParameterModes(opcode: number): ParameterModes {
        let opcodeStr = String(opcode);
        opcodeStr = opcodeStr.slice(0, opcodeStr.length - 2)
        while (opcodeStr.length !== 3) opcodeStr = '0' + opcodeStr;
        return opcodeStr.split('').map(n =>  Number(n)) as ParameterModes;
    }
    protected handleParameterMode(intcode: number[], parameter: Parameter, arg: number): number {
        if (parameter === 0) {
            return intcode[arg];
        }
        return arg;
    }


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
        const [opcode, arg1, arg2, output] = line;
        const [_, param2, param1] = this.parseParameterModes(opcode);

        const val1 = this.handleParameterMode(intcode, param1, arg1);
        const val2 = this.handleParameterMode(intcode, param2, arg2);

        intcode[output] = val1 + val2;
    }
}

export class Multiply extends Calculation {
    protected argumentCount = () => 4
    protected runCommand(intcode: number[], line: number[]): void {
        const [opcode, arg1, arg2, output] = line;
        const [_, param2, param1] = this.parseParameterModes(opcode);
        
        const val1 = this.handleParameterMode(intcode, param1, arg1);
        const val2 = this.handleParameterMode(intcode, param2, arg2);

        intcode[output] = val1 * val2;
    }
}

export class Write extends Calculation {
    
    protected input: number;
    
    constructor(input: number) {
        super();
        this.input = input;
    }

    protected argumentCount = () => 2
    protected runCommand(intcode: number[], line: number[]): void {
        const [_, arg1] = line;
        intcode[arg1] = this.input; 
    }
}


export class Read extends Calculation {
    protected argumentCount = () => 2
    protected runCommand(intcode: number[], line: number[]): number {
        const [opcode, arg1] = line;
        const [_, __, param1] = this.parseParameterModes(opcode);

        return this.handleParameterMode(intcode, param1, arg1);
    }
}


export class Interpreter {
    protected intcode: number[]
    protected args: IntcodeArgs;
    protected pc: number;


    constructor(intcode: number[], args: IntcodeArgs) {
        this.intcode = intcode
        this.args = args;
        this.pc = 0;
        this.init();
    }

    protected init() {
        this.intcode[1] = this.args[0];
        this.intcode[2] = this.args[1];
    }

    protected parseOpcode = (instruction: number) => {
        let instr = String(instruction);
        if (instr.length === 1) {
            // assume we pretend 0 - '1' => '01'
            instr = '0' + instr;
        }
        const opcode = Number(instr.slice(instr.length - 2, instr.length));
        return opcode;
    };

    public process = (): number => {
        this.pc = 0;
        while (true) {
            const opcode = this.parseOpcode(this.intcode[this.pc]);
            if (opcode === 1) {
                this.pc += new Add().run(this.intcode, this.pc);
                continue;
            } else if (opcode === 2) {
                this.pc += new Multiply().run(this.intcode, this.pc);
                continue;
            } else if (opcode === 3) {
                this.pc += new Write(1).run(this.intcode, this.pc);
                continue;
            } else if (opcode === 4) {
                this.pc += new Read().run(this.intcode, this.pc);
                continue;
            } else if (opcode === 99) {
                break;
            }
        }
        return this.intcode[0];
    }
}

export const runInterpreter = async (inputProgramFilePath: string, args: IntcodeArgs): Promise<number> => {
    const intcode = (await readFile(inputProgramFilePath, 'utf-8'))
        .split(',')
        .map(n => Number(n));
    const interpreter = new Interpreter(intcode, args);
    const exitCode = interpreter.process();
    return exitCode;
}


export const main = async (): Promise<number> => {
    return runInterpreter(programPath, [12, 2]);   
}

if (require.main === module) {
    main();
}
