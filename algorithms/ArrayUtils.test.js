
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

		it('shuffle must move the first element to the last position',()=>{
			let exp = Array.from(array);
			exp.push(exp.shift());
			expect(ArrayUtils.shuffle(array, rand)).toEqual(exp);
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

		it('shuffle must reverse the array',()=>{
			expect(ArrayUtils.shuffle(array, rand)).toEqual(array.reverse());
		});
	});
});

describe('for searchs',()=>{
	describe('in a empty array',()=>{
		it('the binary search must return -1',()=>{
			expect(ArrayUtils.binarySearch(1, [])).toBe(-1);
		});

		it('the smallest nearest element must return -1',()=>{
			expect(ArrayUtils.smallestNearestElement(1, [])).toBe(-1);
		});
	});

	describe('in the array [1,2,3,6,7]',()=>{
		
		let vet = [1,2,3,6,7];

		describe('the binary search', ()=>{

			it('for the element 1 must return 0',()=>{
				let index = ArrayUtils.binarySearch(1, vet);
				expect(index).toBe(0);
				expect(vet[index]).toBe(1);
			});
	
			it('for the element 3 must return 2',()=>{
				let index = ArrayUtils.binarySearch(3, vet);
				expect(index).toBe(2);
				expect(vet[index]).toBe(3);
			});
	
			it('for the element 7 must return 4',()=>{
				let index = ArrayUtils.binarySearch(7, vet);
				expect(index).toBe(4);
				expect(vet[index]).toBe(7);
			});
	
			it('for the element 5 must return -1',()=>{
				expect(ArrayUtils.binarySearch(5, vet)).toBe(-1);
			});
	
			it('for the element 0 must return -1',()=>{
				expect(ArrayUtils.binarySearch(0, vet)).toBe(-1);
			});
	
			it('for the element 6 must return 3',()=>{
				let index = ArrayUtils.binarySearch(6, vet);
				expect(index).toBe(3);
				expect(vet[index]).toBe(6);
			});
			
			it('for the element 10 must return -1',()=>{
				expect(ArrayUtils.binarySearch(10, vet)).toBe(-1);
			});
		});

		describe('the smallest nearest element', ()=>{

			it('for the 0 is -1',()=>{
				expect(ArrayUtils.smallestNearestElement(0, vet)).toBe(-1);
			});
	
			it('for the 1 is 1 (index 0)',()=>{
				expect(ArrayUtils.smallestNearestElement(1, vet)).toBe(0);
			});
	
			it('for the 2 is 2 (index 1)',()=>{
				expect(ArrayUtils.smallestNearestElement(2, vet)).toBe(1);
			});
	
			it('for the 3 is 3 (index 2)',()=>{
				expect(ArrayUtils.smallestNearestElement(3, vet)).toBe(2);
			});
	
			it('for the 4 is 3 (index 2)',()=>{
				expect(ArrayUtils.smallestNearestElement(4, vet)).toBe(2);
			});
	
			it('for the 5 is 3 (index 2)',()=>{
				expect(ArrayUtils.smallestNearestElement(5, vet)).toBe(2);
			});
	
			it('for the 6 is 6 (index 3)',()=>{
				expect(ArrayUtils.smallestNearestElement(6, vet)).toBe(3);
			});
	
			it('for the 7 is 7 (index 4)',()=>{
				expect(ArrayUtils.smallestNearestElement(7, vet)).toBe(4);
			});
	
			it('for the 8 is 7 (index 4)',()=>{
				expect(ArrayUtils.smallestNearestElement(8, vet)).toBe(4);
			});
	
			it('for the 10 is 7 (index 4)',()=>{
				expect(ArrayUtils.smallestNearestElement(10, vet)).toBe(4);
			});
		});
	});
});
