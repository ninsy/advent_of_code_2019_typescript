import { Cipher, digitsIncreasing, numberToCipher, hasDouble } from './part1';

describe('increasing digits', () => {
    it('returns false for descreasing digits', () => {
        const a = numberToCipher(123123);
        const b = numberToCipher(123451);
        const c = numberToCipher(678123);
        const d = numberToCipher(431231);
        const e = numberToCipher(135646);

        expect(digitsIncreasing(a)).toBe(false);
        expect(digitsIncreasing(b)).toBe(false);
        expect(digitsIncreasing(c)).toBe(false);
        expect(digitsIncreasing(d)).toBe(false);
        expect(digitsIncreasing(e)).toBe(false);
    });
    it('returns true for increasing digits', () => {
        const a = numberToCipher(123456);
        const b = numberToCipher(233459);
        const c = numberToCipher(236679);
        const d = numberToCipher(455699);
        const e = numberToCipher(122345);

        expect(digitsIncreasing(a)).toBe(true);
        expect(digitsIncreasing(b)).toBe(true);
        expect(digitsIncreasing(c)).toBe(true);
        expect(digitsIncreasing(d)).toBe(true);
        expect(digitsIncreasing(e)).toBe(true);
    });
});

describe('adjacent doubles', () => {
    it('returns false for no doubles digits', () => {
        const a = numberToCipher(123456);
        const b = numberToCipher(123123);
        const c = numberToCipher(135790);
        const d = numberToCipher(123489);
        const e = numberToCipher(456789);

        expect(hasDouble(a)).toBe(false);
        expect(hasDouble(b)).toBe(false);
        expect(hasDouble(c)).toBe(false);
        expect(hasDouble(d)).toBe(false);
        expect(hasDouble(e)).toBe(false);
    });
    it('returns true for double digits in cip[her', () => {
        const a = numberToCipher(123345);
        const b = numberToCipher(233459);
        const c = numberToCipher(236679);
        const d = numberToCipher(455699);
        const e = numberToCipher(122345);

        expect(hasDouble(a)).toBe(true);
        expect(hasDouble(b)).toBe(true);
        expect(hasDouble(c)).toBe(true);
        expect(hasDouble(d)).toBe(true);
        expect(hasDouble(e)).toBe(true);
    });
});