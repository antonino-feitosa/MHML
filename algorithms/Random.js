
/** Class represeting a uniform pseudorandom number generator.
	Implementation of xoshiro128** general-purpose 64-bit number generator with cyrb128 hash initialization.
	The javascript switch to 32-bit integer mode during bitwise operation (justifies the 128 version over 256).

	Implementation based on the stackoverflow discussion:
	@see {@link https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript| stackoverflow.com}
 */
class Random {

	/** Creates a pseudorandom number generator with the informed `seed`.
		@param {*} seed - The seed of the generator (default 0).
	 */
	constructor(seed = 0) {
		let state = Random._cyrb128(String(seed));
		this.rand = Random._xoshiro128ss(state[0], state[1], state[2], state[3]);
	}

	/** Get the next 32-bit pseudorandom number.*/
	_next() {
		return this.rand();
	}

	/** Gets the next pseudorandom integer on the interval [0,`n`).
		@param {*} n - The maximum value (exclusive).
		@returns A pseudorandom integer between 0 (inclusive) and `n` (exclusive).
	 */
	nextInt(n) {
		if(n <= 0)
			throw new Error('The limit must be positive.');
		return this._next() % n;
	}

	/** Gets the next pseudorandom integer on the interval [`min`,`max`).
		@param {*} min - The minimum value (inclusive).
		@param {*} max - The maximum value (exclusive).
		@returns A pseudorandom integer between `min` (inclusive) and `max` (exclusive).
	 */
	nextRange(min, max) {
		if(max <= min)
			throw new Error('The maximum limit must be greater than the minimum.');
		return min + this.nextInt(max - min);
	}

	/** Gets the next pseudorandom real number on the interval [0,1).
		@returns A pseudorandom real number between 0 (inclusive) and 1 (exclusive).
	 */
	nextDouble() {
		return this._next() / 4294967296; // 2^32-1
	}

	/** Gets the next pseudorandom boolean value.
		@returns A pseudorandom boolean value.
	 */
	nextBoolean() {
		return this.nextDouble() >= 0.5;
	}

	/** Hash function to extract no zero 128 seed from a string.*/
	static _cyrb128(str) {
		let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
		for (let i = 0, k; i < str.length; i++) {
			k = str.charCodeAt(i);
			h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
			h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
			h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
			h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
		}
		h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
		h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
		h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
		h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
		return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
	}

	/** Creates xoshiro128** with states a, b, c, d (32-bit integer each) generating 32-bit random integers*/
	static _xoshiro128ss(a, b, c, d) {
		return function () {
			let t = b << 9, r = a * 5;
			r = (r << 7 | r >>> 25) * 9;
			c ^= a;
			d ^= b;
			b ^= c;
			a ^= d;
			c ^= t;
			d = d << 11 | d >>> 21;
			return (r >>> 0);
		};
	}
}

module.exports = Random;
