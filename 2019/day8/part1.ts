import { readFile as _readFile } from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';  

const MASSES_FILE_PATH = './pixels.txt';

const readFile = promisify(_readFile);

enum Colors {
    BLACK = 0,
    WHITE = 1,
    TRANSPARENT = 2
}

export const chunkArray = (arr: number[], chunkSize: number): number[][] => {
    const output = [];
    for (var i = 0; i < arr.length; i += chunkSize) {
        output.push(arr.slice(i, i + chunkSize));
    }
    return output;
}

export class Layer {
    public pixels: number[][] = [];
    public width: number;
    public height: number;

    constructor(width = 25, height = 6, pixelChunk: number[]) {
        this.width = width;
        this.height = height;
        for (var i = 0; i < this.height * this.width; i += this.width) {
            this.pixels.push(pixelChunk.slice(i, i + this.width));
        }
    }

    public getDigitCount(n: number): number {
        return this.pixels.flat().filter(pixel => pixel === n).length;
    }

    public static lowestZeroCount(layers: Layer[]): Layer {
        let lowest = layers.shift() as Layer;
        for (let i = 0; i < layers.length; i++) {
            const curr = layers[i];
            if (curr.getDigitCount(0) < lowest.getDigitCount(0)) {
                lowest = curr; 
            }
        }
        return lowest;
    }

    public static getFullImage(layers: Layer[]): Layer {
        let outputImageFlattened = Object.assign({}, layers[0]).pixels.flat().map(_ => 2);

        for (let layer of layers) {
            const pixels = layer.pixels.flat();
            for (let i = 0; i < pixels.length; i++) {
                switch(pixels[i]) {
                    case Colors.BLACK:
                    case Colors.WHITE:
                        if (outputImageFlattened[i] === Colors.TRANSPARENT) {
                            outputImageFlattened[i] = pixels[i];
                        }
                }
            }
        }


        return new Layer(25, 6, outputImageFlattened);
    };
}

export const run = async (): Promise<number> => {
    const pixels = (await readFile(MASSES_FILE_PATH, 'utf-8'))
        .split('')
        .map(n => Number(n));

    const byChunks = chunkArray(pixels, 25 * 6); 
    
    let layers: Layer[] = [];

    for (let chunk of byChunks) {
        layers.push(new Layer(25, 6, chunk));
    }
    
    // PART 1
    // const lowestZerosLayer = Layer.lowestZeroCount(layers);

    // const onesCount = lowestZerosLayer.getDigitCount(1);
    // const twosCount = lowestZerosLayer.getDigitCount(2);
    
    // return onesCount * twosCount;
    
    // PART 2
    const outputImage = Layer.getFullImage(layers);

    let output = '';

    for (let row of outputImage.pixels) {
        output += row.map(number => number === 1 ? chalk.red(number) : number) + '\n';
    }
     
    console.log(output)

    return 0;
}

if (require.main === module) {
    run().then(n => console.log(n));
}
