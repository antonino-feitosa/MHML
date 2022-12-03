
const Random = require('./Random');

const sample_size = 1000;
const seed_pair = [[0, 1], [1, 0], [4, 10]];
const valid_values = [1, 2, 5, 10];
const invalid_values = [-100, -1, 0];
const valid_range = [[0, 1], [0, 10], [5, 10], [-10, 0], [-2, 2]];
const invalid_range = [[0, 0], [-1, -2], [5, 1], [1, 1], [200, 12]];

describe('The generator must fail', () => {
	test.each(invalid_values)('for the integer interval [0,%p)', (max) => {
		let r = new Random();
		expect(() => r.nextInt(max)).toThrow('The limit must be positive.');
	});

	test.each(invalid_range)('for the integer interval [%p,%p)', (min, max) => {
		let r = new Random();
		expect(() => r.nextRange(min, max)).toThrow('The maximum limit must be greater than the minimum.');
	});
});

describe('The generator', () => {
	describe.each(seed_pair)('for different seeds %p and %p', (s1, s2) => {


		let r1 = new Random(s1);
		let r2 = new Random(s2);

		it('must generate different real numbers sequences', () => {
			// The generation of the value x has probability 1/(2^32-1)
			let countSame = 0;
			for (let i = 0; i < sample_size; i++) {
				countSame += r1.nextDouble() === r2.nextDouble() ? 1 : 0;
			}
			expect(countSame).toBe(0);
		});

		it('must generate different boolean sequences', () => {
			// The generation of the same value true or false has probability 0.5
			let countSame = 0;
			for (let i = 0; i < sample_size; i++) {
				countSame += r1.nextBoolean() === r2.nextBoolean() ? 1 : 0;
			}
			expect(countSame / sample_size).toBeLessThan(0.6);
		});

		it.each(valid_values)('must generate different intenger sequences on the interval [0,%p)', (max) => {
			// The generation of the value x has probability 1/p
			let countSame = 0;
			for (let i = 0; i < sample_size; i++) {
				countSame += r1.nextInt(max) === r2.nextInt(max) ? 1 : 0;
			}
			expect(countSame / sample_size).toBeLessThan(1 / max + 0.1);
		});

		it.each(valid_range)('must generate different intenger sequences on the interval [%p,%p)', (min, max) => {
			// The generation of the value x has probability 1/(max - min)
			let countSame = 0;
			for (let i = 0; i < sample_size; i++) {
				countSame += r1.nextRange(min, max) === r2.nextRange(min, max) ? 1 : 0;
			}
			expect(countSame / sample_size).toBeLessThan(1 / (max - min) + 0.1);
		});
	});

	describe.each(valid_values)('for the same seeds %p', (seed) => {

		it('must generate the same real numbers sequence', () => {
			let r1 = new Random(seed);
			let r2 = new Random(seed);
			let vet1 = [];
			let vet2 = [];
			for (let i = 0; i < 10; i++) {
				vet1.push(r1.nextDouble());
				vet2.push(r2.nextDouble());
			}
			expect(vet1).toEqual(vet2);
		});

		it('must generate the same boolean sequence', () => {
			let r1 = new Random(seed);
			let r2 = new Random(seed);
			let vet1 = [];
			let vet2 = [];
			for (let i = 0; i < 10; i++) {
				vet1.push(r1.nextBoolean());
				vet2.push(r2.nextBoolean());
			}
			expect(vet1).toEqual(vet2);
		});

		it.each(valid_values)('must generate the same intenger sequence on the interval [0,%p)', (max) => {
			let r1 = new Random(seed);
			let r2 = new Random(seed);
			let vet1 = [];
			let vet2 = [];
			for (let i = 0; i < 10; i++) {
				vet1.push(r1.nextInt(max));
				vet2.push(r2.nextInt(max));
			}
			expect(vet1).toEqual(vet2);
		});

		it.each(valid_range)('must generate the same intenger sequence on the interval [%p,%p)', (min, max) => {
			let r1 = new Random(seed);
			let r2 = new Random(seed);
			let vet1 = [];
			let vet2 = [];
			for (let i = 0; i < 10; i++) {
				vet1.push(r1.nextRange(min, max));
				vet2.push(r2.nextRange(min, max));
			}
			expect(vet1).toEqual(vet2);
		});
	});
});

