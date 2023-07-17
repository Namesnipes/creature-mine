export abstract class Helper{

    /**
     * Performs linear interpolation between two values.
     *
     * @param {number} start - The starting value.
     * @param {number} stop - The ending value.
     * @param {number} amt - The percentage to interpolate between the start and stop values.
     *                       The value should be between 0 (0%) and 1 (100%), inclusive.
     * @return {number} The value between the start and stop values according to the given percentage.
     */
    static Lerp(start: number, stop: number, amt: number) {
        if (amt > 1)
            amt = 1;
        else if (amt < 0)
            amt = 0;
        return start + (stop - start) * amt;
    }
}