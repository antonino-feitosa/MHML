
const MinArray = require('./MinArray');

const values = [
	[18, 1, [18]],
	[1, 1, [1, 2, 3, 4, 5]],
	[1, 1, [3, 2, 1, 4, 5]],
	[0, 1, [0, 2, 6, 8, 10]],
	[2, 1, [10, 8, 6, 4, 2]],
	[8, 2, [10, 10, 8, 8, 9, 15, 18, 9]],
	[8, 4, [8, 10, 10, 8, 8, 9, 15, 18, 9, 8]],
	[8, 2, [10, 10, 8, 9, 15, 18, 8, 9]],
	[4, 3, [4, 4, 4]]
];

describe('For simples values', () => {
	it('using add method one value', () => {
		let arr = new MinArray();
		arr.add(2);
		expect(arr.length).toBe(1);
		expect(arr.minimum).toBe(2);
	});

	it('using add method one value two times', () => {
		let arr = new MinArray();
		arr.add(7);
		arr.add(7);
		expect(arr.length).toBe(2);
		expect(arr.minimum).toBe(7);
	});

	it('using add method two values', () => {
		let arr = new MinArray();
		arr.add(5);
		arr.add(2);
		expect(arr.length).toBe(1);
		expect(arr.minimum).toBe(2);
	});
});

describe.each(values)('The Min Array must keep only the minimal %p, %p times from %p', (min, rep, vet) => {

	it('using add method', () => {
		let arr = new MinArray();
		vet.forEach(x => arr.add(x));
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});

	it('using constructor', () => {
		let arr = new MinArray(vet);
		expect(arr.length).toBe(rep);
		expect(arr.minimum).toBe(min);
	});
});

describe.each(values)('The minimal element %p, %p times in %p',(min, rep, vet)=>{
	it('must be iterated',()=>{
		let res = [];
		let arr = new MinArray(vet);
		for(let e of arr){
			res.push(e);
		}
		let exp = Array.from({length:rep}).fill(min);
		expect(res).toEqual(exp);;
	});

	it('must convert to array',()=>{
		let arr = new MinArray(vet);
		let exp = Array.from({length:rep}).fill(min);
		expect(arr.toArray).toEqual(exp);
	});
});

