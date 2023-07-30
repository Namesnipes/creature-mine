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

	/**
	 * Generate a random integer between the specified minimum and maximum values.
	 *
	 * @param {number} min - The minimum value (inclusive).
	 * @param {number} max - The maximum value (inclusive).
	 * @return {number} - The randomly generated integer.
	 */

	// helper.ts
	
	static RoundToNDecimalPlaces(value: number, n: number): number {
		const multiplier = Math.pow(10, n);
		return Math.round(value * multiplier) / multiplier;
	}
	

	static randomIntFromInterval(min: number, max: number) { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
      
}