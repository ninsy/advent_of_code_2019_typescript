import { getTotalFuel } from './part2';

describe('Fuel for module', () => {
    it('Gives correct answer', async () => {
        expect(getTotalFuel(14)).toEqual(2);
    });
    it('Gives correct answer', async () => {
        expect(getTotalFuel(1969)).toEqual(966);
    });
    it('Gives correct answer', async () => {
        expect(getTotalFuel(100756)).toEqual(50346);
    });
});