describe('The generated values', () => {

	let rand = new Random();

	it('must be only true or false for boolean', () => {
		let values = new Set();
		for (let i = 0; i < sample_size; i++) {
			values.add(rand.nextBoolean());
		}
		expect(values).toEqual(new Set([true, false]));
	});

	it('must be on the interval [0,1)', () => {
		let min = rand.nextDouble();
		let max = min;
		for (let i = 0; i < sample_size; i++) {
			let value = rand.nextDouble();
			min = Math.min(min, value);
			max = Math.max(max, value);
		}
		expect(min).toBeLessThan(1);
		expect(min).toBeGreaterThanOrEqual(0);
		expect(max).toBeLessThan(1);
		expect(max).toBeGreaterThanOrEqual(0);
	});

	it.each(valid_values)('must be on the integer interval [0,%p)', (max) => {
		let values = new Set();
		for (let i = 0; i < sample_size; i++) {
			let value = rand.nextInt(max);
			values.add(value);
		}
		let exp = Array(max).fill().map((_, i) => i);
		expect(Array.from(values).sort((a, b) => a - b)).toEqual(exp);
	});

	it.each(valid_range)('must be on the integer interval [%p,%p)', (min, max) => {
		let values = new Set();
		for (let i = 0; i < sample_size; i++) {
			let value = rand.nextRange(min, max);
			values.add(value);
		}
		let exp = Array(max - min).fill().map((_, i) => min + i);
		expect(Array.from(values).sort((a, b) => a - b)).toEqual(exp);
	});
});

describe.each(valid_values)('The momentuns of the discrete uniform distribution', (seed) => {

	describe.each(valid_values)('in the interval [0,%p)', (max) => {

		let values = [];

		beforeAll(() => {
			let rand = new Random(seed);
			for (let i = 0; i < sample_size; i++) {
				values.push(rand.nextInt(max));
			}
		});

		it('must have mean', () => {
			let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
			expect(mean).toBeCloseTo(max / 2, -1);
		});

		it('must have variance', () => {
			let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
			let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / (sample_size - 1);
			expect(variance).toBeCloseTo((max ** 2 - 1) / 12.0, -1);
		});

		it('must have skewness', () => {
			let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
			let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / (sample_size - 1);
			let m3 = values.reduce((sum, x) => sum += (x - mean) ** 3, 0) / sample_size;
			let skewness = variance === 0 ? 0 : m3 / (variance ** (3 / 2));
			expect(skewness).toBeCloseTo(0, -1);
		});

		it('must have kurtosis', () => {
			let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
			let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / sample_size;
			let m4 = values.reduce((sum, x) => sum += (x - mean) ** 4, 0) / sample_size;
			let kurtosis = variance === 0 ? 0 : m4 / (variance ** 2) - 3;
			expect(kurtosis).toBeCloseTo(max === 1 ? 0 : -(6 * (max ** 2 + 1)) / (5 * (max ** 2 - 1)), -1);
		});
	});


	it.each(valid_range)('must have mean for interval [%p,%p)', (min, max) => {
		let values = [];
		let rand = new Random(seed);
		for (let i = 0; i < sample_size; i++) {
			values.push(rand.nextRange(min, max));
		}
		let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
		expect(mean).toBeCloseTo((max + min) / 2, -2);
	});
});

describe('The momentuns of the continuous uniform distribution in the interval [0,1)', () => {

	let values = [];

	beforeAll(() => {
		let rand = new Random();
		for (let i = 0; i < sample_size; i++) {
			values.push(rand.nextDouble());
		}
	});

	it('must have mean', () => {
		let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
		expect(mean).toBeCloseTo(0.5, -2);
	});

	it('must have variance', () => {
		let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
		let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / (sample_size - 1);
		expect(variance).toBeCloseTo(1.0 / 12.0, -2);
	});

	it('must have skewness', () => {
		let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
		let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / (sample_size - 1);
		let m3 = values.reduce((sum, x) => sum += (x - mean) ** 3, 0) / sample_size;
		let skewness = m3 / (variance ** (3 / 2));
		expect(skewness).toBeCloseTo(0, -2);
	});

	it('must have kurtosis', () => {
		let mean = values.reduce((sum, x) => sum += x, 0) / sample_size;
		let variance = values.reduce((sum, x) => sum += (x - mean) ** 2, 0) / sample_size;
		let m4 = values.reduce((sum, x) => sum += (x - mean) ** 4, 0) / sample_size;
		let kurtosis = m4 / (variance ** 2) - 3;
		expect(kurtosis).toBeCloseTo(-6.0 / 5.0, -2);
	});
});
