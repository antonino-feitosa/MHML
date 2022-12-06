
const ArrayUtils = require('./ArrayUtils');

describe('for the array []', () => {
	it('do not have minimum index returning -1', () => {
		expect(ArrayUtils.minimumIndex([])).toBe(-1);
	});

	it('do not have minimum element returning null', () => {
		expect(ArrayUtils.minimum([])).toBe(null);
	});

	it('do not have minimum array returning []', () => {
		expect(ArrayUtils.minimumArray([])).toEqual([]);
	});

	it('shuffle must return the same empty array', () => {
		let arr = [];
		expect(ArrayUtils.shuffle(arr)).toBe(arr);
	});

	it('shuffle must the array whitout throwing erros', () => {
		expect(() => ArrayUtils.shuffle([])).not.toThrow();
	});

	it('can not choose a element throwing a error', () => {
		expect(() => ArrayUtils.choose([])).toThrow('It is not possible to choose a element of a empty set.');
	});

	it('can not choose a index element throwing a error', () => {
		expect(() => ArrayUtils.chooseIndex([])).toThrow('It is not possible to choose a element of a empty set.');
	});
});

describe.each([
		[[1], 1, 0, 1],
		[[1,2,4,5], 1, 0, 1],
		[[5,4,2,1], 1, 3, 1],
		[[1,2,1,2,1,2,1], 1, 0, 4],
		[[2,1,2,1,2,1,2], 1, 1, 3]
	])('for the array %p with minimum %p at index %p, %p times', (array, minimum, index, repetitions) => {

	it('must return the minimum index' + index,()=>{
		expect(ArrayUtils.minimumIndex(array)).toBe(index);
	});
	
	it('must return the minimum ' + minimum,()=>{
		expect(ArrayUtils.minimum(array)).toBe(minimum);
	});

	it(`must return the minimum array with ${minimum} with ${repetitions} copies`,()=>{
		let exp = Array.from({length:repetitions}).fill(minimum);
		expect(ArrayUtils.minimumArray(array)).toEqual(exp);
	});

	describe('with random returning 0',()=>{

		const rand = { nextInt: jest.fn(_ => 0)};

		it('chooseIndex must return 0', ()=>{
			expect(ArrayUtils.chooseIndex(array, rand)).toBe(0);
		});

		it('choose must return the first element ' + array[0], ()=>{
			expect(ArrayUtils.choose(array, rand)).toBe(array[0]);
		});

		if('shuffle must move the first element to the last position',()=>{
			let exp = Array.from(array);
			exp.push(exp.shift());
			expect(ArrayUtils.shuffle(array)).toEqual(exp);
		});
	});

	describe('with random returning the maximum -1',()=>{

		const rand = { nextInt: jest.fn(x => x-1)};

		it('chooseIndex must return length -1', ()=>{
			expect(ArrayUtils.chooseIndex(array, rand)).toBe(array.length -1);
		});

		it('choose must return the last element ' + array[array.length-1], ()=>{
			expect(ArrayUtils.choose(array, rand)).toBe(array[array.length -1]);
		});

		if('shuffle must reverse the array',()=>{
			expect(ArrayUtils.shuffle(array)).toEqual(array.reverse());
		});
	});
});

