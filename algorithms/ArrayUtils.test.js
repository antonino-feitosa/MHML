
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

	it('shuffle the array whitout throwing erros', () => {
		expect(_ => ArrayUtils.shuffle([])).not.toThrow();
	});

	it('can not choose a element throwing a error', () => {
		expect(_ => ArrayUtils.choose([])).toThrow('It is not possible to choose a element of a empty set.');
	});

	it('can not choose a index element throwing a error', () => {
		expect(_ => ArrayUtils.chooseIndex([])).toThrow('It is not possible to choose a element of a empty set.');
	});
});

describe.each([
		[[1], 1, 0, 1],
		//[[1,2,4,5], 1, 0, 1],
		//[[5,4,2,1], 1, 4, 1],
		//[[1,2,1,2,1,2,1], 1, 0, 4],
		//[[2,1,2,1,2,1,2], 1, 1, 3]
	])('for the array %p with minimum %p at index %p, %p times', (array, minimum, index, repetitions) => {

	it('must return the minimum index ' + index,_=>{
		expect(ArrayUtils.minimumIndex(array)).toBe(index);
	});
	
	it.skip('must return the minimum ' + minimum,_=>{
		expect(ArrayUtils.minimum(array)).toBe(minimum);
	});

	it.skip(`must return the minimum array with ${minimum} with ${repetitions} copies`,_=>{
		let exp = Array.from({length:repetitions}).fill(minimum);
		expect(ArrayUtils.minimumArray(array)).toBe(exp);
	});
});
